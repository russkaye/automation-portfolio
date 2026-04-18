import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('./scripts/screens', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

await page.goto('http://localhost:8766/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

await page.screenshot({ path: './scripts/screens/desktop-hero.png', fullPage: false });

await page.screenshot({ path: './scripts/screens/desktop-full.png', fullPage: true });

const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto('http://localhost:8766/', { waitUntil: 'networkidle' });
await mobilePage.waitForTimeout(1500);
await mobilePage.screenshot({ path: './scripts/screens/mobile-hero.png', fullPage: false });
await mobilePage.screenshot({ path: './scripts/screens/mobile-full.png', fullPage: true });

await browser.close();
console.log('screenshots written to ./scripts/screens/');
