import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { users } from '../data/test-data';

type Fixtures = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  authenticatedInventory: InventoryPage;
};

// Cada teste recebe objetos ligados à sua própria page/context, sem sessão global.
export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventory: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cart: async ({ page }, use) => { await use(new CartPage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  authenticatedInventory: async ({ login, inventory, page }, use) => {
    await login.open();
    await login.login(users.standard);
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.title).toHaveText('Products');
    await use(inventory);
  },
});

export { expect };
