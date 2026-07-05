#!/bin/bash
# Install/update the local launchd job for Watt Audio story-title SEO drafts.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.wattaudio.story-title-bot"
AGENT_DIR="$HOME/Library/LaunchAgents"
BUBU_DIR="$HOME/.bubu"
SCRIPT_SRC="$PROJECT_DIR/scripts/story-title-bot-cron.sh"
PLIST_SRC="$PROJECT_DIR/scripts/$LABEL.plist"
SCRIPT_DST="$BUBU_DIR/watt-audio-story-title-bot.sh"
PLIST_DST="$AGENT_DIR/$LABEL.plist"

mkdir -p "$BUBU_DIR" "$AGENT_DIR"

cp "$SCRIPT_SRC" "$SCRIPT_DST"
chmod +x "$SCRIPT_DST"
cp "$PLIST_SRC" "$PLIST_DST"

ENV_FILE="$BUBU_DIR/watt-audio-story-title-bot.env"
if [ ! -f "$ENV_FILE" ]; then
  {
    echo "WATT_AUDIO_PAGES_DIR=\"$PROJECT_DIR\""
    echo "STORY_TITLE_BOT_LIMIT=\"12\""
    echo "STORY_TITLE_BOT_AUTO_PUBLISH=\"0\""
    echo "STORY_TITLE_BOT_PUBLISH_MIN_SCORE=\"90\""
    echo "STORY_TITLE_BOT_PUBLISH_MAX=\"1\""
    echo "STORY_TITLE_BOT_GIT_PUSH=\"1\""
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
echo "  tail -f $BUBU_DIR/watt-audio-story-title-bot.log"
echo
echo "Disable:"
echo "  launchctl bootout gui/$(id -u) $PLIST_DST"
