/* ============================================
   THE HUNGRY TABLE — main.js
   ============================================ */

(function () {
  'use strict';

  /* ---- Sticky header on scroll ---- */
  const header = document.getElementById('site-header');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (y > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up (after hero)
    if (y > 400) {
      if (y > lastY + 4) {
        header.style.transform = 'translateY(-100%)';
      } else if (y < lastY - 4) {
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastY = y;
  }, { passive: true });

  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll-reveal for sections ---- */
  const revealTargets = document.querySelectorAll(
    '.featured-grid, .banner-split, .more-recipes, .newsletter-band, .recipe-body, .recipe-method'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealTargets.forEach(el => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });
  }

  /* ---- Newsletter form feedback ---- */
  const newsletterBtn = document.querySelector('.newsletter-form button');
  const newsletterInput = document.querySelector('.newsletter-form input');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterInput.value.trim();
      if (!email || !email.includes('@')) {
        newsletterInput.style.borderBottom = '2px solid var(--orange)';
        newsletterInput.placeholder = 'Enter a valid email ↑';
        newsletterInput.focus();
        return;
      }
      newsletterBtn.textContent = '✓ You\'re in!';
      newsletterBtn.style.background = 'var(--green)';
      newsletterBtn.style.color = 'var(--dark)';
      newsletterInput.value = '';
      newsletterInput.placeholder = 'your@email.com';
      newsletterInput.disabled = true;
      newsletterBtn.disabled = true;
    });

    newsletterInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') newsletterBtn.click();
    });
  }

  /* ---- Subscribe buttons ---- */
  document.querySelectorAll('.btn-subscribe').forEach(btn => {
    btn.addEventListener('click', () => {
      // Scroll to newsletter section if on home page
      const band = document.querySelector('.newsletter-band');
      if (band) {
        band.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* ---- Smooth appear on load ---- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();

/* ---- CSS for reveal animations (injected) ---- */
const style = document.createElement('style');
style.textContent = `
  .reveal-hidden {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal-hidden.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .site-header {
    transition: transform 0.3s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
`;
document.head.appendChild(style);
