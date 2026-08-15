#!/bin/bash
# Local launchd runner for Watt Audio story-title SEO drafts.
# It discovers hot story-title search demand and writes reviewable drafts only.
# No article is published until you run approve-story-title-draft manually.

set -u

ENV_FILE="$HOME/.bubu/watt-audio-story-title-bot.env"
if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi
SITEMAP_ENV_FILE="$HOME/.bubu/watt-audio-sitemap-submit.env"
if [ -f "$SITEMAP_ENV_FILE" ]; then
  # shellcheck disable=SC1090
  set -a
  source "$SITEMAP_ENV_FILE"
  set +a
fi

PROJECT_DIR="${WATT_AUDIO_PAGES_DIR:-/Users/kelvin/Downloads/watt-audio-pages}"
LOG="$HOME/.bubu/watt-audio-story-title-bot.log"
NOTIFY_ENV="$HOME/.bubu/notify.env"
LIMIT="${STORY_TITLE_BOT_LIMIT:-10}"
AUTO_PUBLISH="${STORY_TITLE_BOT_AUTO_PUBLISH:-0}"
PUBLISH_MIN_SCORE="${STORY_TITLE_BOT_PUBLISH_MIN_SCORE:-65}"
PUBLISH_MAX="${STORY_TITLE_BOT_PUBLISH_MAX:-10}"
PUBLISH_MAX_PER_LANGUAGE="${STORY_TITLE_BOT_PUBLISH_MAX_PER_LANGUAGE:-2}"
PUBLISH_LANGUAGES="${STORY_TITLE_BOT_PUBLISH_LANGUAGES:-vi,en,hi,id,ar}"
GIT_PUSH="${STORY_TITLE_BOT_GIT_PUSH:-1}"
# Markets the research pass crawls. Publishing is filtered separately by PUBLISH_LANGUAGES.
BOT_LANGUAGES="${STORY_TITLE_BOT_LANGUAGES:-vi,en,hi,id,ar}"

mkdir -p "$HOME/.bubu"
cd / || exit 1

ts() { date '+%F %T %Z'; }

run_node() {
  ( cd "$PROJECT_DIR" && "$NODE_BIN" "$@" )
}

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

echo "[$(ts)] trigger story-title bot" >> "$LOG"

if [ ! -d "$PROJECT_DIR" ]; then
  msg="Project dir not found: $PROJECT_DIR"
  echo "[$(ts)] ERROR: $msg" >> "$LOG"
  send_email "❌ Watt Audio SEO bot failed ($(date '+%F %H:%M'))" "$msg"
  exit 1
fi

NODE_BIN="${NODE_BIN:-$(command -v node || true)}"
if [ -z "$NODE_BIN" ]; then
  msg="Node.js not found in launchd PATH. Set NODE_BIN in ~/.bubu/watt-audio-story-title-bot.env"
  echo "[$(ts)] ERROR: $msg" >> "$LOG"
  send_email "❌ Watt Audio SEO bot failed ($(date '+%F %H:%M'))" "$msg"
  exit 1
fi

if ! run_node --check scripts/run-story-title-bot.mjs >> "$LOG" 2>&1; then
  send_email "❌ Watt Audio SEO bot failed ($(date '+%F %H:%M'))" \
"Syntax check failed.

Project: $PROJECT_DIR
Log: $LOG"
  exit 1
fi

if ! run_node --check scripts/publish-story-title-drafts.mjs >> "$LOG" 2>&1; then
  send_email "❌ Watt Audio SEO bot failed ($(date '+%F %H:%M'))" \
"Publisher syntax check failed.

Project: $PROJECT_DIR
Log: $LOG"
  exit 1
fi

output=$(run_node scripts/run-story-title-bot.mjs --limit="$LIMIT" --languages="$BOT_LANGUAGES" 2>&1)
status=$?
printf '%s\n' "$output" >> "$LOG"

draft_md=$(printf '%s\n' "$output" | grep -E '/data/story-title-bot/drafts/[0-9]{4}-[0-9]{2}-[0-9]{2}\.md' | tail -1)
top=$(printf '%s\n' "$output" | grep 'Top candidate:' | tail -1 | sed 's/^Top candidate: //')

