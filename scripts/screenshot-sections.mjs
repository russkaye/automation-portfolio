import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('./scripts/screens', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

await page.goto('http://localhost:8766/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const sections = ['proof', 'roi', 'process', 'work', 'audit', 'about', 'final-cta'];
for (const id of sections) {
  await page.evaluate((sel) => document.getElementById(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' }), id);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `./scripts/screens/section-${id}.png`, fullPage: false });
}

await browser.close();
console.log('Section screenshots written.');
