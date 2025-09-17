// Toggle mobile menu
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  if (navLinks.classList.contains("active")) {
    menuIcon.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Sticky navbar - already fixed so no need for scroll class addition
// Just adding a slight background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(30, 30, 47, 0.95)";
    navbar.style.padding = "0";
  } else {
    navbar.style.background = "#1e1e2f";
  }

  // Show/hide back to top button
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// Back to top button
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fake form submission handler
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks! Your message has been sent.");
    this.reset();
  });
