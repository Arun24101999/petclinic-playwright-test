const { expect } = require('@playwright/test');

class AttributeMasterPage {

    constructor(page) {
        this.page = page;

        //Navigate to marketplace management Module
        this.waitForTable = page.locator("#aggrid-table");
        this.selectMarketplaceManagement = page.locator("//div[text()='Marketplace Management']");
        this.selectAttributeMaster = page.locator("//div[contains(text(),'Attribute Master')]");

        //Dashboard
        this.search = page.locator("#attributeQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addAttributeBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        //Add Variant
        this.attributeName = page.locator("#attributename");
        this.description = page.locator("#descvalue");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
        this.getToastMessage = page.locator(".v-toast__icon~p");
    }



    async navigateToAttributeMaster() {

        await this.waitForTable.hover();
        await this.page.waitForTimeout(2000);
        await this.selectMarketplaceManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMarketplaceManagement.click();
        await this.page.waitForTimeout(2000);
        await this.selectAttributeMaster.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();
    }


    async ClickAddAttributeBtn() {
        await this.addAttributeBtn.click();
        await this.page.waitForTimeout(1000);


    }

    async addAttributeDetails(attributeName, description) {
         await this.page.waitForTimeout(1000)
        await this.attributeName.fill(attributeName);
         await this.page.waitForTimeout(1000)
        await this.description.fill(description);

    }

    async editAttributeDetails(attributeName, description) {
        await this.attributeName.fill(attributeName);
         await this.page.waitForTimeout(1000)
        await this.description.fill(description);

    }


    async clickSubmitBtn() {
        await this.submitBtn.click();
        await this.page.waitForTimeout(1000);
    }


    async clickCancelBtn() {
        await this.cancelBtn.click();
        await this.page.waitForTimeout(1000);
    }


    async clickViewBtn(attributename) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='attributename' and contains(text(), '${attributename}')]/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();

    }

    async clickEditBtn(attributename) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='attributename' and contains(text(), '${attributename}')]/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(attributename) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='attributename' and contains(text(), '${attributename}')]/following-sibling::div[@col-id='action']//button[@class='btn delete-btn btn-secondary']`).click();
    }

    async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(1000);
    }

     async clickCloseIcon() {
        await this.closeIcon.click();

    }

    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(1000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(1000);
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }



}

module.exports = { AttributeMasterPage };