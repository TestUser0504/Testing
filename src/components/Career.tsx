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
                <h5>ConnectWise</h5>
              </div>
              <h5>June 2025 - Present</h5>
            </div>
            <p>
              <div>
                <span className="bullet-point">•</span> Isolated a key component
                by creating a standalone pod, removed cross-dependencies, and
                revamped its UI to match updated UX specs.
              </div>
              <div>
                <span className="bullet-point">•</span>  Wrote reliable test cases with 90%+ accuracy and coverage,
                ensuring robust validation across all critical files.
              </div>
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SDE Intern</h4>
                <h5>Vector Consulting Group</h5>
              </div>
              <h5>Jan 2025 - May 2025</h5>
            </div>
            <p>
              <div>
                <span className="bullet-point">•</span> Refactored 8+ components
                into modular React units, cutting code duplication by 40% and
                boosting maintainability.
              </div>
              <div>
                <span className="bullet-point">•</span> Built key features like
                date filters, multi-tasking, and scheduling tools, improving
                planning flexibility by 30%. Used Context API across 5+
                components to streamline state handling and reduce UI bugs by
                25%.
              </div>
            </p>
          </div>
          {/* <div className="career-info-box">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Career;
