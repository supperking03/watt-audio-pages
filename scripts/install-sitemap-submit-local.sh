#!/bin/bash
# Install/update the local launchd job for daily Google Search Console sitemap submit.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.wattaudio.sitemap-submit"
AGENT_DIR="$HOME/Library/LaunchAgents"
BUBU_DIR="$HOME/.bubu"
SCRIPT_SRC="$PROJECT_DIR/scripts/sitemap-submit-cron.sh"
PLIST_SRC="$PROJECT_DIR/scripts/$LABEL.plist"
SCRIPT_DST="$BUBU_DIR/watt-audio-sitemap-submit.sh"
PLIST_DST="$AGENT_DIR/$LABEL.plist"

mkdir -p "$BUBU_DIR" "$AGENT_DIR"

cp "$SCRIPT_SRC" "$SCRIPT_DST"
chmod +x "$SCRIPT_DST"
cp "$PLIST_SRC" "$PLIST_DST"

ENV_FILE="$BUBU_DIR/watt-audio-sitemap-submit.env"
if [ ! -f "$ENV_FILE" ]; then
  {
    echo "WATT_AUDIO_PAGES_DIR=\"$PROJECT_DIR\""
    echo "GSC_SITEMAP_SUBMIT_ENABLED=\"0\""
    echo "GSC_SITE_URL=\"sc-domain:wattaudios.com\""
    echo "GSC_SITEMAP_URL=\"https://wattaudios.com/sitemap.xml\""
    echo "# Option A: recommended. Create a service account, add its email as an Owner/User in GSC, then set:"
    echo "# GSC_SERVICE_ACCOUNT_JSON=\"$BUBU_DIR/watt-audio-gsc-service-account.json\""
    echo "# Option B: temporary token:"
    echo "# GSC_ACCESS_TOKEN=\"\""
    echo "# Option C: logged-in gcloud:"
    echo "# GSC_USE_GCLOUD=\"1\""
    echo "NODE_BIN=\"$(command -v node)\""
  } > "$ENV_FILE"
  chmod 600 "$ENV_FILE"
fi

launchctl bootout "gui/$(id -u)" "$PLIST_DST" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"

echo "Installed $LABEL"
echo "Script: $SCRIPT_DST"
echo "Plist:  $PLIST_DST"
echo "Env:    $ENV_FILE"
echo
echo "Run once now:"
echo "  $SCRIPT_DST"
echo
echo "Check logs:"
echo "  tail -f $BUBU_DIR/watt-audio-sitemap-submit.log"
