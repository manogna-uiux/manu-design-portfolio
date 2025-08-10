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

// Navbar scroll behavior
const navbar = document.querySelector('.case-study-navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Circular text effect for next case study
document.addEventListener('DOMContentLoaded', () => {
    const nextCaseStudyText = document.querySelector(".next-case-study-circular .text");
    if (nextCaseStudyText) {
        nextCaseStudyText.innerHTML = nextCaseStudyText.innerText
            .split("")
            .map(
                (char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`
            )
            .join("");
    }

    // Slow rotation for circular text
    gsap.to('.next-case-study-circular .circular-text .text', {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
    });
}); 