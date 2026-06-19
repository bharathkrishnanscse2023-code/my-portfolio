import { useEffect, useRef, useState } from 'react';

export function useTyped(words, { type = 90, del = 45, hold = 1400 } = {}) {
  const [text, setText] = useState('');
  const state = useRef({ w: 0, c: 0, deleting: false });

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setText(words[0]); return; }
    let timer;
    const tick = () => {
      const s = state.current;
      const word = words[s.w];
      setText(s.deleting ? word.slice(0, s.c--) : word.slice(0, s.c++));
      let delay = s.deleting ? del : type;
      if (!s.deleting && s.c > word.length) { s.deleting = true; delay = hold; }
      else if (s.deleting && s.c < 0) { s.deleting = false; s.w = (s.w + 1) % words.length; s.c = 0; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, type);
    return () => clearTimeout(timer);
  }, [words, type, del, hold]);

  return text;
}
