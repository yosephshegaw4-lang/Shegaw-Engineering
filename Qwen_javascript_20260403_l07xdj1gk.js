// Mobile Navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.textContent = '☰';
  });
});

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const statusDiv = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    try {
      // For Netlify Forms - just add netlify attribute to form
      // Or use Formspree/other service
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        statusDiv.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        statusDiv.className = 'success';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      statusDiv.textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
      statusDiv.className = 'error';
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.classList.remove('loading');
      setTimeout(() => statusDiv.className = '', 5000);
    }
  });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .stat-item').forEach(el => {
  observer.observe(el);
});

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();