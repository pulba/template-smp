import { animate, cubicBezier } from "animejs";

// Initial run
initScrollAnimations();

// Run on view transition navigation
document.addEventListener("astro:page-load", () => {
  initScrollAnimations();
});

export function initScrollAnimations() {
  console.log("Initializing Anime.js Scroll Animations");

  const elements = document.querySelectorAll("[data-animate='fade']");
  if (elements.length === 0) return; // Exit if no elements found to avoid errors

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Play Fade In
        animate(entry.target, {
          translateY: [50, 0], // Slightly more distance for better effect
          opacity: [0, 1],
          ease: cubicBezier(0.1, 0.7, 0.5, 1), // Smoother easing
          duration: 1200,
          delay: 100, // Tiny delay to prevent instant harshness
        });
        // Optional: stop observing once animated if you don't want repeat
        // observer.unobserve(entry.target);
      } else {
        // Reset / Fade Out
        if (entry.boundingClientRect.y > 0) {
          animate(entry.target, {
            translateY: 50,
            opacity: 0,
            ease: cubicBezier(0.1, 0.7, 0.5, 1),
            duration: 600, // Faster exit
          });
        }
      }
    });
  }, {
    threshold: 0.1, // Trigger slightly later so it's definitely visible
    rootMargin: "0px 0px -10% 0px"
  });

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.willChange = "opacity, transform"; // Performance optimization
    observer.observe(el);
  });
}
