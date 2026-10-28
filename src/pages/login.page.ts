import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  constructor(readonly page: Page) {
    this.username = this.page.getByTestId('username');
    this.password = this.page.getByTestId('password');
    this.error = this.page.getByTestId('error');
  }
  readonly username: Locator;
  readonly password: Locator;
  readonly error: Locator;

  async open() { await this.page.goto('/'); }

  async login(user: { username: string; password: string }) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.page.getByTestId('login-button').click();
  }
}
