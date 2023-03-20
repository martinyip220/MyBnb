import React from "react";
import github from "../../assets/github-icon.png";
import linkedin from "../../assets/linkedin-icon.png";
import "./index.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-ctn">
        <div className="tech-stack">
          Tech Stack: Javascript, Express.Js, Node.js, ReactJS, Redux, HTML5,
          CSS3, PostgresSQL
        </div>
        <div className="about-info">
          <div>Developed by Martin Yip</div>
          <div className="about-links">
            <a
              href="https://github.com/martinyip220"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} alt="github" className="about-icons"></img>
            </a>
            <a
              href="https://www.linkedin.com/in/martin-yip-889a9b261/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} alt="linkedin" className="about-icons"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
