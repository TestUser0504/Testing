import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; // Import the redirection icon

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const workFlexRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Threads",
      category: "Social Media App",
      tools: "Next.js, Tailwind CSS",
      image: "/images/threads.png",
      link: "https://threads-omega.vercel.app/",
      outcome: "The app enabled robust community interaction and management, providing users with a comprehensive social media platform.",
      learning: "I learned about the importance of dynamic user experiences in social media applications.",
      contribution: "I developed a full‑stack social media app with advanced features, enhancing community engagement.",
      date: "June 2024 – Jul 2024",
    },
    {
      id: 2,
      title: "ResumeCraft",
      category: "AI Resume Builder App",
      tools: "React.js, Tailwind CSS",
      image: "/images/resumeai.png",
      link: "https://resumecraftai.vercel.app/",
      outcome: "The app provided users with an intuitive and efficient way to create professional resumes, improving their job application process.",
      learning: "I learned about performance optimization and the integration of AI features to enhance functionality.",
      contribution: "I led the project from conception to deployment, ensuring high performance and contributing an innovative tool to the job market.",
      date: "Mar 2024 – May 2024",
    },
    {
      id: 3,
      title: "Data Structure Learning Hub",
      category: "Educational App",
      tools: "HTML, CSS, JavaScript",
      image: "/images/data.png",
      link: "https://sahasop.github.io/Data-Structures-Learning-Hub-main/",
      outcome: "The website successfully provided an educational experience for students and educators, making complex data structure concepts easier to understand and visualize.",
      learning: "I deepened my understanding of data structures and algorithm visualization, learning how to effectively convey complex concepts.",
      contribution: "I developed a valuable educational tool that enhanced learning experiences, demonstrating my ability to combine technical knowledge with educational needs.",
      date: "Oct 2023 – Dec 2024",
    },
    // {
    //   id: 4,
    //   title: "Blog Platform",
    //   category: "Content Management",
    //   tools: "Next.js, GraphQL, TailwindCSS",
    //   image: "/images/blog-platform.webp",
    //   link: "https://blogplatform.example.com",
    // },
    // {
    //   id: 5,
    //   title: "Chat Application",
    //   category: "Real-Time Communication",
    //   tools: "Socket.io, Node.js, MongoDB",
    //   image: "/images/chat-app.webp",
    //   link: "https://chatapp.example.com",
    // },
    // {
    //   id: 6,
    //   title: "Fitness Tracker",
    //   category: "Health & Fitness",
    //   tools: "React, TypeScript, Chart.js",
    //   image: "/images/fitness-tracker.webp",
    //   link: "https://fitnesstracker.example.com",
    // },
  ];

  useEffect(() => {
    if (!workFlexRef.current || !containerRef.current) return;

    const calculateTranslateX = () => {
      const workFlex = workFlexRef.current;
      const container = containerRef.current;

      if (!workFlex || !container) return 0;

      const scrollableDistance = workFlex.scrollWidth - container.clientWidth;
      return Math.min(scrollableDistance, 2000);
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
          My Work
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="work-image-link"
              >
                <WorkImage image={project.image} alt={project.title} />
                <FaExternalLinkAlt className="redirect-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;