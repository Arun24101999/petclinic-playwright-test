const { expect } = require('@playwright/test');

class DiscountHistoryPage {
    constructor(page) {

        this.page = page;

        //Navigate to Discount
        this.discountModule = page.locator(".v-navigation-drawer__content");
        this.selectDiscountModule = page.locator("//div[text()='Discount']/../../..");
        this.selectDiscountHistory= page.locator("//div[text()='Discount History']/../..");

        //dashboard
        this.search = page.locator("#DiscountHistoryPage");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
       
    }




}
module.exports = { DiscountHistoryPage };
