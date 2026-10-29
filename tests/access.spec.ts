import { test, expect } from '../src/fixtures/test.fixture';

// Verifica redirecionamento no cliente; não é uma auditoria de segurança do backend.
const protectedRoutes = [
  { id: 'ACCESS-01', route: '/inventory.html' },
  { id: 'ACCESS-02', route: '/cart.html' },
  { id: 'ACCESS-03', route: '/checkout-step-one.html' },
  { id: 'ACCESS-04', route: '/checkout-step-two.html' },
  { id: 'ACCESS-05', route: '/inventory-item.html?id=4' },
] as const;

for (const { id, route } of protectedRoutes) {
  test(`${id} | Redireciona acesso sem sessão a ${route}`, async ({ page, login }) => {
    await page.goto(route);
    await expect(page).toHaveURL(/\/$/);
    await expect(login.username).toBeVisible();
    await expect(login.error).toHaveText(
      `Epic sadface: You can only access '${route.split('?')[0]}' when you are logged in.`,
    );
    await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  });
}
