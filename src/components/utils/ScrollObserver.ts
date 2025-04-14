// ScrollObserver.ts - Add this file to your project to handle scroll animations

export class ScrollObserver {
  static init() {
    // Create an Intersection Observer to detect when elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add "is-visible" class when element is in viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      root: null, // Use viewport as root
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "0px 0px -50px 0px" // Adjust trigger area
    });

    // Target all elements that should animate on scroll
    const animateElements = document.querySelectorAll('.what-box-in, .what-content');
    
    // Add these elements to be observed
    animateElements.forEach(element => {
      element.classList.add('fade-in-section');
      observer.observe(element);
    });

    return observer;
  }
}

export default ScrollObserver;