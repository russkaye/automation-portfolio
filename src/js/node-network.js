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

const NODE_COUNT_DESKTOP = 54;
const NODE_COUNT_MOBILE = 30;
const CONNECT_DISTANCE = 155;
const MAX_LINE_ALPHA = 0.07;
const VELOCITY = 0.11;
const NODE_COLOR = '10, 10, 10';
const LINE_COLOR_RGB = '0, 102, 255';
const SIGNAL_COLOR_RGB = '47, 118, 107';
const SCROLL_INFLUENCE = 0.028;

const seededRandom = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const viewportSeed = (width, height) => (Math.floor(width * 131 + height * 977) ^ 0x9E3779B9) >>> 0;

const wrap = (value, max) => ((value % max) + max) % max;

const lerp = (from, to, amount) => from + (to - from) * amount;

const createNodes = (count, width, height, seed) => {
  const rand = seededRandom(seed);
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 2 * VELOCITY,
      vy: (rand() - 0.5) * 2 * VELOCITY,
      radius: 0.8 + rand() * 1.2,
      phase: rand() * Math.PI * 2,
      drift: 0.45 + rand() * 0.65,
      color: rand() > 0.86 ? SIGNAL_COLOR_RGB : NODE_COLOR,
    });
  }
  return nodes;
};

export const initNodeNetwork = () => {
  const canvas = document.getElementById('node-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let scrollOffset = 0;
  let targetScrollOffset = window.scrollY * SCROLL_INFLUENCE;
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
    if (nodes.length !== count) {
      nodes = createNodes(count, width, height, viewportSeed(width, height));
    } else {
      nodes.forEach((node) => {
        node.x = wrap(node.x, width);
        node.y = wrap(node.y, height);
      });
    }
  };

  const projectedY = (node, time) => wrap(
    node.y + scrollOffset * node.drift + Math.sin(time * 0.32 + node.phase) * 7,
    height,
  );

  const drawFieldLines = (time) => {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    const gridStep = width < 768 ? 92 : 118;
    const gridOffset = wrap(scrollOffset * 0.35, gridStep);
    ctx.strokeStyle = 'rgba(10, 10, 10, 0.018)';
    for (let y = -gridStep; y < height + gridStep; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y + gridOffset);
      ctx.lineTo(width, y + gridOffset);
      ctx.stroke();
    }

    for (let i = 0; i < 4; i++) {
      const y = height * (0.18 + i * 0.22) + Math.sin(time * 0.18 + i * 1.7) * 16;
      const controlLift = 28 + i * 7;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 102, 255, 0.035)' : 'rgba(47, 118, 107, 0.028)';
      ctx.beginPath();
      ctx.moveTo(-80, y);
      ctx.bezierCurveTo(width * 0.28, y - controlLift, width * 0.68, y + controlLift, width + 80, y - 10);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawSignalPulse = (pair, time) => {
    const progress = wrap(time * 0.085 + pair.seed, 1);
    if (progress < 0.08 || progress > 0.92) return;

    const tail = Math.max(0, progress - 0.09);
    const head = Math.min(1, progress + 0.025);
    const x1 = lerp(pair.ax, pair.bx, tail);
    const y1 = lerp(pair.ay, pair.by, tail);
    const x2 = lerp(pair.ax, pair.bx, head);
    const y2 = lerp(pair.ay, pair.by, head);
    const lift = Math.sin(progress * Math.PI) * pair.alpha;

    ctx.save();
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgba(${pair.seed > 0.5 ? SIGNAL_COLOR_RGB : LINE_COLOR_RGB}, ${Math.min(0.16, lift * 3.2)})`;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const draw = (now = 0) => {
    const time = now * 0.001;
    scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

    ctx.clearRect(0, 0, width, height);
    drawFieldLines(time);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      bounce(n, width, height);
    }

    ctx.lineWidth = 1;
    const pulsePairs = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const ay = projectedY(a, time);
        const by = projectedY(b, time);
        const d = distance(a.x, ay, b.x, by);
        const alpha = connectionAlpha(d, CONNECT_DISTANCE, MAX_LINE_ALPHA);
        if (alpha > 0) {
          const shimmer = 0.78 + Math.sin(time * 0.8 + a.phase + b.phase) * 0.22;
          const lineColor = a.color === SIGNAL_COLOR_RGB || b.color === SIGNAL_COLOR_RGB ? SIGNAL_COLOR_RGB : LINE_COLOR_RGB;
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha * shimmer})`;
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, by);
          ctx.stroke();

          if (alpha > 0.018 && pulsePairs.length < 20 && (i + j) % 3 === 0) {
            pulsePairs.push({
              ax: a.x,
              ay,
              bx: b.x,
              by,
              alpha,
              seed: wrap(i * 0.173 + j * 0.071, 1),
            });
          }
        }
      }
    }

    pulsePairs.forEach((pair) => drawSignalPulse(pair, time));

    for (const n of nodes) {
      const y = projectedY(n, time);
      const alpha = 0.11 + Math.sin(time * 0.55 + n.phase) * 0.035;
      ctx.fillStyle = `rgba(${n.color}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(n.x, y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (now) => {
    if (!running) return;
    draw(now);
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
    targetScrollOffset = window.scrollY * SCROLL_INFLUENCE;
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
};
