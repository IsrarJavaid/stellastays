

const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.iframeSelector = 'iframe[title="Sign in with Google Button"]';
    this.googleButtonSelector = '.nsm7Bb-HzV7m-LgbsSe-MJoBVe';
    this.emailInputSelector = '//input[@type="email"]';
    this.nextButtonSelector = '//span[text()="Next"]';
    this.passwordInputSelector = '//input[@type="password"]';
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }

  async clickGoogleSignIn() {
    const iframe = this.page.frameLocator(this.iframeSelector);
    const googleButton = iframe.locator(this.googleButtonSelector);
    await googleButton.waitFor({ state: 'visible' });
    await googleButton.click();
  }

  async loginWithGoogle(email, password, context) {
    const iframe = this.page.frameLocator(this.iframeSelector);
    const googleButton = iframe.locator(this.googleButtonSelector);

    await googleButton.waitFor({ state: 'visible' });
    await googleButton.click();


    const [newPage] = await Promise.all([
      context.waitForEvent('page'), 
      googleButton.click(),         
    ]);
    await newPage.locator(this.emailInputSelector).waitFor({ state: 'visible' });
    await newPage.locator(this.emailInputSelector).fill(email);
    await newPage.locator(this.nextButtonSelector).click();
    await newPage.locator(this.passwordInputSelector).fill(password);
    await newPage.locator(this.nextButtonSelector).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/buildings/, { timeout: 30000 });
    await this.page.reload();
    await expect(this.page).toHaveTitle("Manage buildings");
    // await this.page.waitForTimeout(10000);
  }
}

module.exports = LoginPage;
