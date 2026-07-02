import { useState, useEffect } from 'react';
import { profile } from '../data/profile.js';
import CyberBackground from './CyberBackground.jsx';

export default function LandingPage({ onLaunch }) {
  const [clicked, setClicked] = useState(false);

  const handleLaunch = () => {
    setClicked(true);
    setTimeout(onLaunch, 800);
  };

  return (
    <div className={`landing-page ${clicked ? 'fade-out' : ''}`}>
      <CyberBackground />
      <div className="grid-overlay" />
      <div className="landing-content">
        <div className="landing-badge">CLASSIFIED ACCESS</div>
        <h1 className="landing-title">
          <span>{profile.name}</span>
        </h1>
        <p className="landing-subtitle">ENTERPRISE AI RESEARCH & ENGINEERING</p>
        
        <button className="btn-launch" onClick={handleLaunch}>
          <span className="launch-icon">⏻</span>
          INITIALIZE SYSTEM
        </button>
      </div>
    </div>
  );
}
