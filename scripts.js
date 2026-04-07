/* ============================================
   SCRIPTS.JS — Site interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     Category pill filter
     ---------------------------------------- */
  const pills = document.querySelectorAll('.category-pill');
  const recipeCards = document.querySelectorAll('.recipe-card[data-category]');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.dataset.category;

      // Toggle active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Filter cards
      recipeCards.forEach(card => {
        const match = selected === 'all' || card.dataset.category === selected;
        card.style.display = match ? 'block' : 'none';
        // Recalculate border for grid
        if (match) {
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; card.style.transition = 'opacity 0.3s'; }, 10);
        }
      });
    });
  });


  /* ----------------------------------------
     Newsletter form
     ---------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      const btn = newsletterForm.querySelector('.newsletter__btn');
      if (input.value.trim()) {
        btn.textContent = 'You\'re in!';
        btn.style.background = '#4A7C2A';
        input.value = '';
        input.placeholder = 'Talk soon ✓';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          input.placeholder = 'your@email.com';
        }, 4000);
      }
    });
  }


  /* ----------------------------------------
     Scroll-reveal for recipe cards
     ---------------------------------------- */
  const reveals = document.querySelectorAll('.recipe-card, .featured-recipe, .section-header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  // Add visible class styles via JS
  document.head.insertAdjacentHTML('beforeend', `
    <style>.is-visible { opacity: 1 !important; transform: translateY(0) !important; }</style>
  `);


  /* ----------------------------------------
     Ticker pause on hover
     ---------------------------------------- */
  const tickerTrack = document.querySelector('.ticker__track');
  if (tickerTrack) {
    tickerTrack.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    tickerTrack.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }


  /* ----------------------------------------
     Nav highlight on scroll
     ---------------------------------------- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add shadow after scrolling past hero
    if (scrollY > 80) {
      nav.style.boxShadow = '0 2px 12px rgba(26,26,24,0.12)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScroll = scrollY;
  });

});
