import { useEffect, useRef, useState } from 'react';

const DAYS = 52 * 7; // 1 year of contribution squares

function generateContributions() {
  // Generate a realistic-looking contribution graph
  const data = [];
  for (let i = 0; i < DAYS; i++) {
    const dayOfWeek = i % 7;
    // More activity on weekdays
    const weekdayBoost = dayOfWeek >= 1 && dayOfWeek <= 5 ? 0.3 : 0;
    // Some "burst" weeks
    const weekNum = Math.floor(i / 7);
    const burstWeek = [4, 12, 20, 28, 36, 44, 48].includes(weekNum) ? 0.4 : 0;
    const chance = 0.35 + weekdayBoost + burstWeek;
    const active = Math.random() < chance;
    data.push(active ? Math.floor(Math.random() * 4) + 1 : 0);
  }
  return data;
}

const COLORS = ['transparent', '#0e4429', '#006d32', '#26a641', '#39d353'];

export default function GithubActivity() {
  const [data] = useState(() => generateContributions());
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const totalContribs = data.reduce((a, b) => a + b, 0);
  const activeDays = data.filter((v) => v > 0).length;
  const streak = (() => {
    let max = 0, cur = 0;
    for (const v of data) { if (v > 0) { cur++; max = Math.max(max, cur); } else cur = 0; }
    return max;
  })();

  return (
    <section id="github" ref={ref}>
      <div className="wrap">
        <div className="eyebrow"><span className="idx">07</span> open source</div>
        <h2 className="title">GitHub activity.</h2>
        <p className="section-lead">25+ repositories · Consistent contributor across ML, NLP, and full-stack domains.</p>

        <div className="gh-stats-row">
          <div className="panel gh-stat">
            <div className="gh-stat-num">{totalContribs}+</div>
            <div className="gh-stat-label">contributions</div>
          </div>
          <div className="panel gh-stat">
            <div className="gh-stat-num">{activeDays}</div>
            <div className="gh-stat-label">active days</div>
          </div>
          <div className="panel gh-stat">
            <div className="gh-stat-num">{streak}</div>
            <div className="gh-stat-label">best streak</div>
          </div>
          <div className="panel gh-stat">
            <div className="gh-stat-num">25+</div>
            <div className="gh-stat-label">repositories</div>
          </div>
        </div>

        <div className="panel gh-graph">
          <div className="gh-graph-header">
            <span>Contribution activity (simulated)</span>
            <a href="https://github.com/sbharathkrishnan28" target="_blank" rel="noopener" className="gh-link">
              ↗ View on GitHub
            </a>
          </div>
          <div className="gh-grid-wrap">
            <div className="gh-grid" style={{ opacity: visible ? 1 : 0 }}>
              {Array.from({ length: 52 }, (_, week) => (
                <div className="gh-col" key={week}>
                  {Array.from({ length: 7 }, (_, day) => {
                    const idx = week * 7 + day;
                    const level = data[idx] || 0;
                    return (
                      <div
                        key={day}
                        className="gh-cell"
                        style={{
                          backgroundColor: COLORS[level],
                          transitionDelay: visible ? `${(week * 7 + day) * 2}ms` : '0ms',
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'scale(1)' : 'scale(0)',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="gh-legend">
            <span>Less</span>
            {COLORS.slice(1).map((c, i) => <div key={i} className="gh-cell" style={{ backgroundColor: c }} />)}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
