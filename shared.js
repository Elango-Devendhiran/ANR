/* ═══════════════════════════════════════════════
   ANR SILKS — SHARED JAVASCRIPT
═══════════════════════════════════════════════ */

(function () {
    /* ── Hamburger toggle ── */
    const ham = document.querySelector('.nav-hamburger');
    const drawer = document.querySelector('.nav-drawer');
    if (ham && drawer) {
        ham.addEventListener('click', () => {
            ham.classList.toggle('open');
            drawer.classList.toggle('open');
        });
        // Close on link click
        drawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                ham.classList.remove('open');
                drawer.classList.remove('open');
            });
        });
    }

    /* ── Nav scroll shadow ── */
    const nav = document.querySelector('.site-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    /* ── Active nav link ── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }
})();
