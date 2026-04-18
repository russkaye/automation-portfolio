import { initRoiCalc } from './roi-calc.js';
import { initWorkflowAnim } from './workflow-anim.js';

const initReveal = () => {
  const items = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.revealDelay || 0);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        io.unobserve(entry.target);
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
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
  initReveal();
  initNavScroll();
  initMagnetic();
  initRoiCalc();
  initWorkflowAnim();
  initAuditForm();
});
