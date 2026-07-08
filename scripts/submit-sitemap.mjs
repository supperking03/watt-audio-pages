import crypto from "node:crypto";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const siteUrl = process.env.GSC_SITE_URL || "sc-domain:wattaudios.com";
const sitemapUrl = process.env.GSC_SITEMAP_URL || "https://wattaudios.com/sitemap.xml";
const scope = "https://www.googleapis.com/auth/webmasters";

if (process.env.GSC_SITEMAP_SUBMIT_ENABLED === "0") {
  console.log("Sitemap submit disabled. Set GSC_SITEMAP_SUBMIT_ENABLED=1 after configuring GSC auth.");
  process.exit(0);
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function serviceAccountFromEnv() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(fs.readFileSync(process.env.GSC_SERVICE_ACCOUNT_JSON, "utf8"));
  }

  if (process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY) {
    return {
      client_email: process.env.GSC_CLIENT_EMAIL,
      private_key: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, "\n"),
      token_uri: process.env.GSC_TOKEN_URI || "https://oauth2.googleapis.com/token"
    };
  }

  return null;
}

async function tokenFromServiceAccount() {
  const serviceAccount = serviceAccountFromEnv();
  if (!serviceAccount) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: serviceAccount.client_email,
    scope,
    aud: serviceAccount.token_uri || "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(serviceAccount.private_key);
  const assertion = `${unsigned}.${base64url(signature)}`;

  const response = await fetch(serviceAccount.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`OAuth token failed (${response.status}): ${JSON.stringify(json)}`);
  }
  return json.access_token;
}

function tokenFromGcloud() {
  if (process.env.GSC_USE_GCLOUD !== "1") return null;
  const gcloud = process.env.GCLOUD_BIN || "gcloud";
  const result = spawnSync(gcloud, ["auth", "print-access-token"], {
    cwd: "/",
    env: { ...process.env, PWD: "/" },
    encoding: "utf8"
  });
  if (result.status !== 0) {
    throw new Error(`gcloud auth failed: ${(result.stderr || result.stdout || "").trim()}`);
  }
  return result.stdout.trim();
}

async function accessToken() {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN;
  const serviceAccountToken = await tokenFromServiceAccount();
  if (serviceAccountToken) return serviceAccountToken;
  const gcloudToken = tokenFromGcloud();
  if (gcloudToken) return gcloudToken;

  throw new Error(
    "Missing GSC auth. Set GSC_SERVICE_ACCOUNT_JSON to a service-account JSON file, " +
      "or set GSC_ACCESS_TOKEN, or set GSC_USE_GCLOUD=1."
  );
}

const token = await accessToken();
const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
const response = await fetch(endpoint, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  }
});

const text = await response.text();
if (!response.ok) {
  throw new Error(`Sitemap submit failed (${response.status}): ${text}`);
}

console.log(`Submitted sitemap: ${sitemapUrl}`);
console.log(`Property: ${siteUrl}`);
