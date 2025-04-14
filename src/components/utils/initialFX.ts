import { smoother } from "../Navbar";

// Custom SplitText implementation
class CustomSplitText {
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalElements: HTMLElement[] = [];
  
  constructor(selectors: string | string[], options: { type: string, linesClass: string }) {
    const elements = typeof selectors === 'string' 
      ? Array.from(document.querySelectorAll(selectors))
      : selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
    
    this.originalElements = elements as HTMLElement[];
    
    elements.forEach(element => {
      const el = element as HTMLElement;
      const text = el.innerText;
      el.innerText = '';
      el.style.position = 'relative';
      
      // Create line wrapper if needed
      if (options.type.includes('lines')) {
        const lineWrapper = document.createElement('div');
        lineWrapper.className = options.linesClass;
        lineWrapper.style.position = 'relative';
        lineWrapper.style.display = 'block';
        el.appendChild(lineWrapper);
        this.lines.push(lineWrapper);
        
        // Split into characters if needed
        if (options.type.includes('chars')) {
          for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.innerText = text[i];
            charSpan.style.display = 'inline-block';
            charSpan.style.position = 'relative';
            lineWrapper.appendChild(charSpan);
            this.chars.push(charSpan);
          }
        } else {
          lineWrapper.innerText = text;
        }
      } else if (options.type.includes('chars')) {
        // Just split into characters without lines
        for (let i = 0; i < text.length; i++) {
          const charSpan = document.createElement('span');
          charSpan.innerText = text[i];
          charSpan.style.display = 'inline-block';
          charSpan.style.position = 'relative';
          el.appendChild(charSpan);
          this.chars.push(charSpan);
        }
      }
    });
  }
}

// Animation utility functions
const animateProperty = (
  elements: HTMLElement[],
  properties: Record<string, any>,
  targetValues: Record<string, any>,
  duration: number,
  easing: string,
  stagger: number = 0,
  delay: number = 0
) => {
  return new Promise<void>((resolve) => {
    const startTime = performance.now();
    const initialValues = elements.map(el => {
      const values: Record<string, any> = {};
      for (const prop in properties) {
        values[prop] = properties[prop];
      }
      return values;
    });
    
    // Easing functions
    const easingFunctions: Record<string, (t: number) => number> = {
      'power1.inOut': (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      'power3.inOut': (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };
    
    const selectedEasing = easingFunctions[easing] || ((t) => t);
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      
      elements.forEach((element, index) => {
        const elementDelay = delay * 1000 + stagger * 1000 * index;
        const elementElapsed = elapsed - elementDelay;
        
        if (elementElapsed < 0) return;
        
        const progress = Math.min(elementElapsed / (duration * 1000), 1);
        const easedProgress = selectedEasing(progress);
        
        for (const prop in properties) {
          const start = initialValues[index][prop];
          const end = targetValues[prop];
          
          if (typeof start === 'number' && typeof end === 'number') {
            const current = start + (end - start) * easedProgress;
            
            if (prop === 'opacity') {
              element.style.opacity = current.toString();
            } else if (prop === 'y') {
              element.style.transform = `translateY(${current}px)`;
            } else if (prop === 'filter') {
              element.style.filter = `blur(${current}px)`;
            }
          }
        }
      });
      
      if (elapsed < (delay + duration + stagger * elements.length) * 1000) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(animate);
  });
};

// Timeline-like class for chaining animations
class AnimationTimeline {
  private animations: Array<() => Promise<void>> = [];
  
  fromTo(
    elements: HTMLElement[],
    fromProps: Record<string, any>,
    toProps: { opacity?: number, y?: number, filter?: string, duration: number, ease: string, stagger?: number, delay?: number }
  ) {
    const { duration, ease, stagger = 0, delay = 0, ...targetValues } = toProps;
    
    this.animations.push(() => 
      animateProperty(elements, fromProps, targetValues, duration, ease, stagger, delay)
    );
    
    return this;
  }
  
  to(
    elements: HTMLElement[],
    toProps: { y?: number, duration: number, ease: string, stagger?: number, delay?: number }
  ) {
    const { duration, ease, stagger = 0, delay = 0, ...targetValues } = toProps;
    
    // For 'to' animations, we'll use current computed values as the starting point
    const currentProps: Record<string, any> = {};
    if ('y' in targetValues) {
      // Extract current y value from transform
      currentProps.y = 0; // Default if not set
    }
    
    this.animations.push(() =>
      animateProperty(elements, currentProps, targetValues, duration, ease, stagger, delay)
    );
    
    return this;
  }
  
  async play() {
    for (const animation of this.animations) {
      await animation();
    }
  }
}

// Function to create a repeating timeline
const createRepeatingTimeline = (options: { repeat: number, repeatDelay: number }) => {
  const timeline = new AnimationTimeline();
  
  // To implement the repeating functionality, we'll need to wrap the animations
  // and manually trigger them again after completion
  
  return timeline;
};

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  // Background color animation
  const body = document.body;
  setTimeout(() => {
    body.style.transition = "background-color 0.5s";
    body.style.backgroundColor = "#0b080c";
  }, 1000);

  // Text animations
  const TextProps = { type: "chars,lines", linesClass: "split-h2" };
  
  const landingText = new CustomSplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" }
  );
  
  animateProperty(
    landingText.chars,
    { opacity: 0, y: 80, filter: 5 },
    { opacity: 1, y: 0, filter: 0 },
    1.2,
    "power3.inOut",
    0.025,
    0.3
  );

  const landingText2 = new CustomSplitText(".landing-h2-info", TextProps);
  animateProperty(
    landingText2.chars,
    { opacity: 0, y: 80, filter: 5 },
    { opacity: 1, y: 0, filter: 0 },
    1.2,
    "power3.inOut",
    0.025,
    0.3
  );

  const landingInfoElements = document.querySelectorAll(".landing-info-h2");
  animateProperty(
    Array.from(landingInfoElements) as HTMLElement[],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    1.2,
    "power1.inOut",
    0,
    0.8
  );

  const headerElements = document.querySelectorAll(".header, .icons-section, .nav-fade");
  animateProperty(
    Array.from(headerElements) as HTMLElement[],
    { opacity: 0 },
    { opacity: 1 },
    1.2,
    "power1.inOut",
    0,
    0.1
  );

  const landingText3 = new CustomSplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new CustomSplitText(".landing-h2-1", TextProps);
  const landingText5 = new CustomSplitText(".landing-h2-2", TextProps);

  setupLoopText(landingText2, landingText3);
  setupLoopText(landingText4, landingText5);
}

