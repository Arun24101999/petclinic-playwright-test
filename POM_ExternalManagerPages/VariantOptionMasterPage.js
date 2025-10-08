const { expect } = require('@playwright/test');

class VariantOptionMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to marketplace management Module
        this.waitForTable = page.locator("#aggrid-table");
        this.selectMarketplaceManagement = page.locator("//div[text()='Marketplace Management']");
        this.selectVariantOptionMaster = page.locator("//div[contains(text(),'Variant Option Master')]");

        //Dashboard
        this.search = page.locator("#variantQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addVariantOptionBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        //Add variant option master
        this.variantName = page.locator("#productCategory");
        this.variantOption = page.locator("#subcategoryname");
        this.description = page.locator("#descValue");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToVariantOptionMaster() {

        await this.waitForTable.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMarketplaceManagement.scrollIntoViewIfNeeded();
        await this.selectMarketplaceManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectVariantOptionMaster.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddVariantOptionBtn() {
        await this.addVariantOptionBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addVariantOptionBtn.click();
    }

    async addVariantOptionDetails(variantName, variantOption, description) {
        await this.page.waitForTimeout(1000);
        await this.variantName.selectOption({ label: variantName });
        await this.page.waitForTimeout(1000);
        await this.variantOption.fill(variantOption);
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

    }

    async editVariantOptionDetails(variantOption, description) {
        await this.variantOption.fill(variantOption);
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.click();

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

    async searchTheValue(searchValue) {
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(1000);

    }
    async clickViewIcon(subCategoryName, categoryName) {
        await this.page.locator(`//div[text()='${subCategoryName}']/following-sibling::div[text()='${categoryName}']/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();

    }
    async clickEditIcon(subCategoryName, categoryName) {
        await this.page.locator(`//div[text()='${subCategoryName}']/following-sibling::div[text()='${categoryName}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();


    }
    async clickDeleteIcon(subCategoryName, categoryName) {
        await this.page.locator(`//div[text()='${subCategoryName}']/following-sibling::div[text()='${categoryName}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();

    }
    async clickCloseIcon() {
        await this.closeIcon.click();

    }






}
module.exports = { VariantOptionMasterPage };