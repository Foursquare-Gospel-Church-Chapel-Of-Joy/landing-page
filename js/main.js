/* ════════════════════════════════════════════════
   FOURSQUARE GOSPEL CHURCH — CHAPEL OF JOY
   Lekki District Headquarters
   main.js
   ════════════════════════════════════════════════ */

/* ── 1. NAVBAR — Scroll behaviour ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is mid-scroll
})();


/* ── 2. MOBILE MENU ── */
(function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const closeBtn    = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu()  { mobileMenu.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

  hamburger.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on backdrop click
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMenu();
  });
})();


/* ── 3. SCROLL ANIMATIONS (Intersection Observer) ── */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ── 4. ANIMATED STAT COUNTERS ── */
(function initCounters() {
  const counters = document.querySelectorAll('.count-num');
  if (!counters.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start    = Date.now();

    function tick() {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();


/* ── 5. COUNTDOWN TIMER ── */
(function initCountdown() {
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');
  const cdWrap  = document.getElementById('countdown');

  if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

  // ── EDIT THIS DATE to match your next featured event ──
  // Format: 'YYYY-MM-DDTHH:MM:SS'
  const TARGET_DATE = new Date('2026-04-20T00:00:00');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now  = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      if (cdWrap) {
        cdWrap.innerHTML = '<span style="color:var(--red);font-family:Libre Baskerville,serif;font-size:22px;font-weight:700;letter-spacing:2px">Event is Live!</span>';
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    cdDays.textContent  = pad(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent  = pad(minutes);
    cdSecs.textContent  = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();


/* ── 6. GIVING AMOUNT BUTTONS ── */
(function initGivingButtons() {
  const buttons = document.querySelectorAll('.amount-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();


/* ── 7. CONTACT FORM — Feedback on submit ── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const original  = submitBtn.textContent;

    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.style.background = '#155724';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent  = original;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      form.reset();
    }, 4000);
  });
})();


/* ── 8. SMOOTH SCROLL for anchor links ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 9. SERMON FILTER TABS (UI only — no backend) ── */
(function initSermonFilter() {
  const filterBtns = document.querySelectorAll('.sermon-filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // When you have a real sermon database, filter .sermon-item elements here
      // by data-category attribute matching this.dataset.category
    });
  });
})();


/* ── 10. GALLERY — Filter + Lightbox ── */
(function initGallery() {

  // ── Filter ──
  const filterBtns  = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selected = this.dataset.category;

      galleryItems.forEach(item => {
        if (selected === 'all' || item.dataset.category === selected) {
          item.classList.remove('gallery-hidden');
        } else {
          item.classList.add('gallery-hidden');
        }
      });
    });
  });

  // ── Lightbox ──
  const lightbox    = document.getElementById('gallery-lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbCaption   = document.getElementById('lightbox-caption');
  const lbCounter   = document.getElementById('lightbox-counter');
  const lbClose     = document.getElementById('lightbox-close');
  const lbPrev      = document.getElementById('lightbox-prev');
  const lbNext      = document.getElementById('lightbox-next');

  if (!lightbox || !lbImg) return;

  let visibleItems = [];
  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(galleryItems).filter(
      item => !item.classList.contains('gallery-hidden')
    );
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;

    currentIndex = Math.max(0, Math.min(index, visibleItems.length - 1));
    showSlide(currentIndex);

    lightbox.classList.add('open');
    lightbox.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showSlide(index) {
    const item    = visibleItems[index];
    const imgEl   = item.querySelector('img');
    const caption = item.dataset.caption || imgEl.alt;

    lbImg.src = imgEl.src.replace(/w=\d+/, 'w=1200');
    lbImg.alt = imgEl.alt;
    lbCaption.textContent = caption;
    lbCounter.textContent = (index + 1) + ' / ' + visibleItems.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showSlide(currentIndex);
  }

  // Click on a gallery item to open
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', function () {
      const visible = getVisibleItems();
      const visibleIndex = visible.indexOf(this);
      if (visibleIndex !== -1) openLightbox(visibleIndex);
    });

    // Keyboard: Enter or Space to open
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visible = getVisibleItems();
        const visibleIndex = visible.indexOf(this);
        if (visibleIndex !== -1) openLightbox(visibleIndex);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevSlide);
  lbNext.addEventListener('click', nextSlide);

  // Close on backdrop click (not on image/content click)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation in lightbox
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevSlide();
    if (e.key === 'ArrowRight')  nextSlide();
  });

})();
