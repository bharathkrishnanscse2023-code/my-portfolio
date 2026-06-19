import dotenv from 'dotenv';
dotenv.config();

const bool = (v, d = false) => (v == null ? d : String(v).toLowerCase() === 'true');
const int = (v, d) => (Number.isFinite(+v) ? +v : d);

export const config = {
  port: int(process.env.PORT, 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  ownerEmail: process.env.OWNER_EMAIL || 'bharathkrishnans.cse2023@citchennai.net',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: int(process.env.SMTP_PORT, 465),
    secure: bool(process.env.SMTP_SECURE, true),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  rate: {
    windowMin: int(process.env.RATE_WINDOW_MIN, 15),
    max: int(process.env.RATE_MAX, 20),
  },
};
