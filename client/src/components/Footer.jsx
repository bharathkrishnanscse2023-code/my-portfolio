import { profile } from '../data/profile.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-content">
          <div className="footer-left">
            <div className="fbrand">BK<b>.</b>sys</div>
            <p>Designed &amp; engineered by Bharath Krishnan S · {year}</p>
            <p className="footer-sub">built with intent, not templates</p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resumeFile} target="_blank" rel="noopener">Resume</a>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span>© {year} Bharath Krishnan S. All rights reserved.</span>
          <span className="footer-tech">React · Vite · Node.js · Express</span>
        </div>
      </div>
    </footer>
  );
}
