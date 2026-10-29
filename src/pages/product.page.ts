import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(readonly page: Page) {
    const details = page.locator('.inventory_details_desc_container');
    this.name = details.getByTestId('inventory-item-name');
    this.description = details.getByTestId('inventory-item-desc');
    this.price = details.getByTestId('inventory-item-price');
    this.addButton = details.getByTestId('add-to-cart');
    this.removeButton = details.getByTestId('remove');
  }

  async addToCart() {
    await this.addButton.click();
  }
  async removeFromCart() {
    await this.removeButton.click();
  }
  async backToProducts() {
    await this.page.getByTestId('back-to-products').click();
  }
}
