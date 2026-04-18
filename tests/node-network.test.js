import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distance, connectionAlpha, bounce } from '../src/js/node-network.js';

test('distance: basic pythagoras', () => {
  assert.equal(distance(0, 0, 3, 4), 5);
});

test('distance: same point is 0', () => {
  assert.equal(distance(10, 10, 10, 10), 0);
});

test('connectionAlpha: 0 distance returns max alpha', () => {
  assert.equal(connectionAlpha(0, 140, 0.08), 0.08);
});

test('connectionAlpha: beyond threshold returns 0', () => {
  assert.equal(connectionAlpha(140, 140, 0.08), 0);
  assert.equal(connectionAlpha(200, 140, 0.08), 0);
});

test('connectionAlpha: halfway returns half alpha', () => {
  assert.equal(connectionAlpha(70, 140, 0.08), 0.04);
});

test('bounce: inverts velocity when past max edge', () => {
  const node = { x: 110, y: 50, vx: 2, vy: 1 };
  bounce(node, 100, 100);
  assert.equal(node.vx, -2);
  assert.equal(node.vy, 1);
});

test('bounce: inverts velocity when past min edge', () => {
  const node = { x: -5, y: 50, vx: -2, vy: 1 };
  bounce(node, 100, 100);
  assert.equal(node.vx, 2);
});

test('bounce: does not invert when inside bounds', () => {
  const node = { x: 50, y: 50, vx: 2, vy: 1 };
  bounce(node, 100, 100);
  assert.equal(node.vx, 2);
  assert.equal(node.vy, 1);
});
