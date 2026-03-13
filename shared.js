/* ═══════════════════════════════════════════════
   ANR SILKS — SHARED JAVASCRIPT
═══════════════════════════════════════════════ */

(function () {
   /* ════════════════════════════════════════════════
   ANR SILKS — PAGE LOADER SCRIPT  |  loader-script.js

   PLACEMENT: Copy everything below into shared.js
   Paste it as the FIRST block inside the (function(){ ... })()
   wrapper, BEFORE the hamburger toggle code.

   Example position in shared.js:
   (function () {
       ← PASTE HERE

       /* ── Hamburger toggle ── *\/
       const ham = document.querySelector('.nav-hamburger');
       ...
   })();

   ─────────────────────────────────────────────
   TIMING EXPLAINED
   ─────────────────────────────────────────────
   0 ms        Loader appears instantly (HTML is first in <body>)
   0–800 ms    Progress bar animates 0% → 70% in random increments
   800–2800 ms Bar holds at 70%, waiting for window "load" event
   On "load"   Bar snaps to 100%
   +300 ms     Brief pause so user sees the full bar
   +300 ms     Loader fades out over 600 ms
   +650 ms     Loader element removed from DOM entirely

   Minimum visible time : 1200 ms  (prevents flash on fast connections)
   Maximum visible time : 2800 ms  (safety cap if load event is slow)
════════════════════════════════════════════════ */

    /* ── Page Loader ── */
    (function loaderInit() {
        const loader = document.getElementById('page-loader');
        const bar    = document.getElementById('loader-bar');
        if (!loader || !bar) return;

        /* Lock background scroll while loader is showing */
        document.documentElement.classList.add('is-loading');

        /* Record when the loader started */
        const startTime = performance.now();

        /* Animate bar from 0 → 70% while page loads */
        let pct = 0;
        const tick = setInterval(() => {
            pct = Math.min(pct + Math.random() * 15 + 3, 70);
            bar.style.width = pct + '%';
            if (pct >= 70) clearInterval(tick);
        }, 130);

        /* Called once page is ready to reveal */
        function dismissLoader() {
            clearInterval(tick);

            /* Snap bar to 100% */
            bar.style.width = '100%';

            /* Short pause at 100% then fade out */
            setTimeout(() => {
                loader.classList.add('fade-out');
                document.documentElement.classList.remove('is-loading');

                /* Remove from DOM after CSS transition completes */
                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 650);
            }, 300);
        }

        /* Safety cap — dismiss after 2.8 s no matter what */
        const safetyCap = setTimeout(dismissLoader, 2800);

        /* Dismiss when window fully loads */
        window.addEventListener('load', function onLoad() {
            clearTimeout(safetyCap);
            window.removeEventListener('load', onLoad);

            /* Enforce a minimum display time of 1200 ms */
            const elapsed   = performance.now() - startTime;
            const remaining = Math.max(0, 1200 - elapsed);
            setTimeout(dismissLoader, remaining);
        });
    })();

/* ── End of loader script — paste above this line only ── */

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
