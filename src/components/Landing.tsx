import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2 className="animate-fade-in">Hello! I'm</h2>
          <h1 className="animate-slide-up">
            Sahas<br />
            <span>Prajapati</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3 className="animate-fade-in-delay">A Full Stack</h3>
          <h2 className="landing-info-h2 animate-slide-up-delay">
            <div className="landing-h2-2">Developer</div>
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;