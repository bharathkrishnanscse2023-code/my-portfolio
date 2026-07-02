import { useState } from 'react';
import { profile } from '../data/profile.js';
import { api, mailtoFallback } from '../lib/api.js';

const REASONS = [
  'Internship / job opportunity', 'Project collaboration',
  'Freelance work', 'Feedback on this site', 'Just saying hi',
];
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact({ behaviour }) {
  const [form, setForm] = useState({ name: '', email: '', reason: REASONS[0], message: '' });
  const [rating, setRating] = useState(0);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ text: '', cls: '' });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const invalid = {
    name: touched.name && !form.name.trim(),
    email: touched.email && !isEmail(form.email),
    message: touched.message && !form.message.trim(),
  };

  const submit = async () => {
    setTouched({ name: true, email: true, message: true });
    if (!form.name.trim() || !isEmail(form.email) || !form.message.trim()) {
      setStatus({ text: '▸ Fix the highlighted fields.', cls: 'bad' });
      return;
    }
    setSending(true);
    setStatus({ text: '▸ Transmitting…', cls: 'ok' });

    const summary = behaviour.summary();
    const payload = {
      ...form,
      rating: rating ? rating + '/5' : 'not rated',
      behaviour: summary,
      page: location.href,
      time: new Date().toLocaleString(),
    };

    try {
      const res = await api.sendContact(payload);
      if (rating) api.sendFeedback({ rating, comment: form.message, page: location.href }).catch(() => {});
      setStatus({ text: res.delivered ? '✓ ' + res.message : '✓ Received — server logged it.', cls: 'ok' });
      setForm({ name: '', email: '', reason: REASONS[0], message: '' });
      setRating(0);
      setTouched({});
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
        setStatus({ text: '▸ API unreachable — opening your mail app instead…', cls: 'bad' });
        mailtoFallback(profile.email, payload);
      } else {
        setStatus({ text: `▸ ${err.message}`, cls: 'bad' });
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow"><span className="idx">07</span> connect</div>
        <h2 className="title">Let's build something.</h2>
        <div className="contact-grid">
          <div className="contact-side">
            <h3>Open a channel.</h3>
            <p>Internship, collaboration, or just a good problem to solve — send a message and it lands straight in my inbox. I usually reply within a day.</p>
            <div className="ci"><div className="cii">✉</div><div><span className="ck">EMAIL</span><a className="cv" href={`mailto:${profile.email}`}>{profile.email}</a></div></div>
            <div className="ci"><div className="cii">☎</div><div><span className="ck">PHONE</span><a className="cv" href={`tel:${profile.phoneRaw}`}>{profile.phone}</a></div></div>
            <div className="ci"><div className="cii">⌥</div><div><span className="ck">GITHUB</span><a className="cv" href={profile.github} target="_blank" rel="noopener">{profile.githubLabel}</a></div></div>
          </div>

          <div className="panel form">
            <div className={`fg${invalid.name ? ' invalid' : ''}`}>
              <label>Name <span className="req">*</span></label>
              <input value={form.name} onChange={set('name')} onBlur={() => setTouched((t) => ({ ...t, name: true }))} placeholder="Your name" />
              <div className="err">▸ Name is required.</div>
            </div>
            <div className={`fg${invalid.email ? ' invalid' : ''}`}>
              <label>Email <span className="req">*</span></label>
              <input type="email" value={form.email} onChange={set('email')} onBlur={() => setTouched((t) => ({ ...t, email: true }))} placeholder="you@domain.com" />
              <div className="err">▸ Enter a valid email.</div>
            </div>
            <div className="fg">
              <label>Reason for reaching out</label>
              <select value={form.reason} onChange={set('reason')}>
                {REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="fg">
              <label>Rate this portfolio</label>
              <div className="rate">
                {[1, 2, 3, 4, 5].map((v) => (
                  <i key={v} className={v <= rating ? 'on' : ''} onClick={() => { setRating(v); behaviour.bump(4, 'rated:' + v); }}>★</i>
                ))}
              </div>
            </div>
            <div className={`fg${invalid.message ? ' invalid' : ''}`}>
              <label>Message <span className="req">*</span></label>
              <textarea value={form.message} onChange={set('message')} onBlur={() => setTouched((t) => ({ ...t, message: true }))} placeholder="What's on your mind?" />
              <div className="err">▸ Message is required.</div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={submit} disabled={sending}>
              {sending ? 'Sending…' : '▶ Send message'}
            </button>
            <div className={`form-status ${status.cls}`}>{status.text}</div>
            <p className="form-note">Your visit stats (time on page, sections viewed) are attached so I can see how you explored the site. If the API is offline, your mail app opens with everything pre-filled.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
