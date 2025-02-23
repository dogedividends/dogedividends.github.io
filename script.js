// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize all interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeTokenStats();
    initializeMobileMenu();
    initializeParallax();
    initializeCountdown();
    initializeButtons();
});

function copyAddress() {
    const address = '0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287';
    navigator.clipboard.writeText(address).then(() => {
        const notification = document.querySelector('.copy-notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

// Navigation and Scroll Handling
function initializeNavigation() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    let isScrolling = false;
    let isNavigating = false;

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                isNavigating = true;
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');

                // Calculate offset for header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Reset navigation state after animation
                setTimeout(() => {
                    isNavigating = false;
                }, 1000);

                // Close mobile menu if open
                const nav = document.querySelector('nav');
                const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    mobileMenuButton?.classList.remove('active');
                }
            }
        });
    });

    // Scroll handling
    window.addEventListener('scroll', () => {
        if (!isScrolling && !isNavigating) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.classList.remove('scroll-up');
                    header.classList.remove('scroll-down');
                } else if (currentScroll > lastScroll && currentScroll > 100) {
                    if (!header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-up');
                        header.classList.add('scroll-down');
                    }
                } else if (currentScroll < lastScroll) {
                    if (header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-down');
                        header.classList.add('scroll-up');
                    }
                }
                
                lastScroll = currentScroll;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Reset header visibility when reaching top or bottom of page
    window.addEventListener('scrollend', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-down');
            header.classList.remove('scroll-up');
        } else if ((window.innerHeight + currentScroll) >= document.documentElement.scrollHeight) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .timeline-item, .step, .social-link, .about-item').forEach((el) => {
        observer.observe(el);
    });
}

// Token Statistics
function initializeTokenStats() {
    function updateTokenStats() {
        const mockPrice = (Math.random() * 0.001).toFixed(6);
        const mockHolders = Math.floor(Math.random() * 5000) + 15000;
        const mockMarketCap = (mockPrice * 1000000000).toFixed(2);
        const mockBurned = Math.floor(Math.random() * 1000000) + 5000000;

        // Animate number changes
        animateValue('price', mockPrice, '$');
        animateValue('holders', mockHolders);
        animateValue('marketcap', (mockMarketCap/1000000).toFixed(2), '$', 'M');
        animateValue('burned-tokens', mockBurned);
    }

    function animateValue(elementId, value, prefix = '', suffix = '') {
        const element = document.getElementById(elementId);
        const start = parseFloat(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const end = parseFloat(value);
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = start + (end - start) * progress;
            element.textContent = `${prefix}${Number(current).toLocaleString('en-US', {
                minimumFractionDigits: String(value).split('.')[1]?.length || 0,
                maximumFractionDigits: String(value).split('.')[1]?.length || 0
            })}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Update stats initially and every 5 seconds
    updateTokenStats();
    setInterval(updateTokenStats, 5000);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('header').appendChild(mobileMenuButton);

    const nav = document.querySelector('nav');
    
    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            }
        }
    });

    // Prevent menu from closing when clicking inside nav
    nav.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            e.stopPropagation();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Parallax Effect
function initializeParallax() {
    const hero = document.querySelector('#hero');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scroll = window.pageYOffset;
                hero.style.backgroundPositionY = `${scroll * 0.5}px`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Countdown Timer
function initializeCountdown() {
    function updateCountdown() {
        const nextPhaseDate = new Date('2024-12-31T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = nextPhaseDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.querySelector('.timeline-item:not(.active)');
        if (countdownElement) {
            countdownElement.setAttribute('data-countdown', `${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Button Interactions
function initializeButtons() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#buy') return; // Allow smooth scroll for internal links
            
            e.preventDefault();
            this.classList.add('loading');
            
            // Simulate loading state
            setTimeout(() => {
                this.classList.remove('loading');
                if (this.getAttribute('href')) {
                    window.location.href = this.getAttribute('href');
                }
            }, 1500);
        });
    });

    // Add hover effect for all interactive elements
    const interactiveElements = document.querySelectorAll('.feature, .about-item, .social-link, .cta-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
