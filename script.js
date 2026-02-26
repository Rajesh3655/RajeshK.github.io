document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.glass-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (nav && navToggle && navLinks) {
        const closeMenu = () => {
            nav.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open menu');
            navToggle.innerHTML = '<i class="ph ph-list"></i>';
        };

        const openMenu = () => {
            nav.classList.add('menu-open');
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.setAttribute('aria-label', 'Close menu');
            navToggle.innerHTML = '<i class="ph ph-x"></i>';
        };

        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.contains('menu-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 900) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && nav.classList.contains('menu-open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 900) {
                closeMenu();
            }
        });
    }

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-fade, .reveal-scale');

    if (reduceMotion) {
        revealElements.forEach((el) => el.classList.add('show'));
    } else {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.2
            }
        );

        revealElements.forEach((el, index) => {
            if (el.closest('.hero-cyber') || el.closest('.glass-nav')) {
                setTimeout(() => el.classList.add('show'), Math.min(index * 60, 200));
            } else {
                observer.observe(el);
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });
});
