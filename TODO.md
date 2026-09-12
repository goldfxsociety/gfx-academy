# Internal checklist

## Premium Tools (today's feature — needed before it's really usable)

- [ ] Set `TOOLS_ACCESS_CODE` env var on the **GFX Vercel project only** (not AGM1). This is the code you hand out manually after verifying someone's ACCM registration proof on Facebook. Without it, the unlock endpoint returns "Not configured" and nobody can unlock the page.
- [ ] In `academy.html`, inside the `id="premium-unlocked-view"` block, replace the 3 placeholder `href="#"` links:
  - Gold Signal Indicator → your TradingView invite-only script page URL
  - Gold EA Bot → your external download link
  - Live Zoom Trading Sessions → your Zoom join link
- [ ] Replace the "Schedule: TBA — check with support for the next session date and time." text with your actual Zoom cadence (e.g. "Every Saturday 8PM Manila time").
- [ ] Decide on real copy for the indicator/EA bot names/descriptions if you want something more specific than the generic placeholders currently there.

## Other loose ends from earlier sessions

- [ ] `clients/client-maria.json` exists but has **no matching entry** in `api/config.js`'s `CONFIGS` object — if `ACADEMY_CLIENT=client-maria` is ever set on a Vercel project, it silently falls back to the GFX default branding/links instead of Maria's. Either wire it up in `config.js` or delete the orphaned JSON file.
- [ ] `IB_PASSWORD` env var (used by the old IB Builder password gate, now removed) is unused on all projects — safe to delete from Vercel settings, purely cosmetic cleanup.
- [ ] Do a live end-to-end test of the URL shortener on the AGM1 IB Builder (`/ib-builder` → generate a link → Shorten Link) now that the `@upstash/redis` dependency fix has deployed, just to confirm it's actually working in production.

## Not urgent, discussed but not started

- Analytics/conversion tracking (Meta Pixel, GA4) — still nothing in place; flagged earlier as the highest-leverage next step once you're ready to learn/set it up.
- Lead-capture backend + per-IB dashboard for tracking where leads stall in the funnel.
