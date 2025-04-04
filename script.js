// Mise à jour automatique de l'année dans le footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navigation mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Slider amélioré
const slider = {
    slides: document.querySelector('.slides'),
    dots: document.querySelectorAll('.control-dot'),
    prevArrow: document.querySelector('.prev'),
    nextArrow: document.querySelector('.next'),
    currentIndex: 0,
    slideCount: document.querySelectorAll('.slide').length,
    interval: null,
    
    init: function() {
        this.goToSlide(0);
        this.startAutoSlide();
        this.setupEventListeners();
        
        // Animation au chargement de la page
        document.querySelectorAll('.slide').forEach((slide, index) => {
            if (index === 0) {
                slide.style.opacity = 0;
                setTimeout(() => {
                    slide.style.transition = 'opacity 1s ease';
                    slide.style.opacity = 1;
                }, 300);
            }
        });
    },
    
    goToSlide: function(index) {
        if (index < 0) {
            index = this.slideCount - 1;
        } else if (index >= this.slideCount) {
            index = 0;
        }
        
        this.currentIndex = index;
        this.slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Animation plus fluide lors du changement de slide
        const currentSlide = document.querySelectorAll('.slide')[this.currentIndex];
        currentSlide.style.opacity = 0;
        setTimeout(() => {
            currentSlide.style.transition = 'opacity 0.7s ease';
            currentSlide.style.opacity = 1;
        }, 50);
        
        // Mise à jour des indicateurs
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    },
    
    nextSlide: function() {
        this.goToSlide(this.currentIndex + 1);
    },
    
    prevSlide: function() {
        this.goToSlide(this.currentIndex - 1);
    },
    
    startAutoSlide: function() {
        this.stopAutoSlide();
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    },
    
    stopAutoSlide: function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
    
    setupEventListeners: function() {
        this.prevArrow.addEventListener('click', () => {
            this.prevSlide();
            this.startAutoSlide();
        });
        
        this.nextArrow.addEventListener('click', () => {
            this.nextSlide();
            this.startAutoSlide();
        });
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.startAutoSlide();
            });
        });
        
        // Pause autoplay on hover
        this.slides.parentElement.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.slides.parentElement.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
};

// Initialize the slider
slider.init();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Animation des éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.contact-card, .about-text, .about-image, .slider-title');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Ajout des classes pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .contact-card, .about-text, .about-image, .slider-title {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Animation initiale et au scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});