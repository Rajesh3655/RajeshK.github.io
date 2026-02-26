document.addEventListener('DOMContentLoaded', () => {
    // 1. Cyber-Glass Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Unobserve so the animation holds its state
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-fade, .reveal-scale');

    revealElements.forEach((el, index) => {
        // Nav elements load instantly
        if (el.closest('.glass-nav') || el.closest('.hero-cyber')) {
            setTimeout(() => {
                el.classList.add('show');
            }, index * 50);
        } else {
            // Lazy animate other sections on scroll
            observer.observe(el);
        }
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
