import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { backpack, users, type Product } from '../data/test-data';
import { ProductPage } from '../pages/product.page';

type Fixtures = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  authenticatedInventory: InventoryPage;
  product: ProductPage;
  checkoutStarted: CheckoutPage;
};

type Options = { checkoutCart: { products: readonly Product[] } };

// Cada teste recebe objetos ligados à sua própria page/context, sem sessão global.
export const test = base.extend<Fixtures & Options>({
  checkoutCart: [{ products: [backpack] }, { option: true }],
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedInventory: async ({ login, inventory, page }, use) => {
    await login.open();
    await login.login(users.standard);
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.title).toHaveText('Products');
    await use(inventory);
  },
  checkoutStarted: async (
    { authenticatedInventory: inventory, cart, checkout, checkoutCart, page },
    use,
  ) => {
    await base.step('Dado um checkout com os produtos definidos pelo cenário', async () => {
      for (const product of checkoutCart.products) await inventory.addProduct(product.name);
      await inventory.openCart();
      await expect(cart.names).toHaveText(checkoutCart.products.map((product) => product.name));
      await expect(cart.prices).toHaveText(checkoutCart.products.map((product) => product.price));
      await cart.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
    await use(checkout);
  },
});

export { expect };
