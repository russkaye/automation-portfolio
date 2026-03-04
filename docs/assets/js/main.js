// Automation Portfolio — Main JS
// Filter functionality for workflows.html

document.addEventListener('DOMContentLoaded', function () {
  // Platform + industry filter tabs
  const platformBtns = document.querySelectorAll('[data-platform]');
  const industryBtns = document.querySelectorAll('[data-industry]');
  const cards = document.querySelectorAll('[data-card-platform]');

  let activePlatform = 'all';
  let activeIndustry = 'all';

  function filterCards() {
    cards.forEach(card => {
      const matchPlatform = activePlatform === 'all' || card.dataset.cardPlatform === activePlatform;
      const matchIndustry = activeIndustry === 'all' || card.dataset.cardIndustry === activeIndustry;
      card.style.display = matchPlatform && matchIndustry ? '' : 'none';
    });
  }

  platformBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      platformBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
      platformBtns.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
      this.classList.add('active', 'bg-blue-600', 'text-white');
      this.classList.remove('bg-gray-100', 'text-gray-700');
      activePlatform = this.dataset.platform;
      filterCards();
    });
  });

  industryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      industryBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
      industryBtns.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
      this.classList.add('active', 'bg-blue-600', 'text-white');
      this.classList.remove('bg-gray-100', 'text-gray-700');
      activeIndustry = this.dataset.industry;
      filterCards();
    });
  });

  // Mobile nav toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
