// Minimal append-only JSON store. Swap for a real DB (Mongo/Postgres) in production.
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../../data');

async function ensure() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readArr(file) {
  await ensure();
  const fp = path.join(DATA_DIR, file);
  try {
    return JSON.parse(await fs.readFile(fp, 'utf8'));
  } catch {
    return [];
  }
}

async function append(file, record) {
  const arr = await readArr(file);
  const entry = { id: Date.now() + '-' + Math.random().toString(36).slice(2, 7), ts: new Date().toISOString(), ...record };
  arr.push(entry);
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(arr, null, 2));
  return entry;
}

export const store = {
  saveFeedback: (r) => append('feedback.json', r),
  saveAnalytics: (r) => append('analytics.json', r),
  saveContact: (r) => append('contacts.json', r),
  allFeedback: () => readArr('feedback.json'),
  allAnalytics: () => readArr('analytics.json'),
  allContacts: () => readArr('contacts.json'),
};
