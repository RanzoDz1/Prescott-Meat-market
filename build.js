/**
 * build.js — Vercel build-time environment variable injector
 *
 * Runs automatically on Vercel before the site is served.
 * Set these variables in: Vercel Dashboard → Project → Settings → Environment Variables
 */

const fs = require('fs');

const FILES_TO_PROCESS = ['index.html'];

const replacements = {
  // ── Contact ───────────────────────────────────────────────────────────────
  '{{PHONE_TEL}}':         process.env.PHONE_TEL         || '+15550000002',
  '{{PHONE_DISPLAY}}':     process.env.PHONE_DISPLAY     || '+1 (555) 000-0002',
  '{{PHONE_DISPLAY_SHORT}}':process.env.PHONE_DISPLAY_SHORT|| '555-000-0002',
  '{{PHONE_SCHEMA}}':      process.env.PHONE_SCHEMA      || '+15550000002',
  '{{EMAIL}}':             process.env.EMAIL             || 'contact@example.com',

  // ── Address ───────────────────────────────────────────────────────────────
  '{{ADDRESS_STREET}}':     process.env.ADDRESS_STREET    || '456 Oak Ave',
  '{{ADDRESS_CITY_STATE}}': process.env.ADDRESS_CITY_STATE|| 'Sample Town, TX 78001',
  '{{ADDRESS_LOCALITY}}':   process.env.ADDRESS_LOCALITY  || 'Sample Town',
  '{{ADDRESS_REGION}}':     process.env.ADDRESS_REGION    || 'TX',
  '{{ADDRESS_POSTAL}}':     process.env.ADDRESS_POSTAL    || '78001',

  // ── Site & Social ─────────────────────────────────────────────────────────
  '{{SITE_URL}}':           process.env.SITE_URL          || 'https://example.com/',
  '{{FACEBOOK_URL}}':       process.env.FACEBOOK_URL      || '#',
  '{{GOOGLE_MAPS_URL}}':    process.env.GOOGLE_MAPS_URL   || '#',
  '{{GOOGLE_MAPS_EMBED}}':  process.env.GOOGLE_MAPS_EMBED || 'about:blank',
};

FILES_TO_PROCESS.forEach((file) => {
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  Object.entries(replacements).forEach(([placeholder, value]) => {
    content = content.split(placeholder).join(value);
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Processed: ${file}`);
});

console.log('Build complete — environment variables injected.');
