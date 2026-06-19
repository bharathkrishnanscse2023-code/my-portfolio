import { useEffect, useState } from 'react';

export function useScrollSpy(ids, onSeen) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setActive(e.target.id); onSeen?.(e.target.id); }
      }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids, onSeen]);
  return active;
}