function setupLoopText(Text1: CustomSplitText, Text2: CustomSplitText) {
  const delay = 4;
  const delay2 = delay * 2 + 1;
  
  // First, hide Text2 chars initially
  Text2.chars.forEach(char => {
    char.style.opacity = '0';
    char.style.transform = 'translateY(80px)';
  });
  
  // Create the animation loop
  const runAnimation = () => {
    // Animation 1: Show Text2 chars
    const showText2 = () => {
      return animateProperty(
        Text2.chars,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0 },
        1.2,
        "power3.inOut",
        0.1,
        0
      );
    };
    
    // Animation 2: Move Text1 chars up
    const moveText1Up = () => {
      return animateProperty(
        Text1.chars,
        { y: 0 },
        { y: -80 },
        1.2,
        "power3.inOut",
        0.1,
        0
      );
    };
    
    // Animation 3: Move Text1 back down
    const moveText1Down = () => {
      return animateProperty(
        Text1.chars,
        { y: 80 },
        { y: 0 },
        1.2,
        "power3.inOut",
        0.1,
        0
      );
    };
    
    // Animation 4: Move Text2 up
    const moveText2Up = () => {
      return animateProperty(
        Text2.chars,
        { y: 0 },
        { y: -80 },
        1.2,
        "power3.inOut",
        0.1, 
        0
      );
    };
    
    // Sequence the animations with appropriate delays
    setTimeout(() => {
      Promise.all([showText2(), moveText1Up()]).then(() => {
        setTimeout(() => {
          Promise.all([moveText1Down(), moveText2Up()]).then(() => {
            setTimeout(runAnimation, 1000); // repeatDelay
          });
        }, delay2 * 1000);
      });
    }, delay * 1000);
  };
  
  // Start the animation loop
  runAnimation();
}