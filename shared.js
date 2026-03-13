/* ═══════════════════════════════════════════════
   ANR SILKS — SHARED JAVASCRIPT
═══════════════════════════════════════════════ */

(function () {
    /* ── Page Loader ── */
    (function () {
        var loader = document.getElementById('page-loader');
        var bar    = document.getElementById('loader-bar');
        if (!loader) return;

        document.documentElement.classList.add('is-loading');

        var progress  = 0;
        var startTime = Date.now();
        var MIN_SHOW  = 1200;
        var MAX_SHOW  = 2800;
        var pageReady = false;
        var barDone   = false;

        var fillTimer = setInterval(function () {
            if (progress >= 70) { clearInterval(fillTimer); return; }
            progress += Math.random() * 12 + 4;
            if (progress > 70) progress = 70;
            if (bar) bar.style.width = progress + '%';
        }, 120);

        function dismiss() {
            if (bar) bar.style.width = '100%';
            setTimeout(function () {
                loader.classList.add('fade-out');
                document.documentElement.classList.remove('is-loading');
                setTimeout(function () {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 650);
            }, 300);
        }

        function tryDismiss() {
            if (!pageReady || !barDone) return;
            var elapsed   = Date.now() - startTime;
            var remaining = MIN_SHOW - elapsed;
            setTimeout(dismiss, remaining > 0 ? remaining : 0);
        }

        setTimeout(function () { barDone = true; tryDismiss(); }, 900);

        if (document.readyState === 'complete') {
            pageReady = true; tryDismiss();
        } else {
            window.addEventListener('load', function () { pageReady = true; tryDismiss(); });
        }

        setTimeout(function () { if (loader.parentNode) dismiss(); }, MAX_SHOW);
    })();

    /* ── Hamburger toggle ── */
    const ham = document.querySelector('.nav-hamburger');
    const drawer = document.querySelector('.nav-drawer');
    if (ham && drawer) {
        ham.addEventListener('click', () => {
            const isOpen = ham.classList.toggle('open');
            drawer.classList.toggle('open');
            
            // Use a CSS class instead of overflow:hidden, which breaks
            // position:fixed on mobile Safari/Chrome
            document.documentElement.classList.toggle('menu-open', isOpen);
        });

        // Close on link click
        drawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                ham.classList.remove('open');
                drawer.classList.remove('open');
                document.documentElement.classList.remove('menu-open');
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
