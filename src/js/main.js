import { initRoiCalc } from './roi-calc.js';
import { initWorkflowAnim } from './workflow-anim.js';
import { initNodeNetwork } from './node-network.js';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hoverCapable = () => !window.matchMedia('(hover: none)').matches;

const initScrollDir = () => {
  let lastY = window.scrollY;
  document.documentElement.dataset.scrollDir = 'down';
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 4) return;
    document.documentElement.dataset.scrollDir = y > lastY ? 'down' : 'up';
    lastY = y;
  }, { passive: true });
};

const initReveal = () => {
  const items = document.querySelectorAll('.reveal');
  if (reducedMotion()) {
    items.forEach((el) => el.classList.add('reveal-down', 'is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      clearTimeout(el._revealTimer);
      if (entry.isIntersecting) {
        const dir = document.documentElement.dataset.scrollDir || 'down';
        const variant = dir === 'up' ? 'reveal-up' : 'reveal-down';
        el.classList.remove('reveal-up', 'reveal-down');
        el.classList.add(variant);
        const delay = Number(el.dataset.revealDelay || 0);
        el._revealTimer = setTimeout(() => el.classList.add('is-visible'), delay);
      } else {
        el.classList.remove('is-visible', 'reveal-up', 'reveal-down');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  items.forEach((el) => io.observe(el));
};

const initNavScroll = () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) {
      nav.classList.remove('border-transparent');
      nav.classList.add('border-black/5', 'shadow-[0_1px_20px_rgba(0,0,0,0.04)]');
    } else {
      nav.classList.add('border-transparent');
      nav.classList.remove('border-black/5', 'shadow-[0_1px_20px_rgba(0,0,0,0.04)]');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

const initMagnetic = () => {
  if (reducedMotion() || !hoverCapable()) return;
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
};

const initCardTilt = () => {
  if (reducedMotion() || !hoverCapable()) return;
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    let raf = 0;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -6;
      const ry = (px - 0.5) * 8;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
    });
  });
};

const initCountUp = () => {
  const items = document.querySelectorAll('[data-count-target]');
  if (!items.length) return;
  if (reducedMotion()) {
    items.forEach((el) => { el.textContent = el.dataset.countTarget; });
    return;
  }
  const animate = (el) => {
    const target = Number(el.dataset.countTarget || 0);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  items.forEach((el) => io.observe(el));
};

const initAuditForm = () => {
  const form = document.getElementById('audit-form');
  const status = document.getElementById('audit-status');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        status.textContent = "Got it. I'll reply within 48 hours.";
      } else {
        status.textContent = 'Something failed. Email russabregande@gmail.com directly.';
      }
    } catch {
      status.textContent = 'Network error. Email russabregande@gmail.com directly.';
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollDir();
  initNodeNetwork();
  initReveal();
  initNavScroll();
  initMagnetic();
  initCardTilt();
  initCountUp();
  initRoiCalc();
  initWorkflowAnim();
  initAuditForm();
});
