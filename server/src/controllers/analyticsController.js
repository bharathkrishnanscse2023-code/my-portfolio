import { store } from '../services/store.js';

export async function handleAnalytics(req, res, next) {
  try {
    const { session, timeOnPage, scrollDepth, sectionsSeen, interestScore, events = [] } = req.body || {};
    await store.saveAnalytics({ session, timeOnPage, scrollDepth, sectionsSeen, interestScore, events });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
