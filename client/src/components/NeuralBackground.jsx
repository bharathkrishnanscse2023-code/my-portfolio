import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, nodes = [], mouse = { x: -999, y: -999 }, raf;
    const size = () => {
      w = cv.width = innerWidth; h = cv.height = innerHeight;
      const n = Math.min(70, Math.floor((w * h) / 22000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      }));
    };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut = () => { mouse.x = -999; mouse.y = -999; };
    size();
    addEventListener('resize', size); addEventListener('mousemove', onMove); addEventListener('mouseout', onOut);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < 140) { n.x -= (dx / d) * 0.6; n.y -= (dy / d) * 0.6; }
      }
      for (let a = 0; a < nodes.length; a++)
        for (let b = a + 1; b < nodes.length; b++) {
          const p = nodes[a], q = nodes[b], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(47,227,216,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 150;
        ctx.fillStyle = near ? 'rgba(245,166,35,.9)' : 'rgba(47,227,216,.6)';
        ctx.beginPath(); ctx.arc(n.x, n.y, near ? 2.6 : 1.6, 0, 7); ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('mousemove', onMove); removeEventListener('mouseout', onOut); };
  }, []);
  return <canvas id="neural" ref={ref} />;
}
