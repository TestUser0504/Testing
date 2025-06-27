import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

// Create a custom smoother interface that mimics GSAP's ScrollSmoother API
export interface CustomSmoother {
  scrollTo: (selector: string, animate?: boolean, position?: string) => void;
  scrollTop: (position?: number) => void;
  paused: (isPaused?: boolean) => boolean;
  refresh: () => void;
}

// Create a singleton instance that can be exported and used elsewhere
export let smoother: CustomSmoother;

const Navbar = () => {
  // const [isPaused, setIsPaused] = useState(true);
  
  useEffect(() => {
    // Custom smooth scroll implementation with better easing
    const smoothScroll = () => {
      let targetPosition = 0;
      let currentPosition = 0;
      let animationFrame: number | null = null;
      let isScrolling = false;
      const smoothFactor = 1.7; // Higher = smoother (similar to GSAP's smooth: 1.7)
      const speedFactor = 1.7; // Similar to GSAP's speed: 1.7
      
      const animate = () => {
        if (!isScrolling) return;
        
        // Calculate distance and apply easing
        const distance = targetPosition - currentPosition;
        
        // If we're close enough, just go to the target position
        if (Math.abs(distance) < 0.5) {
          currentPosition = targetPosition;
          window.scrollTo(0, currentPosition);
          isScrolling = false;
          return;
        }
        
        // Update current position with easing (creates smooth effect)
        currentPosition += distance / (10 / smoothFactor) * speedFactor;
        
        // Apply the scroll
        window.scrollTo(0, currentPosition);
        
        // Continue animation
        animationFrame = requestAnimationFrame(animate);
      };
      
      const scrollToPosition = (position: number, shouldAnimate: boolean = true) => {
        // Cancel any existing animation
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        
        if (!shouldAnimate) {
          window.scrollTo(0, position);
          return;
        }
        
        // Set up animation
        targetPosition = position;
        currentPosition = window.pageYOffset;
        isScrolling = true;
        
        // Start animation loop
        animationFrame = requestAnimationFrame(animate);
      };
      
      return {
        scrollToPosition,
        stop: () => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          isScrolling = false;
        }
      };
    };
    
    const scroller = smoothScroll();
    
    // Initialize our custom smoother implementation
    const createSmoother = (): CustomSmoother => {
      // Track if scrolling is paused
      let scrollingPaused = true;
      
      // Scroll to specific element
      const scrollTo = (selector: string, animate: boolean = true) => {
        if (scrollingPaused) return;
        
        const element = document.querySelector(selector);
        if (!element) return;
        
        // const [elementPos, viewportPos] = position.split(" ");
        
        // Calculate offset based on position parameters
        let offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
        
        // Adjust based on element position
        if (selector === "center") {
          offsetTop += element.clientHeight / 2 - window.innerHeight / 2;
        } else if (selector === "bottom") {
          offsetTop += element.clientHeight - window.innerHeight;
        }
        
        scroller.scrollToPosition(offsetTop, animate);
      };
      
      // Set scroll position directly
      const scrollTop = (position: number = 0) => {
        scroller.scrollToPosition(position, false);
      };
      
      // Toggle or get pause state
      const paused = (value?: boolean): boolean => {
        if (value !== undefined) {
          scrollingPaused = value;
          if (scrollingPaused) {
            scroller.stop();
          }
        }
        return scrollingPaused;
      };
      
      // Force recalculation
      const refresh = () => {
        // More advanced refresh would involve recalculating elements' positions
        scroller.stop();
        
        // Trigger reflow
        document.body.style.minHeight = `${document.body.scrollHeight}px`;
        requestAnimationFrame(() => {
          document.body.style.minHeight = "";
        });
      };
      
      return {
        scrollTo,
        scrollTop,
        paused,
        refresh
      };
    };
    
    // Initialize smoother
    smoother = createSmoother();
    smoother.scrollTop(0);
    smoother.paused(true);
    
    // Add smooth wrapper and content similar to GSAP's structure
    // const setupDOMStructure = () => {
    //   // Only set up if not already done
    //   if (!document.getElementById("smooth-wrapper")) {
    //     const content = document.body.innerHTML;
    //     document.body.innerHTML = `
    //       <div id="smooth-wrapper">
    //         <div id="smooth-content">${content}</div>
    //       </div>
    //     `;
        
    //     // Re-get the Navbar since we just replaced the DOM
    //     const navbar = document.querySelector(".header");
    //     if (navbar) {
    //       document.body.appendChild(navbar);
    //     }
    //   }
    // };
    
    // Uncomment this if you need the DOM structure that GSAP creates
    // setupDOMStructure();
    
    // Set up click handlers for navigation links
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          
          // Enable scrolling temporarily for navigation
          const wasPaused = smoother.paused();
          smoother.paused(false);
          
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
          
          // Restore previous paused state after navigation
          setTimeout(() => smoother.paused(wasPaused), 1500);
        }
      });
    });
    
    // Handle window resize
    const handleResize = () => {
      smoother.refresh();
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup event listeners on unmount
    return () => {
      scroller.stop();
      links.forEach((elem) => {
        const element = elem as HTMLAnchorElement;
        element.removeEventListener("click", () => {});
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SahasP
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          sahasprajapati54@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;