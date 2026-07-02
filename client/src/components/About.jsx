import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';

export default function About() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const tick = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setTime(ist.toTimeString().slice(0, 5));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow"><span className="idx">01</span> profile</div>
        <h2 className="title">Engineering intelligence that<br />holds up in the real world.</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>I'm <strong>Bharath Krishnan S</strong>, a B.E. Computer Science &amp; Engineering student (2023–2027) at the Chennai Institute of Technology and Applied Research, holding a <strong>9.05 CGPA</strong>.</p>
            <p>My work sits where machine learning meets deployment. I build models that don't just score well on a notebook — they run as <strong>real pipelines</strong>: an LSTM flood-warning system pulling live weather feeds, a FinBERT engine reading 10,000+ news items, a vision model matching lost items across thousands of images, and a railway safety AI detecting threats in real-time.</p>
            <p>That product instinct is backed by <strong>competitive-programming rigor</strong> — 700+ solved problems across LeetCode, CodeChef and Codeforces — and proven under pressure as a <strong>national hackathon finalist</strong> and IIT Varanasi ML championship winner.</p>
            <p>I've shipped <strong>25+ GitHub repositories</strong> spanning ML, NLP, Computer Vision, FinTech, and Space Tech — and I'm drawn to the long horizon of quantum computing and edge AI.</p>
            <div className="about-interests">
              <h4>// interests</h4>
              <div className="interest-tags">
                {profile.interests.map((i) => (
                  <span className="interest-tag" key={i}>{i}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="panel about-card">
              <h4>// quick_read</h4>
              <div className="kv"><span>status</span><span className="live">● open to work</span></div>
              <div className="kv"><span>focus</span><span>AI / ML · Data Science</span></div>
              <div className="kv"><span>degree</span><span>B.E. CSE '27</span></div>
              <div className="kv"><span>cgpa</span><span>9.05 / 10</span></div>
              <div className="kv"><span>base</span><span>Chennai, India</span></div>
              <div className="kv"><span>local_time</span><span className="live">{time} IST</span></div>
              <div className="kv"><span>github_repos</span><span className="live">25+</span></div>
              <div className="kv"><span>problems</span><span>700+ solved</span></div>
            </div>
            <div className="about-resumes">
              <a href={profile.resumeAIML} className="btn btn-resume about-resume" target="_blank" rel="noopener" download>
                📄 AI/ML Resume (PDF)
              </a>
              <a href={profile.resumeFSD} className="btn btn-resume about-resume" target="_blank" rel="noopener" download>
                📄 Full-Stack Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
