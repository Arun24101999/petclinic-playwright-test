const { expect } = require('@playwright/test');

class DiscountHistoryPage {
    constructor(page) {

        this.page = page;

        //Navigate to Discount
        this.discountModule = page.locator(".v-navigation-drawer__content");
        this.selectDiscountModule = page.locator("//div[text()='Discount']/../../..");
        this.selectDiscountHistory = page.locator("//div[text()='Discount History']/../..");

        //dashboard
        this.search = page.locator("#discountHistoryQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.getTotalEntries = page.locator("//div[@col-id='petid' and @role='gridcell']");

    }

    async naviagteToDiscountHistory() {
        await this.discountModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectDiscountModule.scrollIntoViewIfNeeded();
        await this.selectDiscountModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectDiscountHistory.click();
        await this.downloadBtn.hover();
    }

    async getDiscountHistoryList() {
        await this.page.waitForTimeout(1000);
        const count = await this.getTotalEntries.count();
        return count;
    }

    async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(2000);
    }

    async getHistoryDetailsBasedonUserId(userId) {
        const getDiscountDetails = await this.page.locator(`//div[@col-id='userid' and normalize-space()='${userId}']/following-sibling::div`);
        await this.page.waitForTimeout(1000);
        const promises = [],sequence=["Pet ID","Order ID", "Order Type", "Discount Name", "Discount Code", "Discount Type", "Discount%","Remarks", "Description" ];
        for(let i=0;i < await getDiscountDetails.count(); i++){
            promises.push(getDiscountDetails.nth(i).textContent())
        }
        const result = await Promise.all(promises);
        const returner = sequence.map((elem,idx)=>{
            return { [elem]: result[idx] }
        })
        return returner;

        
        // return await getDiscountDetails.allTextContents();
    }



}
module.exports = { DiscountHistoryPage };
