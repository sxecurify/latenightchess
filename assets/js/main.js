/* ============================================================
   Late Night Chess — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── Smooth active nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function onScroll() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 90) current = sec.id;
    });

    navAnchors.forEach((a) => {
      a.classList.remove('active-link');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll-reveal animation ── */
  const revealEls = document.querySelectorAll(
    '.product-card, .feature-item, .stat-card, .about-text, .cta-banner'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  /* ── Chess board piece animation (subtle glow pulse) ── */
  const cells = document.querySelectorAll('.chess-board-preview .cell');
  cells.forEach((cell) => {
    if (cell.textContent.trim()) {
      cell.addEventListener('mouseenter', () => {
        cell.style.textShadow = '0 0 12px rgba(192,132,252,0.9)';
        cell.style.transform = 'scale(1.25)';
        cell.style.transition = 'transform 0.15s, text-shadow 0.15s';
      });
      cell.addEventListener('mouseleave', () => {
        cell.style.textShadow = '';
        cell.style.transform = '';
      });
    }
  });
})();
