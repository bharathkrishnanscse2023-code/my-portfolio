import { experience, education } from '../data/experience.js';

function TimelineItem({ e, isEdu }) {
  return (
    <div className={`tl-item ${isEdu ? 'tl-edu' : ''}`}>
      <div className="tl-badge">{isEdu ? '🎓' : '💼'}</div>
      <div className="tl-when">{e.when}</div>
      <div className="tl-role">{e.role}</div>
      <div className="tl-co">{e.company}</div>
      <ul>{e.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="eyebrow"><span className="idx">02</span> experience</div>
        <h2 className="title">Where I've shipped & learned.</h2>
        <div className="exp-layout">
          <div className="timeline">
            <h3 className="tl-heading">💼 Professional Experience</h3>
            {experience.map((e, i) => (
              <TimelineItem key={i} e={e} isEdu={false} />
            ))}
          </div>
          <div className="timeline">
            <h3 className="tl-heading">🎓 Education</h3>
            {education.map((e, i) => (
              <TimelineItem key={i} e={e} isEdu={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
