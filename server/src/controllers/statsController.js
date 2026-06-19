import { store } from '../services/store.js';

export async function handleStats(_req, res, next) {
  try {
    const [feedback, analytics, contacts] = await Promise.all([
      store.allFeedback(),
      store.allAnalytics(),
      store.allContacts(),
    ]);
    const avg = feedback.reduce((s, f) => s + (f.rating || 0), 0) / (feedback.length || 1);
    res.json({
      ok: true,
      visitors: analytics.length,
      messages: contacts.length,
      feedbackCount: feedback.length,
      averageRating: +avg.toFixed(2),
    });
  } catch (err) {
    next(err);
  }
}
