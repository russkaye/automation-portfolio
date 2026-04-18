import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('./scripts/screens', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

await page.goto('http://localhost:8767/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// scroll to process section and wait for animation
await page.evaluate(() => document.getElementById('process').scrollIntoView({ behavior: 'instant', block: 'start' }));
await page.waitForTimeout(4500);
await page.screenshot({ path: './scripts/screens/diagram-01-initial.png', fullPage: false });

// scroll way past
await page.evaluate(() => document.getElementById('footer').scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(500);

// scroll back to diagram
await page.evaluate(() => document.getElementById('process').scrollIntoView({ behavior: 'instant', block: 'start' }));
await page.waitForTimeout(800);
await page.screenshot({ path: './scripts/screens/diagram-02-after-scrollback.png', fullPage: false });

// hover one of the nodes
await page.hover('.wf-node[data-node="1"]');
await page.waitForTimeout(400);
await page.screenshot({ path: './scripts/screens/diagram-03-hover.png', fullPage: false });

// unhover
await page.mouse.move(0, 0);
await page.waitForTimeout(400);
await page.screenshot({ path: './scripts/screens/diagram-04-unhover.png', fullPage: false });

await browser.close();
console.log('diagram scroll-back test captured.');
