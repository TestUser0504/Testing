import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SDE Intern</h4>
                <h5>Vector Consulting Group</h5>
              </div>
              <h3>Jan 2025</h3>
            </div>
            <p>
              <div>
                Implemented advanced UI features, animations, and improved user
                interactions. Ensured code scalability by following modular and
                reusable component architecture.
              </div>
              <div>
                Conducted performance optimizations to improve rendering
                efficiency. Collaborated with backend developers to ensure
                seamless data flow.
              </div>
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SDE Intern</h4>
                <h5>ConnectWise</h5>
              </div>
              <h3>July 2025</h3>
            </div>
            <p>
              <div>
                Currently working on developing scalable frontend solutions and
                implementing responsive design principles.
              </div>
              <div>
                Focusing on creating reusable React components and optimizing
                application performance for enterprise software.{" "}
              </div>
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open to Opportunities</h4>
                <h5>Full-time Positions</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              <div>
                Seeking opportunities to leverage my frontend development skills
                in a full-time role. Experienced with React, TypeScript, and
                modern UI/UX implementation techniques.{" "}
              </div>
              <div>
                Passionate about creating performant and scalable web
                applications with engaging user experiences.
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
