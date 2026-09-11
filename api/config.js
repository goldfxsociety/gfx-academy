// ── ALL CLIENT CONFIGS — no file reading, guaranteed to work on Vercel ─────────

const CONFIGS = {

  'default': {
    id: 'default',
    name: 'GFX Trading Academy',
    shortName: 'GFX Academy',
    logo: 'GFX',
    branding: {
      primaryColor: '#D4A017',
      accentColor:  '#2D1B4E',
      cardColor:    '#3A2460',
      borderColor:  '#5A3A90',
      bgColor:      '#1A0A2E',
      textMain:     '#F5F0FF',
      textMuted:    '#C4B5D4',
    },
    links: {
      accm:        'https://accm.global/account/register?shareUserSetId=3a59d46d63f04393b',
      community:   'https://m.me/cm/DT8JPfkzsMUWMvYy/',
      support:     'https://www.facebook.com/benedictglvz',
      wikifx:      'https://www.wikifx.com/fil/dealer/3052942299.html',
      academyBase: 'https://gfx-academy-sand.vercel.app/academy',
    },
    ibBuilder: { passwordType: 'password' },
    modules: {
      candlestickGallery:   true,
      tools:                true,
      ibBuilder:            true,
      certificate:          true,
      wikifxBadge:          true,
      continueCard:         true,
      lessonTimeEstimates:  true,
    },
    customTabs: [],
    footer: {
      copyright:  '© 2026 GFX Trading Academy · Affiliated with ACCM',
      disclaimer: 'Trading involves risk. Past performance is not indicative of future results.',
    },
  },

  'client-agm1sniper': {
    id: 'client-agm1sniper',
    name: 'AG M1 Sniper Academy',
    shortName: 'AGM1 Academy',
    logo: 'AG',
    branding: {
      primaryColor: '#D4A017',
      accentColor:  '#1A2810',
      cardColor:    '#243318',
      borderColor:  '#4A6B2A',
      bgColor:      '#0F1A0A',
      textMain:     '#F5F5E8',
      textMuted:    '#C8D4B0',
    },
    links: {
      accm:        'https://accm.global/account/register?shareUserSetId=66bc25aaad64427f8',
      community:   'https://m.me/j/Abbz4wMfWqJVxnLt/?send_source=gc%3Ashare_to_more_t',
      support:     'https://www.facebook.com/rvn2pat',
      wikifx:      'https://www.wikifx.com/fil/dealer/3052942299.html',
      academyBase: 'https://agm1sniper-academy.vercel.app/academy',
    },
    ibBuilder: { passwordType: 'both' },
    modules: {
      candlestickGallery:   true,
      tools:                true,
      ibBuilder:            true,
      certificate:          true,
      wikifxBadge:          true,
      continueCard:         true,
      lessonTimeEstimates:  true,
    },
    customTabs: [
      {
        id:    'agm1rules',
        label: 'M1 Rules',
        icon:  'ti-target',
        type:  'page',
        content: `<style>
#agm1-rules{padding:0 0 16px}
.agm1-hero{background:linear-gradient(160deg,#1A2810,#0F1A0A);border:1px solid #4A6B2A;border-radius:14px;padding:22px 18px 18px;text-align:center;margin-bottom:18px}
.agm1-logo{font-family:'Syne',sans-serif;font-size:32px;font-weight:700;color:#D4A017;letter-spacing:2px;line-height:1}
.agm1-sub{font-size:11px;color:#C8D4B0;letter-spacing:3px;text-transform:uppercase;margin-top:4px;margin-bottom:10px}
.agm1-tagline{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#8BC34A;margin-top:6px}
.agm1-section-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#D4A017;text-transform:uppercase;letter-spacing:1.5px;margin:18px 0 10px;text-align:center}
.agm1-rule{display:flex;align-items:flex-start;gap:13px;background:#1A2810;border:1px solid #4A6B2A;border-radius:10px;padding:13px 14px;margin-bottom:8px}
.agm1-num{width:30px;height:30px;border-radius:50%;background:#D4A017;color:#0F1A0A;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.agm1-rule-body{flex:1}
.agm1-rule-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#F5F5E8;margin-bottom:3px}
.agm1-rule-desc{font-size:12px;color:#C8D4B0;line-height:1.6}
.agm1-footer{background:#1A2810;border:1px solid #4A6B2A;border-radius:10px;padding:14px;text-align:center;margin-top:6px}
.agm1-footer-text{font-size:12px;color:#C8D4B0;line-height:1.7}
.agm1-footer-text strong{color:#D4A017}
</style>
<div id='agm1-rules'>
  <div class='agm1-hero'>
    <div class='agm1-logo'>AG</div>
    <div class='agm1-sub'>Arvin Gonzales · Forex Trading</div>
    <div class='agm1-tagline'>⚡ M1 Sniper Entry</div>
  </div>
  <div class='agm1-section-title'>Follow My Rules in Trading</div>
  <div class='agm1-rule'><div class='agm1-num'>1</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Discipline</div><div class='agm1-rule-desc'>Stick to your plan. Emotions destroy consistency.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>2</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Consistency</div><div class='agm1-rule-desc'>Small, consistent actions lead to long-term success.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>3</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Risk Management</div><div class='agm1-rule-desc'>Protect your capital. Never risk more than you can afford to lose.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>4</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Simplicity</div><div class='agm1-rule-desc'>Keep your strategy simple. The market rewards clarity, not complexity.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>5</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Time and Financial Freedom</div><div class='agm1-rule-desc'>Smart trading today builds the freedom you enjoy tomorrow.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>6</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Patience</div><div class='agm1-rule-desc'>Wait for the right setup. Good trades come to those who wait.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>7</div><div class='agm1-rule-body'><div class='agm1-rule-title'>No Greedy</div><div class='agm1-rule-desc'>Don't chase profits. Take what the market gives you.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>8</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Trust</div><div class='agm1-rule-desc'>Trust your plan, your process, and yourself.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>9</div><div class='agm1-rule-body'><div class='agm1-rule-title'>No Fear</div><div class='agm1-rule-desc'>Control fear with knowledge and experience.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>10</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Journal</div><div class='agm1-rule-desc'>Track every trade. Learn, improve, and grow.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>11</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Prayer</div><div class='agm1-rule-desc'>Pray for guidance, wisdom, and protection.</div></div></div>
  <div class='agm1-rule'><div class='agm1-num'>12</div><div class='agm1-rule-body'><div class='agm1-rule-title'>Pay It Forward (10%)</div><div class='agm1-rule-desc'>Give back. Help others and be a blessing.</div></div></div>
  <div class='agm1-footer'><div class='agm1-footer-text'><strong>M1 Sniper Entry</strong> by Arvin Gonzales<br>Discipline. Consistency. Freedom.</div></div>
</div>`
      }
    ],
    footer: {
      copyright:  '© 2026 AG M1 Sniper Academy · Powered by ACCM',
      disclaimer: 'Trading involves risk. Past performance is not indicative of future results.',
    },
  },

};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const clientId = process.env.ACADEMY_CLIENT || 'default';
  const config   = CONFIGS[clientId] || CONFIGS['default'];

  // Never expose password
  const safe = { ...config };
  if (safe.ibBuilder) safe.ibBuilder = { ...safe.ibBuilder };
  delete safe.ibBuilder?.password;

  return res.status(200).json(safe);
}
