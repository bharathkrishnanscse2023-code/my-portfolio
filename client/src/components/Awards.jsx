import { awards, certs } from '../data/certifications.js';
import { useState } from 'react';

export default function Awards() {
  const [showAll, setShowAll] = useState(false);
  const visibleAwards = showAll ? awards : awards.slice(0, 6);

  return (
    <section id="awards">
      <div className="wrap">
        <div className="eyebrow"><span className="idx">06</span> recognition</div>
        <h2 className="title">Awards &amp; certifications.</h2>
        <p className="section-lead">{awards.length} achievements and {certs.length} professional certifications.</p>

        <div className="ach-grid">
          {visibleAwards.map((a, i) => (
            <div className="panel ach" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="ai">{a.icon}</div>
              <div>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </div>
            </div>
          ))}
        </div>

        {awards.length > 6 && (
          <div className="ach-toggle">
            <button className="btn btn-ghost" onClick={() => setShowAll(!showAll)}>
              {showAll ? '▴ Show less' : `▸ Show all ${awards.length} achievements`}
            </button>
          </div>
        )}

        <h3 className="cert-title">// professional_certifications</h3>
        <div className="cert-grid">
          {certs.map(([a, b], i) => (
            <span className="cert" key={i}>
              <b>{a}</b> · {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
