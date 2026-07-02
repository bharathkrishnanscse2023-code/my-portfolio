import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const ref = useRef(null);
  
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, raf;
    let columns = [];
    const fontSize = 14;

    const size = () => {
      w = cv.width = innerWidth;
      h = cv.height = innerHeight;
      const cols = Math.floor(w / fontSize) + 1;
      columns = [];
      for (let i = 0; i < cols; i++) {
        columns[i] = 1;
      }
    };

    size();
    window.addEventListener('resize', size);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 20, 0.05)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#2fe3d8'; // Cyan text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize, columns[i] * fontSize);

        if (columns[i] * fontSize > h && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }

      if (!reduced) raf = requestAnimationFrame(() => setTimeout(draw, 50));
    };

    draw();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  return <canvas id="neural" ref={ref} style={{ opacity: 0.15 }} />;
}
