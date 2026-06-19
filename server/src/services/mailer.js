import nodemailer from 'nodemailer';
import { config } from '../config.js';
import { logger } from '../utils/logger.js';

let transporter = null;
function getTransport() {
  if (transporter) return transporter;
  if (!config.smtp.user || !config.smtp.pass) return null; // not configured
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
  return transporter;
}

const esc = (s) => String(s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

function buildHtml(p) {
  const b = p.behaviour || {};
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #1c2942;border-radius:12px;overflow:hidden">
    <div style="background:#0a1020;color:#2fe3d8;padding:16px 20px;font-family:monospace">▶ New portfolio message</div>
    <div style="padding:20px;background:#0d1424;color:#cdd9ef">
      <p><b>Name:</b> ${esc(p.name)}</p>
      <p><b>Email:</b> ${esc(p.email)}</p>
      <p><b>Reason:</b> ${esc(p.reason)}</p>
      <p><b>Rating:</b> ${esc(p.rating)}</p>
      <p><b>Message:</b><br>${esc(p.message).replace(/\n/g, '<br>')}</p>
      <hr style="border:none;border-top:1px solid #1c2942">
      <p style="font-family:monospace;font-size:12px;color:#7e8ca8">
        session ${esc(b.session)} · visits ${esc(b.visits)} · time ${esc(b.time_on_page)}<br>
        scroll ${esc(b.scroll_depth)} · sections ${esc(b.sections_seen)} · interest ${esc(b.interest_score)}/100<br>
        trail: ${esc(b.event_trail)}<br>
        page: ${esc(p.page)} · ${esc(p.time)}
      </p>
    </div>
  </div>`;
}

export async function sendContactEmail(payload) {
  const t = getTransport();
  if (!t) {
    logger.warn('Email not sent (SMTP unconfigured). Payload logged below:');
    logger.info(JSON.stringify(payload, null, 2));
    return { delivered: false, reason: 'smtp-unconfigured' };
  }
  await t.sendMail({
    from: `"Portfolio Bot" <${config.smtp.user}>`,
    to: config.ownerEmail,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.reason} — ${payload.name}`,
    html: buildHtml(payload),
  });
  return { delivered: true };
}
