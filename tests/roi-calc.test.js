import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeAnnualWaste, formatCurrency, formatHours } from '../src/js/roi-calc.js';

test('computeAnnualWaste: baseline case (5 × 12 × 30 × 52)', () => {
  assert.equal(computeAnnualWaste({ team: 5, hours: 12, rate: 30 }), 93600);
});

test('computeAnnualWaste: zero team returns zero', () => {
  assert.equal(computeAnnualWaste({ team: 0, hours: 12, rate: 30 }), 0);
});

test('computeAnnualWaste: single person, 1hr/wk, $1/hr = 52', () => {
  assert.equal(computeAnnualWaste({ team: 1, hours: 1, rate: 1 }), 52);
});

test('computeAnnualWaste: clamps negative inputs to 0', () => {
  assert.equal(computeAnnualWaste({ team: -5, hours: 12, rate: 30 }), 0);
  assert.equal(computeAnnualWaste({ team: 5, hours: -12, rate: 30 }), 0);
  assert.equal(computeAnnualWaste({ team: 5, hours: 12, rate: -30 }), 0);
});

test('computeAnnualWaste: coerces string inputs to numbers', () => {
  assert.equal(computeAnnualWaste({ team: '5', hours: '12', rate: '30' }), 93600);
});

test('computeAnnualWaste: NaN or undefined inputs clamp to 0', () => {
  assert.equal(computeAnnualWaste({ team: NaN, hours: 12, rate: 30 }), 0);
  assert.equal(computeAnnualWaste({ team: undefined, hours: 12, rate: 30 }), 0);
});

test('formatCurrency: adds $ and commas', () => {
  assert.equal(formatCurrency(18720), '$18,720');
  assert.equal(formatCurrency(0), '$0');
  assert.equal(formatCurrency(1500000), '$1,500,000');
});

test('formatCurrency: rounds to whole dollars', () => {
  assert.equal(formatCurrency(100.7), '$101');
  assert.equal(formatCurrency(100.4), '$100');
});

test('formatHours: computes annual hours and workdays', () => {
  const r = formatHours({ team: 5, hours: 12 });
  assert.equal(r.hours, 3120);
  assert.equal(r.days, 390);
});

test('formatHours: zero inputs return 0', () => {
  const r = formatHours({ team: 0, hours: 12 });
  assert.equal(r.hours, 0);
  assert.equal(r.days, 0);
});
