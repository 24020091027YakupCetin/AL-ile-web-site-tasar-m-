document.addEventListener('DOMContentLoaded', () => {

    // 1. Mouse Tracking Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });

        const clickables = document.querySelectorAll('a, button, .portfolio-item, .service-card, .floating-element');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '450px';
                cursorGlow.style.height = '450px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(79, 172, 254, 0.25) 0%, rgba(255,255,255,0) 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '300px';
                cursorGlow.style.height = '300px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(106, 90, 249, 0.15) 0%, rgba(255,255,255,0) 70%)';
            });
        });
    }

    // 2. Typing Animation
    const typingText = document.getElementById('typing-text');
    const words = ["Frontend Geliştiricisi", "UI/UX Tasarımcısı", "Yazılım Mühendisi"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        if (!typingText) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 40 : 120;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // 3. Navbar Scroll Effect & Mobile Menu
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            hamburger.innerHTML = navLinksList.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // 4. Loading Spinner on Button Click (Simulate Loading then Scroll)
    const loader = document.getElementById('loader');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Bypass if href is "#"
            if (targetId === '#') return;
            
            const targetBlock = document.querySelector(targetId);
            if (targetBlock) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinksList && navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                    if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Show loader overlay
                if (loader) {
                    loader.classList.remove('hidden');
                    
                    setTimeout(() => {
                        loader.classList.add('hidden');
                        targetBlock.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 600); // 600ms delay for visual feedback
                } else {
                    targetBlock.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 5. Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left');
    
    if ('IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, revealOptions);
        
        revealElements.forEach(el => revealOnScroll.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 6. WhatsApp Button (Show after 70% scroll)
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            // Document height minus viewport height for total scrollable area
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (window.scrollY / scrollableHeight) * 100;
            
            if (scrollPercentage > 70) {
                whatsappBtn.classList.remove('hidden');
            } else {
                whatsappBtn.classList.add('hidden');
            }
        });
    }

    // Update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
