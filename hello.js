// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ── Theme Toggle ──────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const metaTheme = document.getElementById('meta-theme');
    const applyTheme = (isLight) => {
        document.body.classList.toggle('light-mode', isLight);
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        if (metaTheme) metaTheme.content = isLight ? '#f0f4f8' : '#121A23';
    };

    // Restore saved preference (default: dark)
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        const isNowLight = !document.body.classList.contains('light-mode');
        applyTheme(isNowLight);
        localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
    });

    // ── Mobile navigation menu toggle ─────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // ── Scroll Animation ──────────────────────────────────
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ── Active nav link on scroll ─────────────────────────
    const sections = document.querySelectorAll('section, #aboutMore, #skills, #Profiles');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    const highlightNavOnScroll = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);
});
