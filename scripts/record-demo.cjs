// Captura o fluxo real para a documentação; os testes continuam em tests/.
const { chromium, expect } = require('@playwright/test');
const { mkdtemp, mkdir, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

async function main() {
  const frames = await mkdtemp(path.join(tmpdir(), 'qa-demo-'));
  const output = path.resolve(__dirname, '../docs/assets/checkout-demo.gif');
  await mkdir(path.dirname(output), { recursive: true });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
    const locator = (name) => page.locator(`[data-test="${name}"]`);
    let index = 0;
    const capture = () => page.screenshot({ path: path.join(frames, `${index++}.png`) });
    await page.goto('https://www.saucedemo.com/');
    await locator('username').fill('standard_user');
    await locator('password').fill('secret_sauce');
    await capture();
    await locator('login-button').click();
    await expect(locator('title')).toHaveText('Products');
    await capture();
    await locator('add-to-cart-sauce-labs-backpack').click();
    await expect(locator('shopping-cart-badge')).toHaveText('1');
    await capture();
    await locator('shopping-cart-link').click();
    await expect(locator('title')).toHaveText('Your Cart');
    await capture();
    await locator('checkout').click();
    await locator('firstName').fill('Pessoa');
    await locator('lastName').fill('Teste');
    await locator('postalCode').fill('01001000');
    await capture();
    await locator('continue').click();
    await expect(locator('total-label')).toHaveText('Total: $32.39');
    await capture();
    await locator('finish').click();
    await expect(locator('complete-header')).toHaveText('Thank you for your order!');
    await capture();
    const result = spawnSync(
      process.env.PYTHON || 'python3',
      [path.join(__dirname, 'assemble-demo.py'), frames, output],
      { stdio: 'inherit' },
    );
    if (result.error) throw result.error;
    if (result.status !== 0)
      throw new Error('Falha ao gerar GIF. Instale scripts/requirements-demo.txt.');
    console.log(output);
  } finally {
    if (browser) await browser.close();
    await rm(frames, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
