import { test, expect } from '../src/fixtures/test.fixture';
import { backpack, bikeLight, customer } from '../src/data/test-data';

test.describe('Checkout', () => {
  test(
    'CHK-01 | Conclui uma compra com valores corretos',
    { tag: '@smoke' },
    async ({ checkoutStarted: checkout, page }) => {
      await test.step('Quando preencho os dados de entrega', async () => {
        await checkout.fillCustomer(customer);
        await checkout.continue();
      });
      await test.step('Então reviso o produto e os valores', async () => {
        await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
        await expect(checkout.itemNames).toHaveText([backpack.name]);
        await expect(checkout.subtotal).toHaveText('Item total: $29.99');
        await expect(checkout.tax).toHaveText('Tax: $2.40');
        await expect(checkout.total).toHaveText('Total: $32.39');
      });
      await test.step('Quando confirmo, recebo a conclusão do pedido', async () => {
        await checkout.finish();
        await expect(page).toHaveURL(/\/checkout-complete\.html$/);
        await expect(checkout.confirmation).toHaveText('Thank you for your order!');
      });
    },
  );

  for (const field of [
    { id: 'CHK-02', key: 'firstName', message: 'Error: First Name is required' },
    { id: 'CHK-03', key: 'lastName', message: 'Error: Last Name is required' },
    { id: 'CHK-04', key: 'postalCode', message: 'Error: Postal Code is required' },
  ] as const) {
    test(`${field.id} | Exige ${field.key}`, async ({ checkoutStarted: checkout, page }) => {
      await checkout.fillCustomer({ ...customer, [field.key]: '' });
      await checkout.continue();
      await expect(checkout.error).toHaveText(field.message);
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
  }

  test('CHK-05 | Cancela preenchimento e preserva o carrinho', async ({
    checkoutStarted: checkout,
    cart,
    page,
  }) => {
    await checkout.fillCustomer(customer);
    await checkout.cancel();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cart.names).toHaveText([backpack.name]);
    await expect(cart.prices).toHaveText([backpack.price]);
  });

  test('CHK-06 | Cancela revisão sem perder o produto', async ({
    checkoutStarted: checkout,
    inventory,
    cart,
    page,
  }) => {
    await checkout.fillCustomer(customer);
    await checkout.continue();
    await expect(checkout.total).toHaveText('Total: $32.39');
    await checkout.cancel();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.badge).toHaveText('1');
    await inventory.openCart();
    await expect(cart.names).toHaveText([backpack.name]);
  });

  test.describe('Compra de múltiplos produtos', () => {
    test.use({ checkoutCart: { products: [backpack, bikeLight] } });

    test('CHK-07 | Conclui compra de dois produtos com soma correta', async ({
      checkoutStarted: checkout,
      inventory,
    }) => {
      await checkout.fillCustomer(customer);
      await checkout.continue();
      await expect(checkout.itemNames).toHaveText([backpack.name, bikeLight.name]);
      await expect(checkout.subtotal).toHaveText('Item total: $39.98');
      await expect(checkout.tax).toHaveText('Tax: $3.20');
      await expect(checkout.total).toHaveText('Total: $43.18');
      await checkout.finish();
      await expect(checkout.confirmation).toHaveText('Thank you for your order!');
      await expect(inventory.badge).toHaveCount(0);
    });
  });
});
