export const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

export const connectionAlpha = (d, threshold, maxAlpha) => {
  if (d >= threshold) return 0;
  return maxAlpha * (1 - d / threshold);
};

export const bounce = (node, width, height) => {
  if (node.x < 0 || node.x > width) node.vx = -node.vx;
  if (node.y < 0 || node.y > height) node.vy = -node.vy;
};
