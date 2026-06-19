import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-box panel">
        <div className="panel-head">
          <span className="dots"><i /><i /><i /></span>
          <button className="modal-close" onClick={onClose}>[ esc ] close</button>
        </div>
        <div className="modal-body">
          <div className="modal-hero-row">
            <div className="modal-icon-big">{project.icon}</div>
            <div>
              <h3>{project.name}</h3>
              <div className="mdate">{project.date} · {project.tags.join(' · ')}</div>
            </div>
          </div>
          {project.acc && <div className="modal-metric"><span>Metric:</span> {project.acc}</div>}
          <p>{project.full}</p>
          <h4 className="modal-subhead">// key_features</h4>
          <ul>{project.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <div className="modal-tags">
            {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
          {project.github && (
            <a href={project.github} className="btn btn-primary modal-gh" target="_blank" rel="noopener">
              ↗ View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
