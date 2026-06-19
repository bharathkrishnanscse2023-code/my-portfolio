import { useState, useRef, useEffect } from 'react';
import { projects, projectFilters } from '../data/projects.js';
import ProjectModal from './ProjectModal.jsx';

export default function Projects({ onInteract }) {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const gridRef = useRef(null);

  const filtered = projects.filter((p) => filter === 'all' || p.cat.includes(filter));
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const pick = (key) => { setFilter(key); setVisibleCount(6); onInteract?.(3, 'filter:' + key); };
  const view = (p) => { setOpen(p); onInteract?.(6, 'project:' + p.id); };
  const loadMore = () => setVisibleCount((c) => c + 6);

  // Animate cards on filter change
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => setAnimKey((k) => k + 1), [filter]);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="eyebrow"><span className="idx">03</span> projects</div>
        <h2 className="title">Systems I've built.</h2>
        <p className="section-lead">
          {projects.length} projects across {projectFilters.length - 1} domains.
          Filter by domain. Tap any card for the full breakdown.
        </p>
        <div className="proj-filters">
          {projectFilters.map((f) => (
            <button key={f.key} className={`filter${filter === f.key ? ' active' : ''}`} onClick={() => pick(f.key)}>
              {f.label}
              {f.key !== 'all' && <span className="filter-count">{projects.filter(p => p.cat.includes(f.key)).length}</span>}
            </button>
          ))}
        </div>
        <div className="proj-grid" ref={gridRef} key={animKey}>
          {visible.map((p, i) => (
            <button
              className="proj panel"
              key={p.id}
              onClick={() => view(p)}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="proj-top">
                <div className="proj-icon">{p.icon}</div>
                <span className="proj-acc">{p.acc}</span>
              </div>
              <h3>{p.name}</h3>
              <div className="pdate">{p.date}</div>
              <p>{p.desc}</p>
              <div className="proj-tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              <span className="proj-more">read more →</span>
            </button>
          ))}
        </div>
        {hasMore && (
          <div className="proj-load-more">
            <button className="btn btn-ghost" onClick={loadMore}>
              ▸ Show more projects ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
