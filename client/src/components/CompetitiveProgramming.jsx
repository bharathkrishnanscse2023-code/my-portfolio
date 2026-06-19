import { useEffect, useRef, useState } from 'react';
import { competitive } from '../data/skills.js';
import { useCountUp } from '../hooks/useCountUp.js';

function Card({ plat, rating, solved, handle, url, start }) {
  const val = useCountUp(rating, { start });
  return (
    <div className="panel cp-card">
      <div className="cp-plat">{plat}</div>
      <div className="cp-rating">{val}</div>
      <div className="cp-rl">contest rating</div>
      <div className="cp-solved"><b>{solved}</b> problems solved</div>
      <a href={url} target="_blank" rel="noopener" className="cp-handle">{handle} ↗</a>
    </div>
  );
}

export default function CompetitiveProgramming() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="code" ref={ref}>
      <div className="wrap">
        <div className="eyebrow"><span className="idx">05</span> competitive</div>
        <h2 className="title">Tested under a clock.</h2>
        <div className="cp-grid">
          {competitive.map((c) => <Card key={c.plat} {...c} start={start} />)}
        </div>
      </div>
    </section>
  );
}
