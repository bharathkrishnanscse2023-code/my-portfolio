import { store } from '../services/store.js';

export async function handleFeedback(req, res, next) {
  try {
    const { rating, comment = '', page = '' } = req.body;
    const saved = await store.saveFeedback({ rating, comment, page });
    const all = await store.allFeedback();
    const avg = all.reduce((s, f) => s + (f.rating || 0), 0) / (all.length || 1);
    res.json({ ok: true, id: saved.id, total: all.length, average: +avg.toFixed(2) });
  } catch (err) {
    next(err);
  }
}
