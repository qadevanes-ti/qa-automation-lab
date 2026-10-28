// Demonstração visual: navegador aberto e ações com intervalo de 1,2 segundo.
const { spawnSync } = require('node:child_process');
const result = spawnSync(process.execPath, [
  require.resolve('@playwright/test/cli'), 'test', '--project=chromium',
  '--headed', '--workers=1', '--grep=CHK-01', '--timeout=120000',
], {
  stdio: 'inherit',
  env: { ...process.env, DEMO_SLOW_MO: '1200' },
});
process.exit(result.status ?? 1);
