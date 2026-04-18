export const computeAnnualWaste = ({ team, hours, rate }) => {
  const t = Math.max(0, Number(team) || 0);
  const h = Math.max(0, Number(hours) || 0);
  const r = Math.max(0, Number(rate) || 0);
  return Math.round(t * h * r * 52);
};

export const formatCurrency = (n) => {
  return '$' + Math.round(n).toLocaleString('en-US');
};

export const formatHours = ({ team, hours }) => {
  const t = Math.max(0, Number(team) || 0);
  const h = Math.max(0, Number(hours) || 0);
  const annualHours = t * h * 52;
  return { hours: annualHours, days: Math.round(annualHours / 8) };
};

const animateNumber = (el, from, to, duration = 400) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = formatCurrency(to);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = from + (to - from) * eased;
    el.textContent = formatCurrency(val);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

export const initRoiCalc = () => {
  const team = document.getElementById('roi-team');
  const hours = document.getElementById('roi-hours');
  const rate = document.getElementById('roi-rate');
  const amountEl = document.getElementById('roi-amount');
  const hoursOut = document.getElementById('roi-hours-out');
  const daysOut = document.getElementById('roi-days-out');
  const context = document.getElementById('roi-context');
  const form = document.getElementById('roi-form');
  const status = document.getElementById('roi-status');

  if (!team || !amountEl) return;

  let current = computeAnnualWaste({ team: team.value, hours: hours.value, rate: rate.value });
  amountEl.textContent = formatCurrency(current);

  const update = () => {
    const next = computeAnnualWaste({ team: team.value, hours: hours.value, rate: rate.value });
    const h = formatHours({ team: team.value, hours: hours.value });
    animateNumber(amountEl, current, next);
    hoursOut.textContent = h.hours.toLocaleString('en-US');
    daysOut.textContent = h.days.toLocaleString('en-US');
    current = next;
    if (context) context.value = `team=${team.value},hours=${hours.value},rate=${rate.value},annual=${next}`;
  };

  [team, hours, rate].forEach((input) => input.addEventListener('input', update));
  update();

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
        status.textContent = 'Sent. Check your inbox within 2 minutes.';
        form.reset();
      } else {
        status.textContent = 'Something failed. Email russabregande@gmail.com directly.';
      }
    } catch {
      status.textContent = 'Network error. Email russabregande@gmail.com directly.';
    }
  });
};
