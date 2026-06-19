import { useEffect } from 'react';

export default function ConsoleCommands({ onCommand }) {
  useEffect(() => {
    let buf = '';
    const cmds = {
      help: () => alert('Commands: help · whoami · skills · hire · matrix'),
      whoami: () => alert('Bharath Krishnan S — AI/ML engineer. 9.05 CGPA. 700+ problems. Building real systems.'),
      skills: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
      hire: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      matrix: () => document.body.animate([{ filter: 'hue-rotate(0)' }, { filter: 'hue-rotate(360deg)' }], { duration: 2000 }),
    };
    const onKey = (e) => {
      if (e.target.matches('input,textarea,select')) return;
      if (e.key.length === 1) buf = (buf + e.key).slice(-12);
      for (const k in cmds) if (buf.endsWith(k)) { cmds[k](); buf = ''; onCommand?.(5, 'cmd:' + k); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onCommand]);
  return null;
}
