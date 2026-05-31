# Trading Site — Project Notes
# Paste this into Claude Chat at the start of a session to stay in sync.

## What this is
Static website built with Astro, deployed free on GitHub Pages.
Brand identity: traderskeptical (pen name; real name not associated).
Companion to a trading-research pipeline.

## Live URL
https://traderskeptical.github.io/trading-site/

## GitHub
- Repo: https://github.com/traderskeptical/trading-site
- Username: traderskeptical
- Repo is PUBLIC (required for GitHub Pages free tier)
- Default branch: main

## Current status (as of 2026-05-31)
Stages 1, 2, and 3 are complete and live.

### Stage 1 — Infrastructure
- Astro 6.3.7 static site, deployed via GitHub Actions on every push to main
- astro.config.mjs: site='https://traderskeptical.github.io', base='/trading-site'

### Stage 2 — Content & Layout
- Article collection using Astro Content Layer API (markdown files in src/content/articles/)
- Pages: home (shows 3 most recent), articles index, individual article, about
- Each article has frontmatter: title, description, publishDate, author, category (optional), dek (optional), draft
- Sitewide disclaimer footer: educational purposes only, not investment advice

### Stage 3 — Live Market Ticker
- Ticker bar runs across the top of every page
- Shows: S&P 500, Nasdaq, Dow, 20Y Treasury, Bonds, Gold, Crude Oil, EUR/USD, Bitcoin, Ethereum
- Data source: Finnhub API → Cloudflare Worker (proxy) → browser
- Cloudflare Worker URL: https://lucky-violet-03bf.traderskeptical.workers.dev/
- Why Cloudflare: browser JS can't call Finnhub directly (CORS + API key exposure). The Worker sits in the middle, holds the key, and returns data with proper CORS headers.
- Ticker scrolls continuously, pauses on hover

## Visual design
- Dark background (#0f1117), dark card surface (#161b24)
- Text: off-white (#e2e2e2), muted grey (#7a8090)
- Accent color: bronze/gold (#c9a84c) — used on links, article tags, prices, section borders
- Fonts: system-ui sans-serif for UI, Georgia serif for article body and site brand
- Max content width: 960px, centered

## Article structure
Each article markdown file supports:
- `category` — short label shown as a bronze tag (e.g. FED, MACRO, EARNINGS)
- `dek` — italic subtitle shown below the headline on the article page
- `publishDate` — controls sort order on index and homepage

Current articles:
- reading-the-fed-dot-plot.md (category: FED, published 2026-05-28)
- yield-curve-recession-signal.md (category: MACRO, published 2026-05-15)
- what-earnings-season-tells-you.md (category: EARNINGS, published 2026-04-30)

## Publishing workflow
1. Research pipeline produces briefs (markdown)
2. I review, edit into actual articles with my voice/take
3. Drop finished markdown into src/content/articles/
4. Commit and push — site rebuilds and goes live automatically (~1 min)
5. Rule: agent never has publishing access. Human-in-the-loop always.

## Local development
- Path: C:\Users\marcr\OneDrive\Desktop\trading-site
- Start dev server: npm run dev (runs on http://localhost:4321)
- NOTE: Project is on OneDrive — should eventually move to C:\Users\marcr\projects\ to avoid OneDrive/Git conflicts. Not urgent.
- All code changes go through Claude Code (CLI), not Chat

## Upcoming (Stage 4+, not started)
- Hero image on homepage (needs AI-generated image first)
- Animations / interactive widgets
- Custom domain (~$12/year)
- About page content (currently placeholder)

## Editorial direction
- Tone: skeptical, plain-spoken, macro-focused
- Subject mix: ~80% macro, ~15% thematic, ~5% single-stock (only when company is so large its news IS macro)
- Disclaimer required site-wide (already implemented)

## Brand / identity rules
- Username traderskeptical is the working title / pen name
- Real name must NOT appear in: page content, commit history, About page, package.json
- Git local identity uses brand email, not personal email

## Gotchas / lessons learned
- Astro 6 requires Node >=22.12.0 — GitHub Actions CI must use node-version: 22
- BASE_URL in Astro prod builds has no trailing slash — all files use .replace(/\/?$/, '/') fix
- Astro scoped CSS doesn't apply to elements created via JS innerHTML — must use :global()
- OneDrive can lock .git/config on first push — use git push --set-upstream origin main if it fails
- Cached 404s persist in browser — use hard refresh (Ctrl+Shift+R) or incognito to verify deploys

## Pending: Publishing pipeline (next session)
The bridge between trading-research and trading-site is still manual. Next session's work: build a helper script (likely in trading-research) that:

- Lists today's available briefs from trading-research/briefs/YYYY-MM-DD/
- Lets me pick which brief(s) to publish
- Transforms the brief: rename file to URL-safe slug, normalize frontmatter (add/edit title, description, publishDate, category, dek, author='traderskeptical', draft=false)
- Copies the result into trading-site/src/content/articles/
- Stops there. Human commits and pushes manually. No auto-publish.

Open questions to decide next session:
- Where does the script live (trading-research vs trading-site)?
- CLI prompts vs config file vs flags?
- How to handle iteration (edit brief, re-stage vs hand-edit destination)?
- Do we keep a "published" log to avoid re-publishing the same brief?

## Publishing safety boundary (do not relitigate)
- The pipeline can: draft briefs, suggest categorization, generate deks, recommend a slug
- The pipeline cannot: commit, push, or call any git command
- The transition from brief to published article requires a human running a command and pushing manually
- Reasoning: prompt injection risk + regulatory exposure on financial content + quality control

## Operational
- Anthropic API credit: monitor at console.anthropic.com — pipeline silently stops when depleted
- Throwaway Gmail used for SMTP can get bot-flagged; if recurring, migrate to Resend (free tier)
- Finnhub API key lives in Cloudflare Worker secret, not in client code

## Division of labor
- Claude Code (CLI) — anything touching files: editing code, committing, debugging, building features
- Claude Chat — thinking and planning: drafting articles, editorial direction, brainstorming
- Claude Chat doesn't have continuous access to the working directory, but it can see files you upload, pasted code, and screenshots. Treat it as a planning surface that needs to be brought up to speed each session with notes, screenshots, or pasted content.
