import { useEffect, useRef, useState } from 'react';

export default function LiveMonitorGraph() {
  const canvasRef = useRef(null);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const width = cv.width = 300;
    const height = cv.height = 100;
    
    // Initialize data arrays
    const dataPoints = 60;
    let cpuData = Array(dataPoints).fill(20);
    let ramData = Array(dataPoints).fill(40);
    let raf;

    const drawGraph = () => {
      // Background clear
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(47, 227, 216, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i = 0; i < height; i += 20) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
      }
      for(let i = 0; i < width; i += 30) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
      }
      ctx.stroke();

      // Update data
      const nextCpu = Math.max(10, Math.min(90, cpuData[cpuData.length - 1] + (Math.random() - 0.5) * 15));
      const nextRam = Math.max(30, Math.min(80, ramData[ramData.length - 1] + (Math.random() - 0.5) * 5));
      
      cpuData.push(nextCpu);
      cpuData.shift();
      ramData.push(nextRam);
      ramData.shift();

      setCpuUsage(Math.round(nextCpu));
      setRamUsage(Math.round(nextRam));

      const drawLine = (data, color, fillOpacity) => {
        ctx.beginPath();
        ctx.moveTo(0, height - (data[0] / 100) * height);
        for (let i = 1; i < data.length; i++) {
          const x = (i / (dataPoints - 1)) * width;
          const y = height - (data[i] / 100) * height;
          ctx.lineTo(x, y);
        }
        
        // Fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = color.replace('1)', `${fillOpacity})`);
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.moveTo(0, height - (data[0] / 100) * height);
        for (let i = 1; i < data.length; i++) {
          const x = (i / (dataPoints - 1)) * width;
          const y = height - (data[i] / 100) * height;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      // Draw RAM (amber)
      drawLine(ramData, 'rgba(245, 166, 35, 1)', 0.1);
      // Draw CPU (cyan)
      drawLine(cpuData, 'rgba(47, 227, 216, 1)', 0.15);

      raf = requestAnimationFrame(() => setTimeout(drawGraph, 200));
    };

    drawGraph();

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{
      background: 'rgba(13, 20, 36, 0.7)',
      border: '1px solid var(--cyan-dim)',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
        <span style={{ color: 'var(--cyan)' }}>◉ SYS_MONITOR</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--cyan)' }}>CPU: {cpuUsage}%</span>
          <span style={{ color: 'var(--amber)' }}>MEM: {ramUsage}%</span>
        </div>
      </div>
      <div style={{ border: '1px solid rgba(47, 227, 216, 0.2)', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '80px', display: 'block' }} />
      </div>
    </div>
  );
}
