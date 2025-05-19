/* JavaScript for mobile menu toggle and animations */
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }
  
  // Add intersection observer for section animations
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault(); // Prevent default form submission
      
      // Get form data
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      
      try {
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit form to Formspree
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Show success message
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#2e7d32';
          contactForm.reset();
          
          // Scroll to the form to show the success message
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Show error message
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.style.backgroundColor = '#d32f2f';
      } finally {
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  // Add smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add input focus animations
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});

// Force mobile responsive view (meta viewport is already set in HTML)
function checkMobileView() {
  // Add any additional mobile-specific adjustments here if needed
  if (window.innerWidth <= 480) {
    // Adjust for smallest screens
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (e.currentTarget === e.target) {
          this.classList.toggle('active');
        }
      });
    });
  }
}

window.addEventListener('resize', checkMobileView);
window.addEventListener('load', checkMobileView);

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Horizontal scrolling carousel for products
const productsGrid = document.querySelector('.products-grid');
let isDown = false;
let startX;
let scrollLeft;

productsGrid.addEventListener('mousedown', (e) => {
  isDown = true;
  productsGrid.style.cursor = 'grabbing';
  startX = e.pageX - productsGrid.offsetLeft;
  scrollLeft = productsGrid.scrollLeft;
});

productsGrid.addEventListener('mouseleave', () => {
  isDown = false;
  productsGrid.style.cursor = 'grab';
});

productsGrid.addEventListener('mouseup', () => {
  isDown = false;
  productsGrid.style.cursor = 'grab';
});

productsGrid.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - productsGrid.offsetLeft;
  const walk = (x - startX) * 2;
  productsGrid.scrollLeft = scrollLeft - walk;
}); 