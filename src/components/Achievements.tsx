import { useEffect } from "react";
import {
  ExternalLink,
  Code,
  Award,
  Zap,
  BarChart2,
  Github,
} from "lucide-react";
import "./styles/Achievements.css"; // Import your CSS file for styling

const Achievements = () => {
  const platforms = [
    {
      name: "LeetCode",
      icon: <Code className="text-yellow-400" />,
      rating: 1758,
      maxRating: 1768,
      solved: 100,
      color: "yellow-gradient",
      profile: "https://leetcode.com/Sahas_Prajapati/",
    },
    {
      name: "CodeChef",
      icon: <Award className="text-red-400" />,
      rating: 1629,
      maxRating: 1629,
      solved: 74,
      color: "red-gradient",
      profile: "https://www.codechef.com/users/sahasop",
    },
    {
      name: "GeeksForGeeks",
      icon: <Zap className="text-green-400" />,
      rating: 1576,
      maxRating: 1580,
      solved: 148,
      color: "green-gradient",
      profile: "https://auth.geeksforgeeks.org/user/sahasop",
    },
    {
      name: "CodeForces",
      icon: <BarChart2 className="text-blue-400" />,
      rating: 1293,
      maxRating: 1312,
      solved: 74,
      color: "blue-gradient",
      profile: "https://codeforces.com/profile/sahasop",
    },
  ];

  const totalQuestions = platforms.reduce(
    (sum, platform) => sum + platform.solved,
    0
  );

  useEffect(() => {
    const progressBars = document.querySelectorAll(".progress-fill");
    setTimeout(() => {
      progressBars.forEach((bar) => {
        const target = bar.getAttribute("data-target");
        if (target) {
          (bar as HTMLElement).style.width = target;
        }
      });
    }, 300);
  }, []);

  return (
    <div className="achievements-container">
      <div className="content-wrapper">
        <h2 className="section-title">
          <span className="section-title-gradient">Coding Platforms</span>
        </h2>
        <div className="header">
          <a
            href="https://github.com/SahasOP"
            target="_blank"
            // rel="noopener noreferrer"
            className="github-button"
          >
            <Github size={20} />
            <span>GitHub Profile</span>
          </a>
        </div>

        <div className="stats-grid">
          <div className="stats-card">
            <div className="background-blob"></div>

            <div className="stats-header">
              <div className="icon-container">
                <Code size={24} className="purple-icon" />
              </div>
              <div>
                <h3 className="stats-label">Questions</h3>
                <p className="stats-value">{totalQuestions}</p>
              </div>
            </div>

            <div>
              <p className="stats-description">
                Total number of problems solved across all platforms
              </p>
            </div>
          </div>

          <div className="stats-card">
            <div className="background-blob"></div>

            <div className="stats-header">
              <div className="icon-container">
                <Award size={24} className="purple-icon" />
              </div>
              <div>
                <h3 className="stats-label">Active Days</h3>
                <p className="stats-value">480</p>
              </div>
            </div>

            <div>
              <p className="stats-description">
                Consistent problem-solving across platforms
              </p>
            </div>
          </div>
        </div>

        <div className="platforms-container">
          {platforms.map((platform, index) => (
            <div key={platform.name} className="platform-card-wrapper">
              <a
                href={platform.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-card"
              >
                <div className="platform-background"></div>

                <div className="platform-header">
                  <div className="platform-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="platform-icon-box">{platform.icon}</div>
                </div>

                <h3 className="platform-name">{platform.name}</h3>

                <div className="platform-stats">
                  <div className="stat-row">
                    <div className="stat-header">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">
                        {platform.rating}{" "}
                        <span className="stat-max">/ {platform.maxRating}</span>
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${platform.color}`}
                        data-target={`${(platform.rating / 2000) * 100}%`}
                      />
                    </div>
                  </div>

                  <div className="stat-row">
                    <div className="stat-header">
                      <span className="stat-label">Problems Solved</span>
                      <span className="stat-value">{platform.solved}</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${platform.color}`}
                        data-target={`${(platform.solved / 150) * 100}%`}
                      />
                    </div>
                  </div>
                </div>

                <div className="external-link">
                  <div className="link-icon-container">
                    <ExternalLink size={16} />
                  </div>
                </div>

                <div className="platform-initial">
                  {platform.name.charAt(0)}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
