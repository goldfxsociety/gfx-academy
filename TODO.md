# Internal checklist

## Premium Tools (today's feature — needed before it's really usable)

- [x] `TOOLS_ACCESS_CODE` set on the GFX Vercel project (`1234`).
- [x] Gold Signal Indicator → linked to `https://www.tradingview.com/script/pE2LxQOL-MONEY-ALGORITHM-by-Ben/`.
- [x] Gold EA Bot → deliberately **not** linked publicly in `academy.html`. Flow is manual: student messages support with MT5 account number + Gmail, you verify, then manually share the Drive folder to that Gmail (Google Drive's per-email sharing, not a public link) along with the license key.
  - Drive folder (internal reference only — do not paste into academy.html): https://drive.google.com/drive/folders/16tNstCSoWbjgepVWaEjr7m6NpBrZ8D3A?usp=sharing
- [x] Live Zoom Trading Sessions → replaced with **Live Newbie Training (Discord)**, linking to `https://discord.gg/AZb5Gk9xNP`.
- [ ] Decide on real copy for the indicator/EA bot names/descriptions if you want something more specific than the generic placeholders currently there.
- [ ] If the Discord live training has a set schedule (e.g. specific day/time), update the "check the community for the next session schedule" line in `academy.html` with the actual cadence.

## Other loose ends from earlier sessions

- [ ] `clients/client-maria.json` exists but has **no matching entry** in `api/config.js`'s `CONFIGS` object — if `ACADEMY_CLIENT=client-maria` is ever set on a Vercel project, it silently falls back to the GFX default branding/links instead of Maria's. Either wire it up in `config.js` or delete the orphaned JSON file.
- [ ] `IB_PASSWORD` env var (used by the old IB Builder password gate, now removed) is unused on all projects — safe to delete from Vercel settings, purely cosmetic cleanup.
- [ ] Do a live end-to-end test of the URL shortener on the AGM1 IB Builder (`/ib-builder` → generate a link → Shorten Link) now that the `@upstash/redis` dependency fix has deployed, just to confirm it's actually working in production.

## Not urgent, discussed but not started

- Analytics/conversion tracking (Meta Pixel, GA4) — still nothing in place; flagged earlier as the highest-leverage next step once you're ready to learn/set it up.
- Lead-capture backend + per-IB dashboard for tracking where leads stall in the funnel.
