/* ===================================================
   MOMENTS - Premium Couple / Wedding Website
   Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    });

    // Fallback: remove preloader after 3 seconds max
    setTimeout(() => {
        if (preloader && preloader.parentNode) {
            preloader.classList.add('loaded');
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 600);
        }
    }, 3000);

    // ===== INITIALIZE AOS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 0,
        });
    }

    // ===== HERO PARTICLES =====
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            heroParticles.appendChild(particle);
        }
    }

    // ===== STICKY HEADER =====
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetEl.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== COUNT-UP TIMER (Days of Our Love) =====
    function startCountUp() {
        // Love Start Date: November 12, 2024
        const startDate = new Date('2024-11-12T00:00:00');

        function updateCountUp() {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - startDate.getTime();

            if (timeDiff <= 0) return;

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('countdown-days');
            const hoursEl = document.getElementById('countdown-hours');
            const minutesEl = document.getElementById('countdown-minutes');
            const secondsEl = document.getElementById('countdown-seconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) {
                secondsEl.textContent = String(seconds).padStart(2, '0');
                secondsEl.style.transform = 'scale(1.05)';
                setTimeout(() => { secondsEl.style.transform = 'scale(1)'; }, 200);
            }
        }

        updateCountUp();
        setInterval(updateCountUp, 1000);
    }
    startCountUp();

    // ===== BACKGROUND MUSIC CONTROLLER =====
    const musicBtn = document.getElementById('musicToggle');
    const bgAudio = document.getElementById('bgAudio');

    if (musicBtn && bgAudio) {
        // Ensure it plays once and stops
        bgAudio.loop = false;

        function toggleMusic() {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    musicBtn.classList.add('playing');
                    musicBtn.setAttribute('title', 'Pause Music');
                }).catch(err => {
                    console.log('Audio playback permission needed:', err);
                });
            } else {
                bgAudio.pause();
                musicBtn.classList.remove('playing');
                musicBtn.setAttribute('title', 'Play Reflections');
            }
        }

        musicBtn.addEventListener('click', toggleMusic);

        // Turn off playing state when audio finishes (plays one time and stops)
        bgAudio.addEventListener('ended', () => {
            musicBtn.classList.remove('playing');
            musicBtn.setAttribute('title', 'Play Reflections');
        });

        // Try playing on first user interaction if blocked
        const enableAudioOnFirstClick = () => {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    musicBtn.classList.add('playing');
                }).catch(() => {});
            }
            document.removeEventListener('click', enableAudioOnFirstClick);
        };
        document.addEventListener('click', enableAudioOnFirstClick, { once: true });
    }

    // ===== GALLERY FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach((item, index) => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;
    let lightboxImages = [];

    function openLightbox(index) {
        lightboxImages = [];
        document.querySelectorAll('.gallery-item:not(.hidden) .gallery-image img').forEach(img => {
            lightboxImages.push(img.src);
        });

        currentLightboxIndex = index;
        lightboxImage.src = lightboxImages[currentLightboxIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = lightboxImages[currentLightboxIndex];
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    function nextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = lightboxImages[currentLightboxIndex];
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    // Gallery click handlers
    document.querySelectorAll('.gallery-image').forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // ===== TESTIMONIAL SLIDER =====
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dotsContainer.children[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dotsContainer.children[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        // Auto-play
        slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        const sliderWrapper = document.querySelector('.testimonials-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderWrapper.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // ===== RSVP FORM =====
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('rsvpSubmitBtn');
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                rsvpForm.style.display = 'none';
                rsvpSuccess.style.display = 'block';
                rsvpSuccess.style.animation = 'fadeInUp 0.6s ease';
            }, 1500);
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        window.addEventListener('scroll', handleBackToTop, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== PARALLAX EFFECT ON SCROLL =====
    const heroBg = document.querySelector('.hero-bg');

    function handleParallax() {
        const scrollY = window.scrollY;
        if (heroBg) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
        }
    }
    window.addEventListener('scroll', handleParallax, { passive: true });

    // ===== IMAGE LAZY LOAD ENHANCEMENT =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    imgObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            imgObserver.observe(img);
        });
    }

    // ===== CURSOR GLOW EFFECT (Desktop) =====
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(212,163,115,0.15), transparent);
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.15s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale up on hover over interactive elements
        document.querySelectorAll('a, button, .gallery-image').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(3)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // ===== COUNTER ANIMATION FOR STATS =====
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = String(Math.floor(progress * (end - start) + start)).padStart(2, '0');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    console.log('%c💕 Moments - Our Love Story', 'color: #D4A373; font-size: 20px; font-family: cursive;');
    console.log('%cMade with love ❤️', 'color: #E29578; font-size: 12px;');
});
