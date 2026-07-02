import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';

const LINKS = [
  ['about', 'about'], ['experience', 'experience'], ['projects', 'projects'],
  ['skills', 'skills'], ['code', 'code'], ['awards', 'awards'], ['github', 'github'],
];

export default function Navbar({ active, scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="brand">BK<b>.</b>sys</a>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href={profile.resumeFile} className="nav-resume" target="_blank" rel="noopener" onClick={() => setOpen(false)}>📄 resume</a>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>contact</a>
        </div>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
