import { useEffect, useRef, useState } from 'react';
import { bars, chips, domainExpertise } from '../data/skills.js';
import SkillRadar from './SkillRadar.jsx';

export default function Skills() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <div className="wrap">
        <div className="eyebrow"><span className="idx">04</span> capabilities</div>
        <h2 className="title">The stack.</h2>

        {/* Domain Expertise */}
        <div className="domain-grid">
          {domainExpertise.map((d) => (
            <div className="domain-card panel" key={d.domain}>
              <div className="domain-icon">{d.icon}</div>
              <div className="domain-name">{d.domain}</div>
              <div className="domain-bar">
                <i style={{ width: start ? d.level + '%' : 0 }} />
              </div>
              <div className="domain-meta">
                <span>{d.level}%</span>
                <span>{d.projects} projects</span>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-grid">
          <div>
            <div className="skill-block">
              <h4>// core_proficiency</h4>
              {bars.map((b) => (
                <div className="bar-row" key={b.n}>
                  <div className="bl"><b>{b.n}</b><span>{b.v}%</span></div>
                  <div className="bar"><i style={{ width: start ? b.v + '%' : 0 }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SkillRadar start={start} />
            <div className="skill-block" style={{ marginTop: 30 }}>
              <h4>// tooling &amp; libraries</h4>
              <div className="chip-cloud">{chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
