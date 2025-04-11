  // Toggle mobile menu
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
  }
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });
  
  // Sticky navbar
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
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
  document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks! Your message has been sent.");
    this.reset();
  });
  