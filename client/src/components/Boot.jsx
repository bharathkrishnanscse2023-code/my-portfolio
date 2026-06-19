import { useEffect, useRef, useState } from 'react';

const LINES = [
  "> loading neural_core ............ <b>ok</b>",
  "> mounting projects [17] ......... <b>ok</b>",
  "> indexing 700+ solved problems .. <b>ok</b>",
  "> scanning 25+ repositories ...... <b>ok</b>",
  "> verifying credentials .......... <span class='ok'>9.05 CGPA</span>",
  "> loading certifications [14] .... <b>ok</b>",
  "> establishing secure channel .... <b>ok</b>",
  "> rendering interface ............ <b>ready</b>",
];

export default function Boot({ onDone }) {
  const [pct, setPct] = useState(0);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const i = useRef(0);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => { setDone(true); setTimeout(onDone, 650); };
    if (reduced) { setPct(100); setLog(['> interface ready']); setTimeout(finish, 200); return; }
    let timer;
    const step = () => {
      if (i.current < LINES.length) {
        setLog((l) => [...l, LINES[i.current]]);
        setPct(Math.round(((i.current + 1) / LINES.length) * 100));
        i.current += 1;
        timer = setTimeout(step, 320);
      } else {
        timer = setTimeout(finish, 450);
      }
    };
    timer = setTimeout(step, 250);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`boot${done ? ' done' : ''}`}>
      <div className="boot-box">
        <div className="boot-logo">BK<span>.</span>sys</div>
        <div className="boot-bar-label">
          <span>INITIALIZING&nbsp;PORTFOLIO&nbsp;//&nbsp;BK_OS&nbsp;v3.0</span><span>{pct}%</span>
        </div>
        <div className="boot-bar"><i style={{ width: pct + '%' }} /></div>
        <div className="boot-log">
          {log.map((l, idx) => <span key={idx} dangerouslySetInnerHTML={{ __html: l }} />)}
        </div>
      </div>
    </div>
  );
}
