/**
 * CEODAVE - Seattle's Premier DJ Website
 * Interactive JavaScript with Crazy Visual Effects
 */

// ==========================================================================
// Matrix Rain Background Effect
// ==========================================================================

class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.chars = 'CEODAVESEATTLEDJBASSHOUSEHIPHOP01'.split('');

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(this.columnCount).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#ff006e';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.columns.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.columns[i] * this.fontSize;

            // Gradient effect - brighter at the head
            const opacity = Math.random() * 0.5 + 0.1;
            this.ctx.fillStyle = `rgba(255, 0, 110, ${opacity})`;
            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.columns[i] = 0;
            }
            this.columns[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// Particle System
// ==========================================================================

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.colors = ['#ff006e', '#00f5ff', '#8b5cf6', '#39ff14'];

        this.resize();
        this.init();
        this.bindEvents();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Mouse interaction
            if (this.mouse.x !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 2;
                    p.y -= Math.sin(angle) * force * 2;
                }
            }

            // Update position
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around screen
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.globalAlpha = 1;
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// Smooth Scroll & Navigation
// ==========================================================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        this.sections = document.querySelectorAll('section[id]');

        this.init();
    }

    init() {
        // Scroll effect for navbar
        window.addEventListener('scroll', () => this.handleScroll());

        // Hamburger menu toggle
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu?.contains(e.target) && !this.hamburger?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll() {
        // Add scrolled class to navbar
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger?.classList.toggle('active');
        this.mobileMenu?.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu?.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger?.classList.remove('active');
        this.mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            this.closeMobileMenu();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ==========================================================================
// Number Counter Animation
// ==========================================================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ==========================================================================
// Scroll Reveal Animations
// ==========================================================================

class ScrollReveal {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Add reveal class to elements
        const selectors = [
            '.section-header',
            '.about-image',
            '.about-text',
            '.genre-card',
            '.event-card',
            '.service-card',
            '.booking-info',
            '.booking-form-container',
            '.visualizer-container'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('reveal');
                this.elements.push(el);
            });
        });

        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ==========================================================================
// Form Handling
// ==========================================================================

class BookingForm {
    constructor() {
        this.form = document.getElementById('booking-form');
        this.init();
    }

    init() {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);

        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const eventType = formData.get('event-type');
        const eventDate = formData.get('event-date');
        const message = formData.get('message');

        // Build email content
        const subject = `DJ Booking Inquiry - ${eventType}`;
        const body = `Name: ${name}
Email: ${email}
Event Type: ${eventType}
Event Date: ${eventDate}

Message:
${message}`;

        // Open email client directly
        window.location.href = `mailto:ceodave9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Reset form after opening email
        this.form.reset();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#39ff14' : '#ff006e'};
            color: #0a0a0f;
            border-radius: 10px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 5000);
    }
}

// ==========================================================================
// Audio Visualizer Animation
// ==========================================================================

class AudioVisualizer {
    constructor() {
        this.bars = document.querySelectorAll('.viz-bar');
        this.animate();
    }

    animate() {
        this.bars.forEach(bar => {
            const height = Math.random() * 80 + 20;
            bar.style.height = `${height}px`;
        });

        setTimeout(() => this.animate(), 100);
    }
}

// ==========================================================================
// Cursor Glow Effect
// ==========================================================================

class CursorGlow {
    constructor() {
        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        document.body.appendChild(this.glow);

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.glow.style.left = `${e.clientX}px`;
            this.glow.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mouseenter', () => {
            this.glow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// ==========================================================================
// Glitch Effect on Hover
// ==========================================================================

class GlitchEffect {
    constructor() {
        this.titles = document.querySelectorAll('.glitch, .logo-text');
        this.init();
    }

    init() {
        this.titles.forEach(title => {
            title.addEventListener('mouseenter', () => this.triggerGlitch(title));
        });
    }

    triggerGlitch(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
    }
}

// ==========================================================================
// Vinyl Spin Speed Controller
// ==========================================================================

class VinylController {
    constructor() {
        this.vinyls = document.querySelectorAll('.vinyl');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollSpeed = Math.min(Math.abs(window.scrollY) / 100, 3);
            this.vinyls.forEach(vinyl => {
                vinyl.style.animationDuration = `${4 / (1 + scrollSpeed)}s`;
            });
        });
    }
}

// ==========================================================================
// Genre Card Hover Effects
// ==========================================================================

class GenreCards {
    constructor() {
        this.cards = document.querySelectorAll('.genre-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.left = `${x - rect.width}px`;
            glow.style.top = `${y - rect.height}px`;
        }
    }

    handleMouseLeave(e, card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    }
}

// ==========================================================================
// Typing Effect for Taglines
// ==========================================================================

class TypeWriter {
    constructor(element, texts, wait = 3000) {
        this.element = element;
        this.texts = texts;
        this.wait = wait;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const matrixCanvas = document.getElementById('matrix-bg');
    if (matrixCanvas) {
        const matrix = new MatrixRain(matrixCanvas);
        matrix.animate();
    }

    // Initialize Particle System
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const particles = new ParticleSystem(particleCanvas);
        particles.animate();
    }

    // Initialize Navigation
    new Navigation();

    // Initialize Counter Animation
    new CounterAnimation();

    // Initialize Scroll Reveal
    new ScrollReveal();

    // Initialize Booking Form
    new BookingForm();

    // Initialize Audio Visualizer
    new AudioVisualizer();

    // Initialize Cursor Glow (desktop only)
    if (window.innerWidth > 768) {
        new CursorGlow();
    }

    // Initialize Glitch Effect
    new GlitchEffect();

    // Initialize Vinyl Controller
    new VinylController();

    // Initialize Genre Cards
    new GenreCards();

    // Add animation keyframes for slideIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('%c🎧 CEODAVE - Seattle\'s Premier DJ 🎧',
        'background: linear-gradient(135deg, #ff006e, #8b5cf6, #00f5ff); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
    );
    console.log('%cBook now: ceodave9@gmail.com | TikTok: @ceo_dave9',
        'color: #ff006e; font-size: 14px;'
    );
});

// ==========================================================================
// Preloader (Optional Enhancement)
// ==========================================================================

window.addEventListener('load', () => {
    // Remove any preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }

    // Trigger initial animations
    document.body.classList.add('loaded');
});

// ==========================================================================
// Performance Optimization - Reduce animations on low FPS
// ==========================================================================

let fps = 60;
let lastTime = performance.now();
let frameCount = 0;

function checkFPS() {
    const currentTime = performance.now();
    frameCount++;

    if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // Reduce animations if FPS is too low
        if (fps < 30) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
    }

    requestAnimationFrame(checkFPS);
}

checkFPS();
