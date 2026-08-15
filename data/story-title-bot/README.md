# Story-title Bot

Multi-market SEO bot for story-title pages.

## Markets

`seeds.json` holds one research block per market under `markets`:

| Language | Directory | Research focus |
| --- | --- | --- |
| `vi` | `/vi/` | Wattpad/TruyenFull Vietnamese story demand |
| `en` | `/en/` | Wattpad, webnovel, Royal Road demand |
| `hi` | `/hi/` | Hindi web stories, Pocket FM/KUKU FM style audio demand |
| `id` | `/id/` | Wattpad Indonesia, novel online demand |
| `ar` | `/ar/` | Arabic Wattpad novels and روايات صوتية demand |

Each block sets `hl`/`gl` for Google Suggest, its own demand and audio queries,
suggest templates, YouTube queries, and the exact-title `competitionQueries` used to
score how crowded the audio niche already is. Set `"enabled": false` to pause a market.

`hi` and `ar` candidates must be written in their native script; Devanagari and Arabic
titles are romanized for the slug (`रोमांटिक` → `romantik`, `رواية` → `rwayh`).

## Generate Drafts

```bash
node scripts/run-story-title-bot.mjs --limit=10
node scripts/run-story-title-bot.mjs --limit=10 --languages=hi,id,ar
```

`--limit` is per market, so a five-market run with `--limit=10` produces up to 50 candidates.

Outputs:

- `data/story-title-bot/drafts/YYYY-MM-DD.json`
- `data/story-title-bot/drafts/YYYY-MM-DD.md`

The bot collects Google Suggest, YouTube search, and English web-fiction source signals, extracts story-title candidates, dedupes existing pages, estimates exact-title audio competition, scores candidates by opportunity, and writes reviewable drafts.

V2 scoring favors SEO gaps:

- Higher demand from Wattpad/TruyenFull/story search suggestions.
- English demand from Wattpad/read-aloud/webnovel searches plus Royal Road trending and best-rated pages.
- Lower score when exact-title YouTube audio already has several matches.
- `Opportunity score = demand + weak audio signal - audio competition penalty`.
- Competition levels: `none`, `low`, `medium`, `high`, or `unknown` when the check fails.

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
STORY_TITLE_BOT_PUBLISH_MIN_SCORE="65"
STORY_TITLE_BOT_PUBLISH_MAX="10"
STORY_TITLE_BOT_PUBLISH_MAX_PER_LANGUAGE="2"
STORY_TITLE_BOT_PUBLISH_LANGUAGES="vi,en,hi,id,ar"
STORY_TITLE_BOT_LANGUAGES="vi,en,hi,id,ar"
STORY_TITLE_BOT_LIMIT="10"
STORY_TITLE_BOT_GIT_PUSH="1"
```

`STORY_TITLE_BOT_LANGUAGES` controls which markets are researched;
`STORY_TITLE_BOT_PUBLISH_LANGUAGES` controls which of those may publish.

The publisher checks duplicate slugs and duplicate normalized titles before inserting anything. It then runs `scripts/build-seo-pages.mjs`, which generates the story-title page in the candidate's own language, updates `sitemap.xml`, commits the relevant generated files, and pushes to the current git remote when `STORY_TITLE_BOT_GIT_PUSH="1"`.

## Posting Cadence

`scripts/com.wattaudio.story-title-bot.plist` runs the bot at 10:00, 15:00 and 20:00.
With the defaults above that is up to 3 runs × 10 posts = 30 articles per day,
capped at 2 per language per run so no single market dominates.
Reinstall after changing the schedule:

```bash
bash scripts/install-story-title-bot-local.sh
```

Manual dry run:

```bash
node scripts/publish-story-title-drafts.mjs --min-score=65 --max=1 --dry-run
```

## Guardrails

- Draft pages are discovery/listening guides, not reposts of story content.
- Do not claim Watt Audio owns, hosts, republishes, or officially provides third-party stories.
- Keep story-title pages focused on personal listening workflows and app download conversion.
