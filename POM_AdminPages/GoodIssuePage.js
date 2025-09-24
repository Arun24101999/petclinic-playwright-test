const { expect } = require('@playwright/test');

class GoodIssuePage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectGoodIssue = page.locator("//div[text()='Goods Issue']/../..");

        //Dashboard

        this.search = page.locator("#storagequickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.addGoodIssueBtn = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");

        //Add good Issue
        this.employee = page.locator("#displayCustomerName input");
        this.storageLocationDropdown = page.locator("//select[@id='batchNo' and @class='m-0 custom-select']");
        this.material = page.locator("#displayName div input");
        this.batch = page.locator("//select[@id='batchNo' and @class='custom-select']");
        this.quantity = page.locator("#quantityNo");
        this.clearBtn = page.locator(".add-med-btndiv>button[class='btn secondary-btn clear-btn-size mr-3 mb-2 btn-secondary']");
        this.addBtn = page.locator(".add-med-btndiv>button[class='btn add-btn-size primary-btn mb-2 btn-secondary']");

        this.returnBtn = page.locator("[class='btn primary-btn submit-btn-size mr-2 btn-secondary']");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToGoodIssue() {

        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectGoodIssue.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddGoodIssueBtn() {
        await this.addGoodIssueBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addGoodIssueBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addGoodIssueDetails(employeeName, storageLocation, material, batch, quantity) {

        await this.employee.fill(employeeName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//ul//li//b[contains(text(),'${employeeName}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.storageLocationDropdown.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(2000);
        await this.material.type(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(1000);

    }

    async editGoodIssueDetails(employeeName, storageLocation, material, batch, quantity) {

        await this.employee.fill(employeeName);
        await this.page.waitForTimeout(2000);
        await this.storageLocationDropdown.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(1000);
        await this.material.fill(material);
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ label: batch });
        await this.page.waitForTimeout(1000);
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(2000);
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.click();

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

    async searchValue(searchValue) {
        await this.page.waitForTimeout(1000);
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(2000);

    }
    async clickViewIcon(employeeName, ddmmyyyy) {
        await this.page.locator(`//div[contains(text(),'${employeeName}')]/following-sibling::div[contains(text(),'${ddmmyyyy}')]/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();

    }
    async clickEditIcon(materialName, batchId) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div[text()='${batchId}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();

    }
    async clickDeleteIcon(materialName, batchId) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div[text()='${batchId}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();

    }

    async clickclearBtn() {
        await this.clearBtn.click();
        await this.page.waitForTimeout(1000);
    }
    async clickAddBtn() {
        await this.addBtn.click();
        await this.page.waitForTimeout(1000);
    }
   
    async clickReturnBtn() {
        await this.returnBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async returnQuantityDeatils(material, batch, quantity) {

        await this.page.locator(`//div[contains(text(),'${material}')]/following-sibling::div[contains(text(),'${batch}')]/preceding-sibling::div[@col-id='quantityupdate']`).type(quantity);
        await this.page.waitForTimeout(1000);
    }






}
module.exports = { GoodIssuePage };