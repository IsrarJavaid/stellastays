const { test: baseTest } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const test = baseTest.extend({
  loginPage: async ({ page, context }, use) => {
    const loginPage = new LoginPage(page);
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing email or password in environment variables');
    }
    await loginPage.navigate();
    await loginPage.loginWithGoogle(email, password, context);
    await use(loginPage); 
  },
});

module.exports = test;
