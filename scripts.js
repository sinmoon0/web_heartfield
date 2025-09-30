// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Gallery item interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Gallery item ${index + 1} clicked`);
            // You could implement a lightbox here
        });
        
        // Add keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `갤러리 이미지 ${index + 1} 보기`);
    });
    
    // Video item interactions
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Video item ${index + 1} clicked`);
            // You could implement a video modal here
        });
        
        // Add keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make video items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `비디오 ${index + 1} 재생`);
    });
    
    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            // Clear previous error states
            inputs.forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate each field
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
                this.reset();
            } else {
                showNotification('모든 필수 항목을 올바르게 입력해주세요.', 'error');
            }
        });
        
        // Add input event listeners for real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Enhanced scroll animations using Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        const animateElements = document.querySelectorAll(
            '.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-fade-scale'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Download button click tracking
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('app-store') ? 'App Store' : 
                           this.classList.contains('google-play') ? 'Google Play' : 'Web App';
            
            console.log(`Download clicked: ${platform}`);
            showNotification(`${platform} 다운로드가 곧 시작됩니다.`, 'info');
            
            // Here you would redirect to the actual download links
            // window.open('your-app-store-link', '_blank');
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button, .footer-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Partner logo hover effects
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Helper Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Add click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-bg');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize parallax if user doesn't prefer reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initParallax();
}

// Handle prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Error handling for missing images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.opacity = '0.3';
        e.target.alt = '이미지를 불러올 수 없습니다';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Add CSS for error state
const errorStyles = `
    .error {
        border-color: #f44336 !important;
        box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
    }
    
    .error::placeholder {
        color: #f44336 !important;
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Ctrl+/
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
            mainContent.focus();
        }
    }
    
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navToggle.focus();
            }
        }
    }
});

// Add focus management for better accessibility
document.addEventListener('focusin', function(e) {
    // Add visible focus indicator for keyboard users
    if (e.target.matches('a, button, input, textarea, [tabindex]')) {
        e.target.classList.add('keyboard-focus');
    }
});

document.addEventListener('focusout', function(e) {
    e.target.classList.remove('keyboard-focus');
});

// Add mouse click handler to remove keyboard focus class
document.addEventListener('mousedown', function(e) {
    if (e.target.matches('a, button, input, textarea, [tabindex]')) {
        e.target.classList.remove('keyboard-focus');
    }
});

// Random Sport Tag Animation
function initSportTagAnimation() {
    const sportTags = document.querySelectorAll('.sport-tag');
    
    if (sportTags.length === 0) return;
    
    function activateRandomTag() {
        // Remove active class from all tags
        sportTags.forEach(tag => tag.classList.remove('active'));
        
        // Get a random tag and activate it
        const randomIndex = Math.floor(Math.random() * sportTags.length);
        sportTags[randomIndex].classList.add('active');
    }
    
    // Initial activation
    activateRandomTag();
    
    // Change every 3 seconds
    setInterval(activateRandomTag, 2000);
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherIcon) otherIcon.textContent = '▼';
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.textContent = '▼';
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.textContent = '▲';
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// SNS Post Slider functionality
function initPostSlider() {
    const postSlides = document.querySelectorAll('.post-slide');
    
    if (postSlides.length === 0) return;
    
    let currentSlide = 0;
    
    function showNextSlide() {
        // Remove active class from current slide
        postSlides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % postSlides.length;
        
        // Add active class to new slide
        postSlides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(showNextSlide, 5000);
}

// Initialize sport tag animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are rendered
    setTimeout(initSportTagAnimation, 500);
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize post slider
    initPostSlider();
    
    // Change step images for mobile
    changeStepImagesForMobile();
});

// Change step images based on screen size
function changeStepImagesForMobile() {
    const stepImages = document.querySelectorAll('.step-phone img');
    
    function updateImages() {
        const isMobile = window.innerWidth <= 480;
        
        stepImages.forEach((img, index) => {
            const stepNumber = String(index + 1).padStart(2, '0');
            const prefix = isMobile ? 'm_step_' : 'step_';
            const newSrc = `assets/images/steps/${prefix}${stepNumber}.png`;
            
            if (img.src !== newSrc) {
                img.src = newSrc;
            }
        });
    }
    
    // Initial update
    updateImages();
    
    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateImages, 250);
    });
}