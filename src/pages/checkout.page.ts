import type { Locator, Page } from '@playwright/test';

type Customer = { firstName: string; lastName: string; postalCode: string };

export class CheckoutPage {
  constructor(readonly page: Page) {
    this.error = this.page.getByTestId('error');
    this.itemNames = this.page.getByTestId('inventory-item-name');
    this.subtotal = this.page.getByTestId('subtotal-label');
    this.tax = this.page.getByTestId('tax-label');
    this.total = this.page.getByTestId('total-label');
    this.confirmation = this.page.getByTestId('complete-header');
  }
  readonly error: Locator;
  readonly itemNames: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly confirmation: Locator;

  async fillCustomer(customer: Customer) {
    await this.page.getByTestId('firstName').fill(customer.firstName);
    await this.page.getByTestId('lastName').fill(customer.lastName);
    await this.page.getByTestId('postalCode').fill(customer.postalCode);
  }

  async continue() { await this.page.getByTestId('continue').click(); }
  async cancel() { await this.page.getByTestId('cancel').click(); }
  async finish() { await this.page.getByTestId('finish').click(); }
}
