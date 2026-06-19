import { useState } from 'react';

export default function BehaviourConsole({ snap, total }) {
  const [min, setMin] = useState(false);
  return (
    <div className={`console${min ? ' min' : ''}`}>
      <div className="console-bar" onClick={() => setMin((m) => !m)}>
        <div className="ct"><span className="dot" />visitor_session.log</div>
        <div className="tog">{min ? '▴' : '▾'}</div>
      </div>
      <div className="console-body">
        <div className="cline"><span>session_id</span><span>{snap.session}</span></div>
        <div className="cline"><span>time_on_page</span><span>{snap.timeOnPage}</span></div>
        <div className="cline"><span>scroll_depth</span><span>{snap.scrollDepth}</span></div>
        <div className="cline"><span>sections_seen</span><span>{snap.sectionsSeen} / {total}</span></div>
        <div className="cline"><span>visits</span><span>{snap.visits}</span></div>
        <div className="cline"><span>interest_score</span><span>{snap.interestScore}</span></div>
        <div className="hint">tip: type <b>help</b> anywhere for console commands.</div>
      </div>
    </div>
  );
}
