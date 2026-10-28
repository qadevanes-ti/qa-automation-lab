import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Catálogo', () => {
  test('CAT-01 | Ordena produtos por nome de Z a A', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('za');
    await expect(inventory.names).toHaveText([
      'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Backpack',
    ]);
  });

  test('CAT-02 | Ordena produtos por preço crescente', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('lohi');
    await expect(inventory.prices).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
  });

  test('CAT-03 | Ordena produtos por preço decrescente', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('hilo');
    await expect(inventory.prices).toHaveText(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);
  });

  test('CAT-04 | Restaura ordenação de nomes de A a Z', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('za');
    await inventory.sortBy('az');
    await expect(inventory.names).toHaveText([
      'Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)',
    ]);
  });

});
