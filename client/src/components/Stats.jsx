import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile.js';
import { useCountUp } from '../hooks/useCountUp.js';

function Stat({ to, dec = 0, suffix = '', label, highlight, start }) {
  const val = useCountUp(to, { dec, start });
  return (
    <div className="stat">
      <div className="num">{highlight ? <b>{val}{suffix}</b> : <>{val}{suffix}</>}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="wrap">
      <div className="stat-strip" ref={ref}>
        {profile.stats.map((s, i) => <Stat key={i} {...s} start={start} />)}
      </div>
    </div>
  );
}
