

const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.menuSelector = '//button[@class="md:hidden me-4"]';
        this.propertiesDropdownSelector = '//span[normalize-space()="Properties"]';
        this.dropdownItemsSelector = '//div[@class="pt-4"]';
        this.revenueDropdownSelector = '//span[normalize-space()="Revenue"]';
    }



    async clickSideMenu() {
        await this.page.setViewportSize({ width: 800, height: 700 });
        await this.page.locator(this.menuSelector).click()
    }

    async clickOnProperties() {
        await this.page.locator(this.propertiesDropdownSelector).click()
        const dropdownItems = await this.page.locator(this.dropdownItemsSelector).all()
        const actualItems = []
        for (const item of dropdownItems) {
            const text = await item.textContent();
            actualItems.push(text.trim());
        }

        const expectedItems = ["Manage buildingsManage propertiesConfigurationHouse rulesDamage protectionCancellation policyOther content"]
        expect(actualItems).toEqual(expectedItems);
    }

    async clickOnRevenue() {
        await this.page.locator(this.revenueDropdownSelector).click()
        const dropdownItems = await this.page.locator(this.dropdownItemsSelector).all()
        const actualItems = []
        for (const item of dropdownItems) {
            const text = await item.textContent();
            actualItems.push(text.trim());
        }

        const expectedItems = ["Pricing overview",]
        expect(actualItems).toEqual(expectedItems);
    }


}

module.exports = HomePage;
