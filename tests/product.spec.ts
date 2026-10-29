import { test, expect } from '../src/fixtures/test.fixture';
import { backpack, redShirt } from '../src/data/test-data';

test.describe('Detalhes de produto', () => {
  test('PROD-01 | Preserva nome, descrição e preço entre catálogo e detalhes', async ({
    authenticatedInventory: inventory,
    product,
    page,
  }) => {
    const card = inventory.item(backpack.name);
    await expect(card.getByTestId('inventory-item-price')).toHaveText(backpack.price);
    await expect(card.getByTestId('inventory-item-desc')).toHaveText(backpack.description);
    await inventory.openProduct(backpack.name);
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(product.name).toHaveText(backpack.name);
    await expect(product.description).toHaveText(backpack.description);
    await expect(product.price).toHaveText(backpack.price);
  });

  test(
    'PROD-02 | Adiciona produto pelos detalhes e confirma no carrinho',
    { tag: '@smoke' },
    async ({ authenticatedInventory: inventory, product, cart }) => {
      await inventory.openProduct(backpack.name);
      await product.addButton.scrollIntoViewIfNeeded();
      await expect(product.addButton).toBeInViewport();
      await product.addToCart();
      await expect(product.removeButton).toBeVisible();
      await expect(inventory.badge).toHaveText('1');
      await inventory.openCart();
      await expect(cart.names).toHaveText([backpack.name]);
      await expect(cart.prices).toHaveText([backpack.price]);
    },
  );

  test('PROD-03 | Remoção nos detalhes atualiza catálogo e carrinho', async ({
    authenticatedInventory: inventory,
    product,
    cart,
  }) => {
    await inventory.addProduct(backpack.name);
    await inventory.openProduct(backpack.name);
    await product.removeFromCart();
    await expect(product.addButton).toBeVisible();
    await expect(inventory.badge).toHaveCount(0);
    await product.backToProducts();
    await expect(inventory.title).toHaveText('Products');
    await expect(
      inventory.item(backpack.name).getByRole('button', { name: 'Add to cart', exact: true }),
    ).toBeVisible();
    await inventory.openCart();
    await expect(cart.items).toHaveCount(0);
  });

  test('PROD-04 | Localiza exatamente produto com parênteses no nome', async ({
    authenticatedInventory: inventory,
    product,
  }) => {
    await inventory.addProduct(redShirt.name);
    await inventory.openProduct(redShirt.name);
    await expect(product.name).toHaveText(redShirt.name);
    await expect(product.price).toHaveText(redShirt.price);
    await expect(product.removeButton).toBeVisible();
  });
});
