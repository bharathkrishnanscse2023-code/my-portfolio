import { sendContactEmail } from '../services/mailer.js';
import { store } from '../services/store.js';

export async function handleContact(req, res, next) {
  try {
    const { name, email, reason = 'General', rating = 'not rated', message, behaviour = {}, page = '', time = '' } = req.body;
    const payload = { name, email, reason, rating, message, behaviour, page, time };
    const result = await sendContactEmail(payload);
    await store.saveContact({ name, email, reason, rating, delivered: result.delivered });
    res.json({
      ok: true,
      delivered: result.delivered,
      message: result.delivered
        ? 'Message sent — Bharath will get back to you soon.'
        : 'Received. (Email delivery is not configured on this server yet.)',
    });
  } catch (err) {
    err.publicMessage = 'Could not send your message right now. Please email directly.';
    next(err);
  }
}
