# Story-title Bot

V1 daily SEO bot for story-title pages.

## Generate Drafts

```bash
node scripts/run-story-title-bot.mjs --limit=10
```

Outputs:

- `data/story-title-bot/drafts/YYYY-MM-DD.json`
- `data/story-title-bot/drafts/YYYY-MM-DD.md`

The bot collects Google Suggest and YouTube search signals, extracts story-title candidates, dedupes existing pages, scores candidates, and writes reviewable drafts.

## Run Local Schedule

This follows the local `launchd` style used by the TikTok auto-post scripts:

```bash
bash scripts/install-story-title-bot-local.sh
```

It copies the runner to `~/.bubu/watt-audio-story-title-bot.sh`, installs `~/Library/LaunchAgents/com.wattaudio.story-title-bot.plist`, and runs daily at 09:20.

Manual one-shot run:

```bash
STORY_TITLE_BOT_LIMIT=12 scripts/story-title-bot-cron.sh
```

Logs:

```bash
tail -f ~/.bubu/watt-audio-story-title-bot.log
```

## Approve One Draft

```bash
node scripts/approve-story-title-draft.mjs story-slug --build
```

Approval appends a `storyTitleTopic(...)` entry to `scripts/build-seo-pages.mjs`, then optionally rebuilds all generated pages and `sitemap.xml`.

To test an approval without editing files:

```bash
node scripts/approve-story-title-draft.mjs story-slug --dry-run
```

## Auto-Publish by Score

Default local schedule is draft-only. To let the local bot publish the best draft automatically, edit:

```bash
~/.bubu/watt-audio-story-title-bot.env
```

Use:

```bash
STORY_TITLE_BOT_AUTO_PUBLISH="1"
STORY_TITLE_BOT_PUBLISH_MIN_SCORE="70"
STORY_TITLE_BOT_PUBLISH_MAX="1"
STORY_TITLE_BOT_GIT_PUSH="1"
```

The publisher checks duplicate slugs and duplicate normalized titles before inserting anything. It then runs `scripts/build-seo-pages.mjs`, which generates Vietnamese story-title pages, updates `sitemap.xml`, commits the relevant generated files, and pushes to the current git remote when `STORY_TITLE_BOT_GIT_PUSH="1"`.

Manual dry run:

```bash
node scripts/publish-story-title-drafts.mjs --min-score=70 --max=1 --dry-run
```

## Guardrails

- Draft pages are discovery/listening guides, not reposts of story content.
- Do not claim Watt Audio owns, hosts, republishes, or officially provides third-party stories.
- Keep story-title pages focused on personal listening workflows and app download conversion.
