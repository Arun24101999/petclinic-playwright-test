const { expect } = require('@playwright/test');

class VariantMasterPage {

    constructor(page) {
        this.page = page;

        //Navigate to marketplace management Module
        this.waitForTable = page.locator("#aggrid-table");
        this.selectMarketplaceManagement = page.locator("//div[text()='Marketplace Management']");
        this.selectVariantMaster = page.locator("//div[contains(text(),'Variant Master')]");

        //Dashboard
        this.search = page.locator("#variantQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addVariantBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        //Add Variant
        this.variantName = page.locator("#variantname");
        this.description = page.locator("#descvalue");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
        this.getToastMessage = page.locator(".v-toast__icon~p");
    }



    async navigateToVariantMaster() {

        await this.waitForTable.hover();
        await this.page.waitForTimeout(2000);
        await this.selectMarketplaceManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMarketplaceManagement.click();
        await this.page.waitForTimeout(2000);
        await this.selectVariantMaster.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();
    }


    async ClickAddVariantBtn() {
        await this.addVariantBtn.click();
        await this.page.waitForTimeout(1000);


    }

    async addVariantDetails(variantName, description) {
        await this.variantName.fill(variantName);
         await this.page.waitForTimeout(1000)
        await this.description.fill(description);

    }

    async editVariantDetails(variantName, description) {
        await this.variantName.fill(variantName);
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


    async clickViewBtn(variantname) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='variantname' and contains(text(), '${variantname}')]/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();

    }

    async clickEditBtn(variantname) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='variantname' and contains(text(), '${variantname}')]/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(variantname) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='variantname' and contains(text(), '${variantname}')]/following-sibling::div[@col-id='action']//button[@class='btn delete-btn btn-secondary']`).click();
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

module.exports = { VariantMasterPage };