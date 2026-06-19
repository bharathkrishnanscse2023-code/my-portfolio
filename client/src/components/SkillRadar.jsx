import { useEffect, useRef } from 'react';
import { radarAxes } from '../data/skills.js';

export default function SkillRadar({ start }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!start) return;
    const cv = ref.current;
    const dpr = window.devicePixelRatio || 1;
    const SIZE = 380;
    cv.width = SIZE * dpr;
    cv.height = SIZE * dpr;
    cv.style.width = SIZE + 'px';
    cv.style.height = SIZE + 'px';
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2, cy = SIZE / 2, R = 140, N = radarAxes.length;

    // Draw concentric polygon rings
    for (let r = 1; r <= 5; r++) {
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = (Math.PI * 2 * i) / N - Math.PI / 2, rr = (R * r) / 5;
        const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = r === 5 ? 'rgba(47,227,216,.15)' : 'rgba(28,41,66,.7)';
      ctx.lineWidth = r === 5 ? 1.5 : 0.8;
      ctx.stroke();
    }

    // Draw axis lines and labels
    for (let i = 0; i < N; i++) {
      const a = (Math.PI * 2 * i) / N - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.strokeStyle = 'rgba(28,41,66,.5)'; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.fillStyle = '#9eabc2'; ctx.font = '11px "JetBrains Mono"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const lx = cx + Math.cos(a) * (R + 24);
      const ly = cy + Math.sin(a) * (R + 24);
      ctx.fillText(radarAxes[i][0], lx, ly);
    }

    // Draw data polygon with glow
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const idx = i % N, a = (Math.PI * 2 * idx) / N - Math.PI / 2, rr = R * radarAxes[idx][1];
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    // Gradient fill
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(47,227,216,.22)');
    grad.addColorStop(1, 'rgba(47,227,216,.04)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#2fe3d8'; ctx.lineWidth = 2.5;
    ctx.shadowColor = '#2fe3d8'; ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw data points with glow
    for (let i = 0; i < N; i++) {
      const a = (Math.PI * 2 * i) / N - Math.PI / 2, rr = R * radarAxes[i][1];
      const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
      // Outer glow
      ctx.beginPath(); ctx.arc(px, py, 6, 0, 7);
      ctx.fillStyle = 'rgba(47,227,216,.2)'; ctx.fill();
      // Inner dot
      ctx.beginPath(); ctx.arc(px, py, 3.5, 0, 7);
      ctx.fillStyle = '#2fe3d8'; ctx.fill();
      // White center
      ctx.beginPath(); ctx.arc(px, py, 1.5, 0, 7);
      ctx.fillStyle = '#fff'; ctx.fill();
    }
  }, [start]);
  return <canvas id="radar" ref={ref} width="380" height="380" />;
}
