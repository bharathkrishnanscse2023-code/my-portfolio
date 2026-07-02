import { useState, useEffect } from 'react';
import { profile } from '../data/profile.js';
import { useTyped } from '../hooks/useTyped.js';
import portrait from '../assets/bharath.jpg';
import LiveMonitorGraph from './LiveMonitorGraph.jsx';

export default function Hero({ booted }) {
  const typed = useTyped(profile.roles);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(pts);
  }, []);

  return (
    <section id="hero">
      <div className="hero-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle"
            style={{
              left: p.x + '%',
              top: p.y + '%',
              width: p.size + 'px',
              height: p.size + 'px',
              animationDuration: p.duration + 's',
              animationDelay: p.delay + 's',
            }}
          />
        ))}
      </div>
      <div className="wrap">
        <div className="hero-grid hero">
          <div className="hero-left">
            <div className="hero-status"><span className="ping" />Available for internships &amp; collaborations</div>
            <h1>Bharath<br />Krishnan <span className="glow">S</span></h1>
            <div className="role">{booted ? typed : profile.roles[0]}<span className="cursor" /></div>
            <p className="bio">{profile.bio}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">▶ View projects</a>
              <a href={profile.resumeAIML} className="btn btn-resume" target="_blank" rel="noopener" download>📄 AI/ML Resume</a>
              <a href={profile.resumeFSD} className="btn btn-resume" target="_blank" rel="noopener" download>📄 Full-Stack Resume</a>
              <a href="#contact" className="btn btn-ghost">Get in touch</a>
            </div>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noopener">↗ GitHub</a>
              <a href={profile.website} target="_blank" rel="noopener">↗ Website</a>
              <a href={profile.linkedin} target="_blank" rel="noopener">↗ LinkedIn</a>
            </div>
            <LiveMonitorGraph />
          </div>
          <div className="portrait-wrap">
            <div className="portrait">
              <img src={portrait} alt="Bharath Krishnan S" />
              <div className="scan" />
              <div className="portrait-glow" />
            </div>
            <div className="portrait-frame" />
            <div className="portrait-tag">◉ id://bharath_krishnan · verified</div>
            <div className="portrait-orbit">
              <span className="orbit-dot" style={{ animationDelay: '0s' }}>🧠</span>
              <span className="orbit-dot" style={{ animationDelay: '-2s' }}>⚡</span>
              <span className="orbit-dot" style={{ animationDelay: '-4s' }}>🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
