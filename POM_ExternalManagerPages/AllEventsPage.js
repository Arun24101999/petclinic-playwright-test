const { expect } = require("playwright/test");


 
class AllEventsPage {
    constructor(page) {
        this.page = page;
        //aggrid-table
        this.waitForTable = page.locator("#aggrid-table");
 
        this.eventManagement = page.locator("//div[text()='Event Management']");
 
        this.allEvents = page.locator("//div[contains(text(),'All Events')]");
 
        this.search = page.locator("#eventFilter");
 
        this.downloadBtn = page.locator("button[class='btn mr-2 btn-primary']");
 
        this.backIcon = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
 
        this.allTab = page.locator("//div[@role='tab']//span[contains(text(),'All')]");
        this.unpublishTab = page.locator("//div[contains(text(),'Unpublished')]");
        this.publishTab = page.locator("//div[contains(text(),'Published')]");
 
        this.viewBtn = page.locator("//div[text()='Tested Ads']/..//button");
 
    }
 
    async aggridTable() {
        await this.waitForTable.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
    }
    async clickBlogManagement() {
        await this.eventManagement.hover();
        await this.eventManagement.click();
        await this.page.waitForTimeout(1000);
    }
    async clickAllBlogTab() {
        await this.allEvents.click();
        await this.page.waitForTimeout(1000);
    }
 
    async searchData(data) {
        await this.search.type(data)
        await this.page.waitForTimeout(1000);
    }
 
    async clickBackIcon() {
        await this.backIcon.click();
        await this.page.waitForTimeout(1000);
    }
    async clickDownload() {
        await this.downloadBtn.click();
        await this.page.waitForTimeout(1000);
    }
 
    async clickAllTab() {
        await this.allTab.click();
         await this.page.waitForTimeout(1000);
    }
 
    async clickUnpublishTab() {
        await this.unpublishTab.click();
         await this.page.waitForTimeout(1000);
    }
 
    async clickPublishTab() {
        await this.publishTab.click();
         await this.page.waitForTimeout(1000);
    }
 
    async viewTheAds(view) {
        await this.page.locator(`//div[text()='${view}']/..//button`).click();
        await this.page.waitForTimeout(1000);
    }
}
module.exports = { AllEventsPage };