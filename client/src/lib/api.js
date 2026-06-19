const BASE = import.meta.env.VITE_API_URL || '';

async function post(path, body) {
  const res = await fetch(`${BASE}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  sendContact: (payload) => post('/contact', payload),
  sendFeedback: (payload) => post('/feedback', payload),
  sendAnalytics: (payload) => post('/analytics', payload),
  getStats: async () => {
    const res = await fetch(`${BASE}/api/stats`);
    return res.ok ? res.json() : null;
  },
};

// mailto fallback used when the API is unreachable (no backend running)
export function mailtoFallback(owner, payload) {
  const b = payload.behaviour || {};
  const subject = encodeURIComponent(`[Portfolio] ${payload.reason} — ${payload.name}`);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\nReason: ${payload.reason}\nRating: ${payload.rating}\n\n` +
    `Message:\n${payload.message}\n\n— visitor analytics —\n` +
    `session ${b.session} · visits ${b.visits} · time ${b.time_on_page} · scroll ${b.scroll_depth} · ` +
    `sections ${b.sections_seen} · interest ${b.interest_score}/100\ntrail: ${b.event_trail}\n` +
    `page: ${payload.page} · ${payload.time}`
  );
  window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
}
