    document.addEventListener("DOMContentLoaded", function () {
      // ====== THEME TOGGLE ======
      const themeToggle = document.getElementById("themeToggle");
      const themeIcon = themeToggle.querySelector("i");
      
      // Check for saved theme or system preference
      const savedTheme = localStorage.getItem("nexus-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.className = "fas fa-sun";
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-moon";
      }
      
      themeToggle.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
          document.documentElement.setAttribute("data-theme", "light");
          themeIcon.className = "fas fa-moon";
          localStorage.setItem("nexus-theme", "light");
          showToast("Light mode activated");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          themeIcon.className = "fas fa-sun";
          localStorage.setItem("nexus-theme", "dark");
          showToast("Dark mode activated");
        }
      });

      // ====== MOBILE MENU ======
      const menuIcon = document.getElementById("menuIcon");
      const navLinks = document.getElementById("navLinks");
      const menuIconIcon = menuIcon.querySelector("i");

      menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
          menuIconIcon.className = "fas fa-times";
          menuIcon.setAttribute("aria-label", "Close menu");
        } else {
          menuIconIcon.className = "fas fa-bars";
          menuIcon.setAttribute("aria-label", "Open menu");
        }
      });

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          menuIconIcon.className = "fas fa-bars";
          menuIcon.setAttribute("aria-label", "Open menu");
        });
      });

      // ====== SMOOTH SCROLL ======
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;
          
          const target = document.querySelector(targetId);
          if (target) {
            const navbarHeight = document.getElementById("navbar").offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
            
            // Update active nav link
            document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
            this.classList.add("active");
          }
        });
      });

      // ====== STICKY NAVBAR EFFECT ======
      window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        const scrollPosition = window.scrollY;
        
        // Add shadow and background on scroll
        if (scrollPosition > 50) {
          navbar.style.boxShadow = "0 10px 30px var(--shadow-color)";
          navbar.style.background = "var(--nav-bg)";
        } else {
          navbar.style.boxShadow = "0 2px 20px var(--shadow-color)";
          navbar.style.background = "var(--nav-bg)";
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll("section[id], header[id]");
        let currentSection = "";
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const navbarHeight = navbar.offsetHeight;
          
          if (scrollPosition >= (sectionTop - navbarHeight - 100)) {
            currentSection = section.getAttribute("id");
          }
        });
        
        document.querySelectorAll(".nav-links a").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
          }
        });
        
        // Show/hide back to top button
        const backToTop = document.getElementById("backToTop");
        if (scrollPosition > 300) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      });

      // ====== BACK TO TOP ======
      document.getElementById("backToTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // ====== CONTACT FORM ======
      const contactForm = document.getElementById("contactForm");
      const toast = document.getElementById("toast");
      const toastMessage = document.getElementById("toastMessage");

      function showToast(message, type = "success") {
        const toastIcon = toast.querySelector(".toast-icon");
        toastMessage.textContent = message;
        
        if (type === "error") {
          toastIcon.className = "fas fa-exclamation-circle toast-icon";
          toastIcon.style.color = "var(--danger-color)";
        } else if (type === "warning") {
          toastIcon.className = "fas fa-exclamation-triangle toast-icon";
          toastIcon.style.color = "var(--warning-color)";
        } else {
          toastIcon.className = "fas fa-check-circle toast-icon";
          toastIcon.style.color = "var(--secondary-color)";
        }
        
        toast.classList.add("show");
        
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      }

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (!name || !email || !subject || !message) {
          showToast("Please fill in all required fields", "error");
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showToast("Please enter a valid email address", "error");
          return;
        }
        
        // Simulate form submission
        showToast("Message sent successfully! We'll get back to you soon.");
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server here
        // Example: fetch('/api/contact', { method: 'POST', body: new FormData(this) })
      });

      // ====== ANIMATE SKILL BARS ON SCROLL ======
      const skillBars = document.querySelectorAll('.skill-progress');
      
      function animateSkillBars() {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          
          setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
          }, 300);
        });
      }
      
      // Use Intersection Observer to trigger animation
      const skillsSection = document.getElementById('skill');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      if (skillsSection) {
        observer.observe(skillsSection);
      }

      // ====== FADE IN ANIMATIONS ======
      const fadeElements = document.querySelectorAll('.fade-in');
      
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        fadeObserver.observe(el);
      });

      // ====== KEYBOARD SHORTCUTS ======
      document.addEventListener("keydown", (e) => {
        // Ctrl/Cmd + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === "t") {
          e.preventDefault();
          themeToggle.click();
        }
        
        // Escape to close mobile menu
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuIconIcon.className = "fas fa-bars";
          menuIcon.setAttribute("aria-label", "Open menu");
        }
      });

      // ====== INITIALIZE ======
      // Set current year in footer (if needed)
      const currentYear = new Date().getFullYear();
      document.querySelector('.footer-bottom p').innerHTML = 
        document.querySelector('.footer-bottom p').innerHTML.replace('2025', currentYear);
      
      // Add loading animation
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s';
      
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  