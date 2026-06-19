import { useEffect, useState } from 'react';

export default function Hud() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setTime(ist.toTimeString().slice(0, 8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hud">
      <div className="hud-left"><span className="dot" />SYSTEM&nbsp;ONLINE&nbsp;·&nbsp;BK_OS</div>
      <div className="hud-right">
        <span>LOC: Chennai, IN</span>
        <span>IST {time}</span>
      </div>
    </div>
  );
}
