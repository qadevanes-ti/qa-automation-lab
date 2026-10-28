import { test, expect } from '../src/fixtures/test.fixture';
import { backpack, bikeLight } from '../src/data/test-data';

test.describe('Carrinho', () => {
  test('CART-01 | Adiciona produto e preserva nome e preço', { tag: '@smoke' }, async ({ authenticatedInventory: inventory, cart }) => {
    await inventory.addProduct(backpack.name);
    await expect(inventory.badge).toHaveText('1');
    await inventory.openCart();
    await expect(cart.items).toHaveCount(1);
    await expect(cart.names).toHaveText([backpack.name]);
    await expect(cart.prices).toHaveText([backpack.price]);
  });

  test('CART-02 | Remove produto do carrinho', async ({ authenticatedInventory: inventory, cart }) => {
    await inventory.addProduct(backpack.name);
    await inventory.openCart();
    await expect(cart.names).toHaveText([backpack.name]);
    await cart.removeProduct(backpack.name);
    await expect(cart.items).toHaveCount(0);
    await expect(inventory.badge).toHaveCount(0);
  });

  test('CART-03 | Mantém produto após recarregar a página', async ({ authenticatedInventory: inventory, cart, page }) => {
    await inventory.addProduct(backpack.name);
    await page.reload();
    await expect(inventory.badge).toHaveText('1');
    await inventory.openCart();
    await expect(cart.names).toHaveText([backpack.name]);
    await expect(cart.prices).toHaveText([backpack.price]);
  });

  test('CART-04 | Remove apenas o produto escolhido entre dois itens', async ({ authenticatedInventory: inventory, cart }) => {
    await inventory.addProduct(backpack.name);
    await inventory.addProduct(bikeLight.name);
    await expect(inventory.badge).toHaveText('2');
    await inventory.openCart();
    await expect(cart.names).toHaveText([backpack.name, bikeLight.name]);
    await cart.removeProduct(backpack.name);
    await expect(cart.names).toHaveText([bikeLight.name]);
    await expect(cart.prices).toHaveText([bikeLight.price]);
    await expect(inventory.badge).toHaveText('1');
  });

});
