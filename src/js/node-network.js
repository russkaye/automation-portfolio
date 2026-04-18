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
  if ((node.x < 0 && node.vx < 0) || (node.x > width && node.vx > 0)) node.vx = -node.vx;
  if ((node.y < 0 && node.vy < 0) || (node.y > height && node.vy > 0)) node.vy = -node.vy;
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NODE_COUNT_DESKTOP = 40;
const NODE_COUNT_MOBILE = 24;
const CONNECT_DISTANCE = 140;
const MAX_LINE_ALPHA = 0.08;
const VELOCITY = 0.15;
const NODE_RADIUS = 1.5;
const NODE_COLOR = 'rgba(10, 10, 10, 0.18)';
const LINE_COLOR_RGB = '0, 102, 255';

const createNodes = (count, width, height) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2 * VELOCITY,
      vy: (Math.random() - 0.5) * 2 * VELOCITY,
    });
  }
  return nodes;
};

export const initNodeNetwork = () => {
  const canvas = document.getElementById('node-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let scrollOffset = 0;
  let rafId = 0;
  let running = false;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    if (nodes.length !== count) nodes = createNodes(count, width, height);
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      bounce(n, width, height);
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const d = distance(a.x, a.y, b.x, b.y);
        const alpha = connectionAlpha(d, CONNECT_DISTANCE, MAX_LINE_ALPHA);
        if (alpha > 0) {
          ctx.strokeStyle = `rgba(${LINE_COLOR_RGB}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y + scrollOffset % height);
          ctx.lineTo(b.x, b.y + scrollOffset % height);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = NODE_COLOR;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y + scrollOffset % height, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = () => {
    draw();
    rafId = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;
    running = true;
    loop();
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  const debounce = (fn, ms) => {
    let t = 0;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  };

  resize();
  draw();

  if (reducedMotion()) return;

  window.addEventListener('resize', debounce(resize, 100), { passive: true });
  window.addEventListener('scroll', () => {
    scrollOffset = window.scrollY * 0.05;
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
};
