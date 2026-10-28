import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(readonly page: Page) {
    this.items = this.page.getByTestId('inventory-item');
    this.names = this.page.getByTestId('inventory-item-name');
    this.prices = this.page.getByTestId('inventory-item-price');
  }
  readonly items: Locator;
  readonly names: Locator;
  readonly prices: Locator;

  async removeProduct(name: string) {
    await this.items.filter({ has: this.page.getByText(name, { exact: true }) })
      .getByRole('button', { name: 'Remove', exact: true }).click();
  }

  async checkout() { await this.page.getByTestId('checkout').click(); }
}
