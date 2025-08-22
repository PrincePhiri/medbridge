// ======================= Smooth Transitions & Animations =======================
document.addEventListener("DOMContentLoaded", () => {
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");
  const landingButtons = document.querySelectorAll(".landing-btn");
  const heroOverlay = document.querySelector(".hero-overlay");

  // ===== Fade-in overlay =====
  if (heroOverlay) {
    heroOverlay.style.opacity = 0;
    heroOverlay.style.transition = "opacity 1s ease";
    setTimeout(() => {
      heroOverlay.style.opacity = 1;
    }, 100);
  }

  // ===== Fade-in hero content =====
  function fadeIn(element, delay = 0) {
    if (!element) return;
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    setTimeout(() => {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }, delay);
  }

  fadeIn(heroLeft, 200);
  fadeIn(heroRight, 400);

  // ===== Button hover scale effect =====
  landingButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.transition = "transform 0.3s ease";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });
});
