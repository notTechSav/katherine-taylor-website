/* ============================================
   PHASE 3: JAVASCRIPT INTERACTIONS
   YSL-inspired luxury website interactions
   ============================================ */

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  // Toggle menu on hamburger click
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  });

  // Close menu when a navigation link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

  // Close menu on escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });
});

// ============================================
// SMOOTH SCROLL ENHANCEMENT (optional)
// ============================================

// This enhances the native smooth scroll behavior
// especially useful for older browsers
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Don't prevent default for hash-only links
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });
});

// ============================================
// VIDEO AUTOPLAY OPTIMIZATION
// ============================================

// Pause videos that are not in viewport to save resources
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.bg-video');

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, {
      threshold: 0.5 // Play when 50% of video is visible
    });

    videos.forEach(video => {
      videoObserver.observe(video);
    });
  }
});

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================

// Lazy load gallery images for better performance
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.gallery-slider img');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // If image has data-src, load it
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
});
