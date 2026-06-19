// Tiny schema validator — no external deps.
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''));

export function validateContact(req, res, next) {
  const { name, email, message } = req.body || {};
  const errors = [];
  if (!name || !String(name).trim()) errors.push('name is required');
  if (!isEmail(email)) errors.push('a valid email is required');
  if (!message || String(message).trim().length < 5) errors.push('message must be at least 5 characters');
  if (errors.length) return res.status(400).json({ ok: false, error: errors.join('; ') });
  next();
}

export function validateFeedback(req, res, next) {
  const { rating } = req.body || {};
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return res.status(400).json({ ok: false, error: 'rating must be an integer 1–5' });
  next();
}
