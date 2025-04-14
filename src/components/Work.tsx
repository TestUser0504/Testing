import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const workFlexRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      category: "Web Development",
      tools: "React, TypeScript, GSAP",
      image: "/images/threads.png",
    },
    {
      id: 2,
      title: "E-Commerce App",
      category: "Mobile App",
      tools: "React Native, Redux, Firebase",
      image: "/images/resumeai.png",
    },
    {
      id: 3,
      title: "3D Visualization",
      category: "3D Graphics",
      tools: "Three.js, Blender",
      image: "/images/data.png",
    },
    {
      id: 4,
      title: "Blog Platform",
      category: "Content Management",
      tools: "Next.js, GraphQL, TailwindCSS",
      image: "/images/blog-platform.webp",
    },
    {
      id: 5,
      title: "Chat Application",
      category: "Real-Time Communication",
      tools: "Socket.io, Node.js, MongoDB",
      image: "/images/chat-app.webp",
    },
    {
      id: 6,
      title: "Fitness Tracker",
      category: "Health & Fitness",
      tools: "React, TypeScript, Chart.js",
      image: "/images/fitness-tracker.webp",
    },
  ];

  useEffect(() => {
    if (!workFlexRef.current || !containerRef.current) return;

    const calculateTranslateX = () => {
      const workFlex = workFlexRef.current;
      const container = containerRef.current;

      if (!workFlex || !container) return 0;

      const scrollableDistance = workFlex.scrollWidth - container.clientWidth;
      return Math.min(scrollableDistance, 6000);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calculateTranslateX()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        id: "work",
      },
    });

    tl.to(workFlexRef.current, {
      x: () => -calculateTranslateX(),
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container" ref={containerRef}>
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={workFlexRef}>
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{project.id}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;