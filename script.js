// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Animation frame loop for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate ScrollTrigger with Lenis
ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

lenis.on('scroll', ScrollTrigger.update);

ScrollTrigger.addEventListener('refresh', () => lenis.resize());



document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    
    if (mobileMenuBtn && mobileNavMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            console.log('Mobile menu button clicked');
            mobileMenuBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
            console.log('Mobile menu active:', mobileNavMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileNavMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu when screen size changes to large screens
        const closeMobileMenuOnLargeScreen = () => {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
        };
        
        // Check on page load
        closeMobileMenuOnLargeScreen();
        
        // Check on resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Immediately close if screen is large
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
            
            // Also check after a short delay to catch any edge cases
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(closeMobileMenuOnLargeScreen, 100);
        });
    } else {
        console.error('Mobile menu elements not found');
    }
    
    // Hero Section Animations
    const heroAnimations = () => {
        // Set initial state for masked reveal
        gsap.set('.hero-text h2, .hero-text h1', {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
        });
        
        const tl = gsap.timeline({ delay: 0.4 });
        
        // Animate hero text elements with gentle, smooth stagger
        tl.to('.hero-text h2, .hero-text h1', {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.4,
            ease: "power3.out"
        })
        .to('.hero-desc', {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out"
        }, "+=0.15")
        .to('.arrow-circle, .circular-text, .center-text', {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out"
        }, "-=0.3");
    };

    // Initialize hero animations
    heroAnimations();

    // Circular text effect
    const text = document.querySelector(".text");
    text.innerHTML = text.innerText
        .split("")
        .map(
            (char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`
        )
        .join("");

    // Case study button circular text effect
    const caseStudyTexts = document.querySelectorAll(".arrow-icon");
    caseStudyTexts.forEach(textElement => {
        textElement.innerHTML = textElement.innerText
            .split("")
            .map(
                (char, i) => `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
            )
            .join("");
    });

    // Additional subtle animations
    const subtleAnimations = () => {
        // Floating animation for arrow circle
        gsap.to('.arrow-circle', {
            y: -10,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Slow rotation for circular text
        gsap.to('.circular-text .text', {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1
        });


    };

    // Start subtle animations after initial animations complete
    setTimeout(subtleAnimations, 3000);

    // Scroll-triggered animations for hero elements
    const scrollAnimations = () => {
        // Fade out hero elements on scroll
        gsap.to('.hero-text', {
            opacity: 0.3,
            y: -50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // About section word-by-word masked reveal effect
        const aboutText = document.querySelector('.about-text');
        const aboutTextShadow = document.querySelector('.about-text-shadow');
        
        if (aboutText && aboutTextShadow) {
            const lines = aboutText.querySelectorAll('span');
            const shadowLines = aboutTextShadow.querySelectorAll('span');
            
            // Set initial state - lines start from left (masked)
            gsap.set(lines, { clipPath: "inset(0 100% 0 0)" });
            gsap.set(shadowLines, { opacity: 0.2 }); // Shadow text always visible with 0.2 opacity
            
            // Create timeline for line-by-line reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 30%",
                    end: "bottom 20%",
                    scrub: 1
                }
            });
            
            // Animate main text lines from left to right
            lines.forEach((line, index) => {
                tl.to(line, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 2,
                    ease: "power2.out"
                }, index * 0.4);
            });
            
            // No animation for shadow text - it stays at 0.2 opacity always
        }
        
        // Stats section animations
        const statItems = document.querySelectorAll('.stat-item');
        
        if (statItems.length > 0) {
            // Set initial state for stats
            gsap.set(statItems, { 
                y: 50, 
                opacity: 0,
                scale: 0.9
            });
            
            // Create timeline for stats animation
            const statsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // Animate stats with staggered effect
            statsTimeline.to(statItems, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                stagger: 0.2
            });
        }

    };

    // Initialize scroll animations
    scrollAnimations();
    
    // Handle window resize for case study button animations
    let caseStudyAnimation = null;
    
    const handleCaseStudyAnimation = () => {
        // Kill existing animation if it exists
        if (caseStudyAnimation) {
            caseStudyAnimation.kill();
        }
        
        // Only create animation on desktop
        if (window.innerWidth > 768) {
            caseStudyAnimation = gsap.to('.case-study-btn .arrow-icon', {
                rotation: 360,
                duration: 15,
                ease: "none",
                repeat: -1
            });
        }
    };
    
    // Initial setup
    handleCaseStudyAnimation();
    
    // Listen for window resize
    window.addEventListener('resize', handleCaseStudyAnimation);
    
    // Debug: Check mobile buttons on load
    setTimeout(() => {
        const mobileButtons = document.querySelectorAll('.mobile-case-study-btn');
        const circularOverlays = document.querySelectorAll('.case-study-overlay');
        
        console.log('Mobile buttons found:', mobileButtons.length);
        console.log('Circular overlays found:', circularOverlays.length);
        
        mobileButtons.forEach((btn, index) => {
            console.log(`Mobile button ${index + 1} display:`, window.getComputedStyle(btn).display);
            console.log(`Mobile button ${index + 1} visibility:`, window.getComputedStyle(btn).visibility);
        });
        
        circularOverlays.forEach((overlay, index) => {
            console.log(`Circular overlay ${index + 1} display:`, window.getComputedStyle(overlay).display);
            console.log(`Circular overlay ${index + 1} visibility:`, window.getComputedStyle(overlay).visibility);
        });
    }, 1000);

    // About section is now empty - no scroll images needed

    // Images trail effect - commented out for now
    /*
    const container = document.querySelector('.about-section');

    const config = {
        imageCount: 20,
        imageLifespan: 750,
        removalDelay: 50,
        mouseThreshold: 100,
        scrollThreshold: 50,
        idleCursorInterval: 300,
        inDuration: 750,
        outDuration: 1000,
        inEasing: 'cubic-bezier(.07,.5,.5,1)',
        outEasing: 'cubic-bezier(.87,0,.13,1)',
    };

    const images = Array.from(
        { length: config.imageCount }, 
        (_, i) => `https://picsum.photos/id/${i+1}/200`
    );

    console.log(images);
    const trail = [];

    let mouseX = 0,
        mouseY = 0,
        lastMouseX = 0,
        lastMouseY = 0;

    let isMoving = false,
        isCursorInContainer = 0;

    let lastRemovalTime = 0,
        lastSteadyImageTime = 0,
        lastScrollTime = 0;

    let isScrolling = false,
        scrollTicking = false;

    const isInContainer = (x, y) => {
        const rect = container.getBoundingClientRect();
        return (
            x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
        )
    };

    const setInitialMousePos = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        isCursorInContainer = isInContainer(mouseX, mouseY);
        document.removeEventListener('mouseover', setInitialMousePos, false);
    };
    document.addEventListener('mouseover', setInitialMousePos, false);

    const hasMovedEnough = () => {
        const distance = Math.sqrt(
            Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
        );
        return distance > config.mouseThreshold;
    };

    const createTrailImage = () => {
        if (!isCursorInContainer) return;

        const now = Date.now();

        if (isMoving && hasMovedEnough()) {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            createImage();
            return;
        }

        if (!isMoving && now - lastSteadyImageTime >= config.idleCursorInterval) {
            lastSteadyImageTime = now;
            createImage();
        }
    };

    const createImage = () => {
        const img = document.createElement('img');
        img.classList.add('trail-img');

        const randomIndex = Math.floor(Math.random() * images.length);
        const rotation = (Math.random() - 0.5) * 50;
        img.src = images[randomIndex];

        const rect = container.getBoundingClientRect();
        const relativeX = mouseX - rect.left;
        const relativeY = mouseY - rect.top;

        img.style.left = `${relativeX}px`;
        img.style.top = `${relativeY}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

        container.appendChild(img);

        setTimeout(() => {
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        }, 10);

        trail.push({
            element: img,
            rotation: rotation,
            removeTime: Date.now() + config.imageLifespan,
        });
    };

    const removeTrailImage = (img) => {
        const index = trail.findIndex((item) => item.element === img);
        if (index !== -1) {
            trail.splice(index, 1);
        }
    };

    const createScrollTrailImage = () => {
        if(!isCursorInContainer) return;

        lastMouseX += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
        lastMouseY += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);

        createImage();

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    };

    const removeOldImages = () => {
        const now = Date.now();

        if (now - lastRemovalTime < config.removalDelay || trail.length === 0) return;

        const oldestImage = trail[0];
        if (now >= oldestImage.removeTime) {
            const imgToRemove = trail.shift();
            imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
            imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
        
            lastRemovalTime = now;

            setTimeout(() => {
                if (imgToRemove.element.parentNode) {
                    imgToRemove.element.parentNode.removeChild(imgToRemove.element);
                }
            }, config.outDuration);
        }
    };

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isCursorInContainer = isInContainer(mouseX, mouseY);

        if (isCursorInContainer) {
            isMoving = true;
            clearTimeout(window.moveTimeout);
            window.moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }
    });

    // Use Lenis scroll event instead of window scroll
    lenis.on('scroll', () => {
        isCursorInContainer = isInContainer(mouseX, mouseY);

        if (isCursorInContainer) {
            isMoving = true;
            lastMouseX += (Math.random() - 0.5) * 10;

            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }
    });

    lenis.on('scroll', () => {
        const now = Date.now();
        isScrolling = true;

        if (now - lastScrollTime < config.scrollThreshold) return;

        if(!scrollTicking) {
            requestAnimationFrame(() => {
                if(isScrolling) {
                    createScrollTrailImage();
                    isScrolling = false;
                }
                scrollTicking = false;
            }); 
            scrollTicking = true;
        }
    });

    const animate = () => {
        createTrailImage();
        removeOldImages();
        requestAnimationFrame(animate);
    };

    animate();
    */



    // Latest Works Animation - Left to Center
    const initLatestWorksAnimation = () => {
        const worksTitle = document.querySelector('.works-title');
        const worksHeading = document.querySelector('.latest-works-heading');
        
        if (!worksTitle || !worksHeading) return;

        // Reset initial position to left (subtle distance)
        gsap.set(worksTitle, {
            x: '-50%',
            textAlign: 'left',
            paddingRight: '0px',
            opacity: 0.7
        });

        // Create ScrollTrigger animation
        gsap.to(worksTitle, {
            x: '0px', // Move to the center
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: worksHeading,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1, // Smooth scrubbing effect
                toggleActions: "play none none reverse"
            }
        });

        // Animate the rocket icon with bounce effect
        gsap.fromTo(worksTitle.querySelector('i'), {
            y: 0,
            scale: 0.8,
            rotation: -15
        }, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: worksHeading,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Add continuous bounce animation to rocket
        gsap.to(worksTitle.querySelector('i'), {
            y: -3,
            duration: 1.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.5,
            scrollTrigger: {
                trigger: worksHeading,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    };

    // Initialize the Latest Works animation
    initLatestWorksAnimation();

    // Contact Section Animations
    const initContactAnimations = () => {
        const contactItems = document.querySelectorAll('.contact-item');
        const socialLinks = document.querySelectorAll('.social-link');
        const arrowCircle = document.querySelector('.social-links .arrow-circle');
        const contactTitle = document.querySelector('.contact-title');
        const contactSubtitle = document.querySelector('.contact-subtitle');

        // Animate contact title and subtitle (left side) - starts first
        gsap.fromTo(contactTitle, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(contactSubtitle, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: '.contact-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate contact items with stagger (right side) - starts after left side
        gsap.fromTo(contactItems, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.5, // Reduced delay to make it faster
            scrollTrigger: {
                trigger: '.contact-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate arrow circle and social links together (right side) - starts after contact items
        gsap.fromTo([arrowCircle, ...socialLinks], {
            opacity: 0,
            scale: 0.8,
            y: 20
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.8, // Reduced delay to make it faster
            scrollTrigger: {
                trigger: '.contact-section',
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });
    };

    // Resume download function
    window.downloadResume = function() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = './assets/resume.pdf'; // Update this path to your actual resume file
        link.download = 'Resume.pdf';
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Scroll to top function
    window.scrollToTop = function() {
        lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    };

    // Scroll to contact function
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop;
            lenis.scrollTo(offsetTop, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        }
    };

    // Initialize contact animations
    initContactAnimations();
});