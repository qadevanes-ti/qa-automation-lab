import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
  constructor(readonly page: Page) {
    this.title = this.page.getByTestId('title');
    this.items = this.page.getByTestId('inventory-item');
    this.names = this.page.getByTestId('inventory-item-name');
    this.prices = this.page.getByTestId('inventory-item-price');
    this.badge = this.page.getByTestId('shopping-cart-badge');
  }
  readonly title: Locator;
  readonly items: Locator;
  readonly names: Locator;
  readonly prices: Locator;
  readonly badge: Locator;

  item(name: string) {
    return this.items.filter({
      has: this.page
        .getByTestId('inventory-item-name')
        .filter({ hasText: new RegExp(`^${name}$`) }),
    });
  }

  async addProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart', exact: true }).click();
  }

  async sortBy(order: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.getByTestId('product-sort-container').selectOption(order);
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
