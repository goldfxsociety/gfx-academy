# Internal checklist

## Premium Tools (today's feature — needed before it's really usable)

- [x] `TOOLS_ACCESS_CODE` set on the GFX Vercel project (`1234`).
- [x] Gold Signal Indicator → linked to `https://www.tradingview.com/script/pE2LxQOL-MONEY-ALGORITHM-by-Ben/`.
- [x] Gold EA Bot → deliberately **not** linked publicly in `academy.html`. Flow is manual: student messages support with MT5 account number + Gmail, you verify, then manually share the Drive folder to that Gmail (Google Drive's per-email sharing, not a public link) along with the license key.
  - Drive folder (internal reference only — do not paste into academy.html): https://drive.google.com/drive/folders/16tNstCSoWbjgepVWaEjr7m6NpBrZ8D3A?usp=sharing
- [x] Live Zoom Trading Sessions → replaced with **Live Newbie Training (Discord)**, linking to `https://discord.gg/AZb5Gk9xNP`.
- [ ] Decide on real copy for the indicator/EA bot names/descriptions if you want something more specific than the generic placeholders currently there.
- [ ] If the Discord live training has a set schedule (e.g. specific day/time), update the "check the community for the next session schedule" line in `academy.html` with the actual cadence.

## Academy interactivity roadmap

- [x] **Round 1 — Candlesticks (shipped):** `el2` now has a labeled anatomy diagram + 3 "try an example" preset buttons on the plotter; new `el2b` lesson teaches 6 named patterns then runs a 5-round "guess the pattern" quiz game; Gallery tab and the candlestick lesson now cross-link to each other.
- [x] **Round 2 — Lot Size Calculator (shipped):** `hs1` replaced its abstract MCQ with a live calculator (balance, risk %, SL pips → lot size), 3 example presets, and validation/warning messages (over-risking, lot rounds to 0, unrealistically large position). Also fixed a pre-existing 100x math error in the lesson's worked example (`0.02 lot` → the mathematically correct `0.20 lot`, cross-checked against `el3`'s already-shipped pip convention).
- [x] **Round 3 — Stop Loss/Take Profit scenario quiz (shipped):** `hs2` replaced its single MCQ with a 5-scenario "what would you do" quiz — SL placement at support/resistance (with mini charts), TP placement, and 2 discipline questions (never skip the SL, don't move it to avoid a loss). Reuses the existing MCQ option styling and candle-drawing code, no freeform chart-click interaction (kept the front-end surface small and testable).
- [x] **Round 4 — Risk-Reward Calculator (shipped):** `hs4` replaced its MCQ with a live expectancy calculator (win rate, reward multiple, risk $, # trades → Net Profit/Loss/Break-Even verdict, expectancy in R and $, projected total, break-even win rate). 3 presets, including one that deliberately shows a *losing* setup at the same win rate as the lesson's own profitable example, to make the RR-vs-win-rate tradeoff concrete. Formula cross-checked against both the lesson's existing worked example and the quiz it replaced — both matched exactly.

Prioritized by what actually protects a newbie's account, not just what's easiest to build. One round at a time, same pattern as candlesticks: pick a lesson, make the concept a tool/game instead of a paragraph, reuse existing canvas/quiz code where possible.

**Tier 1 — account-safety tools:** all shipped (Position Sizing, Stop Loss/Take Profit, Risk-Reward). Tier 1 complete.

**Tier 2 — chart-reading skills (shipped):**
- [x] Support & Resistance Zones (`ms1`) → 5-scenario "what's this level?" quiz (support/resistance/role-reversal + 2 conceptual questions), mini charts via the existing candle-drawing code.
- [x] Market Structure & Trends (`ms2`) → 5-scenario "read the structure" quiz (spot uptrend/downtrend/sideways, Break of Structure, trade-with-trend). Both `ms1` and `ms2` share one new generic scenario-quiz engine (didn't touch the already-shipped `el2b`/`hs2` quiz code — new engine only, zero regression risk to those).
- [x] Moving Averages & RSI (`ms3`) → RSI reader with a CSS-only gauge bar (no canvas) + Golden/Death Cross checker, two mini-tools in one lesson matching the lesson's own scope.
- [x] Fibonacci Retracement (`ms4`) → calculator (swing high/low → 0.382/0.5/0.618/0.786 levels, golden ratio visually called out). Built as a calculator instead of drag-on-chart, consistent with avoiding freeform chart interaction everywhere in this app.

Tier 2 complete. Middle School grade fully re-tested end to end (all 5 lessons, celebration modal) after the change.

**Tier 3 — decision/scenario simulators (shipped):**
- [x] Trading Psychology (`hs3`) → 5-round "what would you actually do?" scenario quiz (moving SL, cutting winners early, FOMO, revenge trading, discipline).
- [x] Trading Journal (`hs5`) → mock journal entry tool (direction + reason + result toggles). Feedback depends on the *combination*, not just win/loss — a planned loss gets "good process" feedback, an impulsive win gets a warning not to treat it as repeatable.
- [x] Backtesting (`co3`) → 5-round scenario quiz: does this candle match your rule (enter/skip), plus the existing "is this expectancy profitable" question.
- [x] Smart Money Concepts (`co4`) → 4-concept intro grid (Order Block, Liquidity Sweep, Fair Value Gap, Change of Character) with mini charts, then a 5-round recognition quiz.

**Tier 4 — lighter polish (shipped):**
- [x] Types of Orders (`el4`) → 4-round scenario quiz covering all 3 order types both directions (Buy Limit, Market, Buy Stop, Sell Limit).
- [x] Gold Trading Sessions (`co2`) → deterministic Session Checker (enter Manila hour/minute → London-NY Overlap / London Open / outside key windows, plus a nearby-news heads-up). Built as a calculator instead of a live clock so it stays reliably testable.
- [x] The 10 remaining conceptual lessons (`ps1`-`ps5`, `el1`, `el5`, `co1`, `co5`, `gr1`) each converted from a single MCQ to a 3-round scenario quiz, using only facts already stated in that lesson's own text.

Tiers 3 and 4 complete — every lesson in the academy is now interactive. Full curriculum regression re-tested end to end: all 29 lessons across all 6 grades, every grade-completion celebration, from a fresh session.

## Other loose ends from earlier sessions

- [ ] `clients/client-maria.json` exists but has **no matching entry** in `api/config.js`'s `CONFIGS` object — if `ACADEMY_CLIENT=client-maria` is ever set on a Vercel project, it silently falls back to the GFX default branding/links instead of Maria's. Either wire it up in `config.js` or delete the orphaned JSON file.
- [ ] `IB_PASSWORD` env var (used by the old IB Builder password gate, now removed) is unused on all projects — safe to delete from Vercel settings, purely cosmetic cleanup.
- [ ] Do a live end-to-end test of the URL shortener on the AGM1 IB Builder (`/ib-builder` → generate a link → Shorten Link) now that the `@upstash/redis` dependency fix has deployed, just to confirm it's actually working in production.

## Not urgent, discussed but not started

- Analytics/conversion tracking (Meta Pixel, GA4) — still nothing in place; flagged earlier as the highest-leverage next step once you're ready to learn/set it up.
- Lead-capture backend + per-IB dashboard for tracking where leads stall in the funnel.
