import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../lib/api.js';

// safe storage (never throws inside sandboxed iframes)
const storage = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

const fmt = (s) => {
  const m = Math.floor(s / 60), ss = s % 60;
  return String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
};

export function useBehaviour(totalSections = 7) {
  const start = useRef(Date.now());
  const session = useMemo(() => 'SES-' + Math.random().toString(36).slice(2, 8).toUpperCase(), []);
  const seen = useRef(new Set());
  const events = useRef([]);
  const score = useRef(0);

  const [snap, setSnap] = useState({
    session, visits: 1, timeOnPage: '00:00', scrollDepth: '0%',
    sectionsSeen: 0, interestScore: 0,
  });
  const maxScroll = useRef(0);

  // visit counter (persists per browser)
  useEffect(() => {
    const visits = (+(storage.get('bk_visits') || 0)) + 1;
    storage.set('bk_visits', String(visits));
    setSnap((s) => ({ ...s, visits }));
  }, []);

  // scroll depth
  useEffect(() => {
    const onScroll = () => {
      const d = Math.round((scrollY / (document.body.scrollHeight - innerHeight)) * 100);
      if (d > maxScroll.current) maxScroll.current = Math.min(100, d);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // ticking snapshot
  useEffect(() => {
    const id = setInterval(() => {
      const secs = Math.floor((Date.now() - start.current) / 1000);
      const interest = Math.min(100, score.current + Math.floor(secs / 6) + seen.current.size * 3);
      setSnap((s) => ({
        ...s,
        timeOnPage: fmt(secs),
        scrollDepth: maxScroll.current + '%',
        sectionsSeen: seen.current.size,
        interestScore: interest,
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // flush analytics to backend on leave (best-effort)
  useEffect(() => {
    const flush = () => {
      const secs = Math.floor((Date.now() - start.current) / 1000);
      api.sendAnalytics({
        session,
        timeOnPage: fmt(secs),
        scrollDepth: maxScroll.current + '%',
        sectionsSeen: `${seen.current.size}/${totalSections}`,
        interestScore: Math.min(100, score.current + Math.floor(secs / 6) + seen.current.size * 3),
        events: events.current.slice(-20),
      }).catch(() => {});
    };
    addEventListener('beforeunload', flush);
    return () => removeEventListener('beforeunload', flush);
  }, [session, totalSections]);

  const see = (id) => {
    if (!seen.current.has(id)) {
      seen.current.add(id);
      events.current.push('viewed:' + id);
      score.current += 2;
    }
  };
  const bump = (n, ev) => { score.current += n; if (ev) events.current.push(ev); };

  const summary = () => {
    const secs = Math.floor((Date.now() - start.current) / 1000);
    return {
      session, visits: snap.visits, time_on_page: fmt(secs),
      scroll_depth: maxScroll.current + '%',
      sections_seen: `${seen.current.size}/${totalSections} (${[...seen.current].join(', ')})`,
      interest_score: Math.min(100, score.current + Math.floor(secs / 6) + seen.current.size * 3),
      event_trail: events.current.slice(-12).join(' → '),
    };
  };

  return { snap, totalSections, see, bump, summary };
}
