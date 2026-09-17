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

**Tier 2 — chart-reading skills (visual, same spirit as the candlestick round):**
- [ ] Support & Resistance Zones (`ms1`) → tap-the-zone exercise on a mini price chart.
- [ ] Market Structure & Trends (`ms2`) → label Higher-High/Higher-Low vs Lower-High/Lower-Low on a chart snippet.
- [ ] Fibonacci Retracement (`ms4`) → drag/select a swing high-low, tool auto-calculates the levels.
- [ ] Moving Averages & RSI (`ms3`) → interactive RSI gauge + Golden/Death Cross visual toggle.

**Tier 3 — decision/scenario simulators (more build effort, still high value):**
- [ ] Trading Psychology (`hs3`) → scenario cards ("you just lost 3 trades in a row, what do you do?") instead of a single MCQ.
- [ ] Trading Journal (`hs5`) → fill-in-the-blank mock journal entry.
- [ ] Backtesting (`co3`) → walk through 10 historical candles, mark your entries, see the result.
- [ ] Smart Money Concepts (`co4`) → annotated order-block/liquidity-sweep diagram, same style as the candlestick anatomy diagram.

**Tier 4 — lighter polish, lower priority:** remaining mostly-conceptual lessons (Pre-School basics, What is a Broker, Types of Orders, Demo Account, Trading Plan, Gold Sessions, Building Your Strategy, Demo vs Live) could get small touches later — e.g. an order-type matching game for `el4`, a live Manila-time session clock for `co2` — but these aren't where newbies get hurt, so lowest priority.

## Other loose ends from earlier sessions

- [ ] `clients/client-maria.json` exists but has **no matching entry** in `api/config.js`'s `CONFIGS` object — if `ACADEMY_CLIENT=client-maria` is ever set on a Vercel project, it silently falls back to the GFX default branding/links instead of Maria's. Either wire it up in `config.js` or delete the orphaned JSON file.
- [ ] `IB_PASSWORD` env var (used by the old IB Builder password gate, now removed) is unused on all projects — safe to delete from Vercel settings, purely cosmetic cleanup.
- [ ] Do a live end-to-end test of the URL shortener on the AGM1 IB Builder (`/ib-builder` → generate a link → Shorten Link) now that the `@upstash/redis` dependency fix has deployed, just to confirm it's actually working in production.

## Not urgent, discussed but not started

- Analytics/conversion tracking (Meta Pixel, GA4) — still nothing in place; flagged earlier as the highest-leverage next step once you're ready to learn/set it up.
- Lead-capture backend + per-IB dashboard for tracking where leads stall in the funnel.
