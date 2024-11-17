
const test = require('../fixtures/login-fixture');
const { expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage')

test.describe('Home Page Dropdown list verification', () => {
  let homePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('Verify that properties dropdown have 7 values', async ({ loginPage }) => {
    await homePage.clickSideMenu()
    await homePage.clickOnProperties()

  });

  test('Verify that revenue dropdown have 1 value', async ({ loginPage }) => {
    await homePage.clickSideMenu()
    await homePage.clickOnRevenue()

  });


});

