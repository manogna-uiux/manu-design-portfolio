// Case Study JavaScript - Smooth scrolling and navbar behavior

// Smooth scrolling
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

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// Circular text effect for next case study
document.addEventListener('DOMContentLoaded', () => {
    const nextCaseStudyText = document.querySelector(".next-case-study-section .circular-text-next .text");
    if (nextCaseStudyText) {
        nextCaseStudyText.innerHTML = nextCaseStudyText.innerText
            .split("")
            .map(
                (char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`
            )
            .join("");
        
        // Slow rotation for circular text
        gsap.to('.next-case-study-section .circular-text-next .text', {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1
        });
    } else {
        console.log('Circular text element not found');
    }

    // Vertical Tabs Functionality
    initializeVerticalTabs();
    
    // Initialize Scroll Animations
    initializeScrollAnimations();
});

// Hero animations function
function startHeroAnimations() {
    gsap.fromTo('.hero-title', 
        { x: -100, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power2.out",
            delay: 0.3
        }
    );
}

// Scroll Animations
function initializeScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Start hero animations immediately since image is always visible
    startHeroAnimations();
    
    // Meta Section Animation
    gsap.fromTo('.meta-text', 
        { x: -50, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.project-meta',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    gsap.fromTo('.meta-info-container', 
        { x: 50, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: '.project-meta',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Meta Tags Animation
    gsap.fromTo('.meta-tag', 
        { y: 30, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.meta-tags',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Gallery Grid Animation
    gsap.fromTo('.gallery-item-large', 
        { scale: 0.8, opacity: 0 },
        { 
            scale: 1, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.image-gallery-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Large Centered Image Animation
    gsap.fromTo('.large-centered-image', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.large-image-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Design Process Section Animation
    gsap.fromTo('.process-title', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.design-process-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    gsap.fromTo('.process-image', 
        { scale: 0.9, opacity: 0 },
        { 
            scale: 1, 
            opacity: 1, 
            duration: 1.2,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: '.design-process-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    

    
    // Image Grid 2x4 Animation
    gsap.fromTo('.grid-item', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.image-grid-2x4',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Next Case Study Section Animation
    gsap.fromTo('.next-case-study-left', 
        { x: -50, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.next-case-study-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    gsap.fromTo('.next-case-study-right', 
        { x: 50, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: '.next-case-study-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    

}

// Vertical Tabs Functionality
function initializeVerticalTabs() {
    const tabHeadings = document.querySelectorAll('.tab-heading');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabsSection = document.querySelector('.vertical-tabs-section');
    
    if (!tabsSection) return;

    // Click functionality for tab switching
    tabHeadings.forEach(heading => {
        heading.addEventListener('click', () => {
            const targetTab = heading.getAttribute('data-tab');
            switchToTab(targetTab);
        });
    });

    // Function to switch to a specific tab
    function switchToTab(tabId) {
        // Remove active class from all headings and contents
        tabHeadings.forEach(h => h.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to corresponding heading and content
        const targetHeading = document.querySelector(`[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);
        
        if (targetHeading && targetContent) {
            targetHeading.classList.add('active');
            targetContent.classList.add('active');
            
            // Smooth scroll to the content area
            targetContent.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Enhanced scroll-based tab highlighting with automatic progression
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px', // Increased margin for better detection
        threshold: 0.3
    };

    let currentActiveTab = 'research'; // Default to first tab
    let isScrolling = false;

    const tabObserver = new IntersectionObserver((entries) => {
        if (isScrolling) return; // Prevent interference during programmatic scrolling
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tabId = entry.target.id;
                const correspondingHeading = document.querySelector(`[data-tab="${tabId}"]`);
                
                if (correspondingHeading && tabId !== currentActiveTab) {
                    currentActiveTab = tabId;
                    
                    // Remove active class from all headings
                    tabHeadings.forEach(h => h.classList.remove('active'));
                    // Add active class to corresponding heading
                    correspondingHeading.classList.add('active');
                    
                    // Trigger content animation
                    animateTabContent(tabId);
                }
            }
        });
    }, observerOptions);

    // Observe all tab contents
    tabContents.forEach(content => {
        tabObserver.observe(content);
    });

    // Function to animate tab content
    function animateTabContent(tabId) {
        const content = document.getElementById(tabId);
        if (content) {
            gsap.fromTo(content, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    ease: "power2.out",
                    delay: 0.2
                }
            );
        }
    }

    // GSAP animations for initial content load
    tabContents.forEach(content => {
        gsap.set(content, { opacity: 0, y: 20 });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(content);
    });



    // Enhanced scroll snapping for better sequential experience
    const scrollSnapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tabId = entry.target.id;
                const rect = entry.target.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // If content is more than 50% visible, consider it active
                if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
                    if (tabId !== currentActiveTab) {
                        currentActiveTab = tabId;
                        const correspondingHeading = document.querySelector(`[data-tab="${tabId}"]`);
                        
                        if (correspondingHeading) {
                            tabHeadings.forEach(h => h.classList.remove('active'));
                            correspondingHeading.classList.add('active');
                        }
                    }
                }
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    // Observe all tab contents for scroll snapping
    tabContents.forEach(content => {
        scrollSnapObserver.observe(content);
    });

    // Animated Counter Functionality
    initializeAnimatedCounters();
}

// Animated Counter Functionality
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.impact-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const currentText = counter.textContent;
                
                // Only animate if the counter has a data-target attribute
                if (counter.hasAttribute('data-target')) {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = current.toFixed(1);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toFixed(1);
                        }
                    };
                    
                    updateCounter();
                }
                
                counterObserver.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
} 