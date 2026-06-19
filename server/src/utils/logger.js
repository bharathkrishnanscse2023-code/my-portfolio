const ts = () => new Date().toISOString();
const c = { reset: '\x1b[0m', cyan: '\x1b[36m', yellow: '\x1b[33m', red: '\x1b[31m', gray: '\x1b[90m' };

export const logger = {
  info: (m) => console.log(`${c.gray}${ts()}${c.reset} ${c.cyan}INFO${c.reset}  ${m}`),
  warn: (m) => console.warn(`${c.gray}${ts()}${c.reset} ${c.yellow}WARN${c.reset}  ${m}`),
  error: (m) => console.error(`${c.gray}${ts()}${c.reset} ${c.red}ERROR${c.reset} ${m}`),
};