publish_output=""
publish_status=0
git_output=""
git_status=0
published_links=""
published_count=0
sitemap_output=""
if [ "$status" -eq 0 ] && [ "$AUTO_PUBLISH" = "1" ]; then
  publish_output=$(run_node scripts/publish-story-title-drafts.mjs --min-score="$PUBLISH_MIN_SCORE" --max="$PUBLISH_MAX" --max-per-language="$PUBLISH_MAX_PER_LANGUAGE" --languages="$PUBLISH_LANGUAGES" --build 2>&1)
  publish_status=$?
  printf '%s\n' "$publish_output" >> "$LOG"
  if [ "$publish_status" -eq 0 ] && printf '%s' "$publish_output" | grep -q '^Publishable drafts:'; then
    slug_args=$(printf '%s\n' "$publish_output" | sed -nE 's/^- \[([a-z]{2})\] .* -> ([a-z0-9-]+)$/\1:\2/p')
    for slug_arg in $slug_args; do
      lang="${slug_arg%%:*}"
      slug="${slug_arg#*:}"
      published_count=$((published_count + 1))
      published_links="${published_links}https://wattaudios.com/$lang/articles/$slug.html
"
    done
    first_slug=$(printf '%s\n' "$slug_args" | head -1 | sed 's/^[a-z][a-z]://')
    commit_msg="seo: publish story audio guide ${first_slug:-draft}"
    push_arg=""
    if [ "$GIT_PUSH" = "1" ]; then push_arg="--push"; fi
    git_output=$(run_node scripts/commit-story-title-publish.mjs $push_arg --message "$commit_msg" --slugs $slug_args 2>&1)
    git_status=$?
    printf '%s\n' "$git_output" >> "$LOG"
    if [ "$git_status" -eq 0 ] && [ "$GIT_PUSH" = "1" ] && [ "${GSC_SITEMAP_SUBMIT_ENABLED:-0}" = "1" ]; then
      sitemap_output=$(run_node scripts/submit-sitemap.mjs 2>&1)
      printf '%s\n' "$sitemap_output" >> "$LOG"
    fi
  fi
fi

if [ "$status" -eq 0 ] && [ "$publish_status" -eq 0 ] && [ "$git_status" -eq 0 ]; then
  if [ "$AUTO_PUBLISH" = "1" ]; then
    mode="Auto-publish enabled. Threshold: $PUBLISH_MIN_SCORE. Languages: $PUBLISH_LANGUAGES. Max per language: $PUBLISH_MAX_PER_LANGUAGE."
    if [ "$published_count" -gt 0 ]; then
      publish_summary="Published $published_count new story-title article(s):
$published_links"
      subject="✅ Watt Audio SEO published $published_count bài ($(date '+%F'))"
    else
      publish_summary="No new article was published. No candidate passed the threshold, or all candidates were duplicates."
      subject="ℹ️ Watt Audio SEO no new post ($(date '+%F'))"
    fi
    action="Publisher output:
$publish_output

Git output:
${git_output:-No publish commit was needed.}

Sitemap submit:
${sitemap_output:-Skipped or not configured.}"
  else
    mode="Draft-only mode. No article was published."
    publish_summary="No article was published because auto-publish is off."
    subject="✅ Watt Audio SEO drafts ready ($(date '+%F'))"
    action="Approve a selected draft with:
node scripts/approve-story-title-draft.mjs <slug> --build"
  fi
  send_email "$subject" \
"Story-title bot generated fresh drafts.

Top candidate: ${top:-?}
Draft file: ${draft_md:-data/story-title-bot/drafts}

$mode

$publish_summary

$action

Project: $PROJECT_DIR"
else
  send_email "❌ Watt Audio SEO bot failed ($(date '+%F %H:%M'))" \
"The story-title bot did not finish.

Output:
$output

Publisher output:
$publish_output

Git output:
$git_output

Project: $PROJECT_DIR
Log: $LOG"
fi

if [ "$status" -ne 0 ]; then exit "$status"; fi
if [ "$publish_status" -ne 0 ]; then exit "$publish_status"; fi
exit "$git_status"
