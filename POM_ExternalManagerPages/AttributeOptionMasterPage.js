const { expect } = require('@playwright/test');

class AttributeOptionMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to marketplace management Module
        this.waitForTable = page.locator("#aggrid-table");
        this.selectMarketplaceManagement = page.locator("//div[text()='Marketplace Management']");
        this.selectAttributeOptionMaster = page.locator("//div[contains(text(),'Attribute Option Master')]");

        //Dashboard
        this.search = page.locator("#attributeQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addAttributeOptionBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        //Add Attribute option master
        this.attributeName = page.locator("#productCategory");
        this.attributeOption = page.locator("#subcategoryname");
        this.description = page.locator("#descvalue");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToAttributeOptionMaster() {

        await this.waitForTable.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMarketplaceManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMarketplaceManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectAttributeOptionMaster.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();

    }

    async clickAddAttributeOptionBtn() {
        await this.addAttributeOptionBtn.hover();
        await this.page.waitForTimeout(1000);
        await this.addAttributeOptionBtn.click();
    }

    async addAttributeOptionDetails(attributeName, attributeOption, description) {

        await this.attributeName.selectOption({ label: attributeName });
        await this.page.waitForTimeout(1000);
        await this.attributeOption.fill(attributeOption);
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);


    }

    async editAttributeOptionDetails(attributeOption, description) {
        await this.attributeOption.fill(attributeOption);
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
module.exports = { AttributeOptionMasterPage };