export const initWorkflowAnim = () => {
  const svg = document.getElementById('workflow-svg');
  if (!svg) return;

  const nodes = svg.querySelectorAll('.wf-node');
  const connectors = svg.querySelectorAll('.connector');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const play = () => {
    if (reduced) {
      nodes.forEach((n) => {
        n.querySelector('.node-circle').classList.add('is-active');
        n.querySelector('.node-icon').classList.add('is-active');
      });
      connectors.forEach((c) => c.classList.add('is-drawn'));
      return;
    }
    nodes.forEach((node, i) => {
      setTimeout(() => {
        node.querySelector('.node-circle').classList.add('is-active');
        node.querySelector('.node-icon').classList.add('is-active');
        if (connectors[i]) {
          setTimeout(() => connectors[i].classList.add('is-drawn'), 200);
        }
      }, i * 600);
    });
    const total = nodes.length * 600 + 800;
    setTimeout(() => {
      nodes.forEach((node, i) => {
        const circle = node.querySelector('.node-circle');
        if (!circle) return;
        circle.classList.add('pulse-circle');
        circle.style.animationDelay = `${i * 400}ms`;
      });
    }, total);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        play();
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  io.observe(svg);
};
