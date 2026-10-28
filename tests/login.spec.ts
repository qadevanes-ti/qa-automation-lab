import { test, expect } from '../src/fixtures/test.fixture';
import { users } from '../src/data/test-data';

test.describe('Autenticação', () => {
  test.beforeEach(async ({ login }) => { await login.open(); });

  test('AUTH-01 | Deve realizar login com usuário válido', { tag: '@smoke' }, async ({ login, inventory, page }) => {
    await test.step('Quando entro com credenciais válidas', async () => { await login.login(users.standard); });
    await test.step('Então vejo o catálogo de produtos', async () => {
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventory.title).toHaveText('Products');
      await expect(inventory.items).toHaveCount(6);
      await expect(inventory.items.first()).toBeVisible();
    });
  });

  for (const scenario of [
    { id: 'AUTH-02', title: 'rejeita credenciais inválidas', user: users.invalid, message: 'Epic sadface: Username and password do not match any user in this service' },
    { id: 'AUTH-03', title: 'informa usuário bloqueado', user: users.locked, message: 'Epic sadface: Sorry, this user has been locked out.' },
    { id: 'AUTH-04', title: 'exige usuário', user: { username: '', password: '' }, message: 'Epic sadface: Username is required' },
    { id: 'AUTH-05', title: 'exige senha', user: { username: users.standard.username, password: '' }, message: 'Epic sadface: Password is required' },
  ]) {
    test(`${scenario.id} | ${scenario.title}`, async ({ login, page }) => {
      await login.login(scenario.user);
      await expect(login.error).toHaveText(scenario.message);
      await expect(page).toHaveURL(/\/$/);
    });
  }

  test('AUTH-06 | Encerra a sessão', async ({ login, inventory, page }) => {
    await login.login(users.standard);
    await expect(inventory.title).toHaveText('Products');
    await inventory.logout();
    await expect(page).toHaveURL(/\/$/);
    await expect(login.username).toBeVisible();
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);
    await expect(login.error).toContainText('You can only access');
  });
});
