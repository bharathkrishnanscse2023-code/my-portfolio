import { useEffect, useRef, useState } from 'react';

export function useCountUp(to, { dec = 0, duration = 1100, start = false } = {}) {
  const [val, setVal] = useState(0);
  const raf = useRef();
  useEffect(() => {
    if (!start) return;
    let t0;
    const step = (t) => {
      t0 = t0 || t;
      const p = Math.min((t - t0) / duration, 1);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration, start]);
  return val.toFixed(dec);
}
