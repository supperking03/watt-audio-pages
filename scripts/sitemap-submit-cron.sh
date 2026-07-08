#!/bin/bash
# Daily Google Search Console sitemap submitter for Watt Audio.

set -u

ENV_FILE="$HOME/.bubu/watt-audio-sitemap-submit.env"
if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi

PROJECT_DIR="${WATT_AUDIO_PAGES_DIR:-/Users/kelvin/Downloads/watt-audio-pages}"
LOG="$HOME/.bubu/watt-audio-sitemap-submit.log"
NOTIFY_ENV="$HOME/.bubu/notify.env"
NODE_BIN="${NODE_BIN:-$(command -v node || true)}"

mkdir -p "$HOME/.bubu"
cd / || exit 1

ts() { date '+%F %T %Z'; }

send_email() {
  local subject="$1" body="$2"
  if [ ! -f "$NOTIFY_ENV" ]; then
    echo "[$(ts)] email skipped: missing $NOTIFY_ENV" >> "$LOG"; return 0
  fi
  # shellcheck disable=SC1090
  source "$NOTIFY_ENV"
  if [ -z "${GMAIL_USER:-}" ] || [ -z "${GMAIL_APP_PASSWORD:-}" ]; then
    echo "[$(ts)] email skipped: missing GMAIL_USER/GMAIL_APP_PASSWORD" >> "$LOG"; return 0
  fi
  local to="${NOTIFY_TO:-$GMAIL_USER}"
  local mailfile; mailfile=$(mktemp)
  {
    echo "From: Watt Audio SEO Bot <$GMAIL_USER>"
    echo "To: $to"
    echo "Subject: $subject"
    echo "MIME-Version: 1.0"
    echo "Content-Type: text/plain; charset=UTF-8"
    echo
    printf '%s\n' "$body"
  } > "$mailfile"
  if curl -s --url "smtps://smtp.gmail.com:465" --ssl-reqd \
       --mail-from "$GMAIL_USER" --mail-rcpt "$to" \
       --user "$GMAIL_USER:$GMAIL_APP_PASSWORD" \
       --upload-file "$mailfile" >/dev/null 2>&1; then
    echo "[$(ts)] email sent: $subject" >> "$LOG"
  else
    echo "[$(ts)] email failed: $subject" >> "$LOG"
  fi
  rm -f "$mailfile"
}

echo "[$(ts)] submit sitemap trigger" >> "$LOG"

if [ ! -d "$PROJECT_DIR" ]; then
  msg="Project dir not found: $PROJECT_DIR"
  echo "[$(ts)] ERROR: $msg" >> "$LOG"
  send_email "❌ Watt Audio sitemap submit failed ($(date '+%F %H:%M'))" "$msg"
  exit 1
fi

if [ -z "$NODE_BIN" ]; then
  msg="Node.js not found. Set NODE_BIN in $ENV_FILE"
  echo "[$(ts)] ERROR: $msg" >> "$LOG"
  send_email "❌ Watt Audio sitemap submit failed ($(date '+%F %H:%M'))" "$msg"
  exit 1
fi

output=$((cd "$PROJECT_DIR" && "$NODE_BIN" scripts/submit-sitemap.mjs) 2>&1)
status=$?
printf '%s\n' "$output" >> "$LOG"

if [ "$status" -eq 0 ]; then
  if printf '%s' "$output" | grep -qi 'disabled'; then
    echo "[$(ts)] sitemap submit disabled" >> "$LOG"
    exit 0
  fi
  send_email "✅ Watt Audio sitemap submitted ($(date '+%F'))" \
"Google Search Console sitemap submit completed.

$output

Project: $PROJECT_DIR"
else
  send_email "❌ Watt Audio sitemap submit failed ($(date '+%F %H:%M'))" \
"Google Search Console sitemap submit failed.

$output

Project: $PROJECT_DIR
Log: $LOG"
fi

exit "$status"
