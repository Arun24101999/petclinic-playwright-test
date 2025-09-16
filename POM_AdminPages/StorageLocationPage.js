const { expect } = require('@playwright/test');

class StorageLocation {

    constructor(page) {

        this.page = page;
        this.search = page.locator("//input[@id='storageQuickFilter']");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        //naviagte to Storagelocation
        this.storageLocationModule = page.locator("//a[@class='v-item--active v-list-item--active v-list-item v-list-item--link theme--light']");
        this.storageLocationBtn = page.locator("//div[contains(text(),'Storage Location')]/..");

        //Add new Storage location
        this.addStorageLocationBtn = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
        this.storageLocation = page.locator("#storageLocation");
        this.storageUser = page.locator(".multiselect__select");
        this.getStorageInchageName = page.locator(".multiselect__content>li>span[data-selected='Selected']");
        this.description = page.locator("#descValue");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backIcon = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToStorageLocation() {

        await this.storageLocationModule.hover();
        await this.storageLocationBtn.click();
        await this.downloadBtn.hover();


    }

    async clickAddStorageLocationButton() {
        await this.addStorageLocationBtn.hover();
        await this.addStorageLocationBtn.click();
    }

    async AddStorageLocationDetails(storename, inchargeName, description) {

        await this.storageLocation.fill(storename);
        await this.page.waitForTimeout(2000);
        await this.storageUser.hover();
        await this.storageUser.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//li[@class='multiselect__element']//span[contains(text(),'${inchargeName}')]`).click();
        await this.description.fill(description);

    }

     async editStorageLocationDetails(inchargeName, description) {

        await this.storageUser.hover();
        await this.storageUser.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//li[@class='multiselect__element']//span[contains(text(),'${inchargeName}')]`).click();
        await this.description.fill(description);

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

    async searchTheValue(searchValue) {
        await this.page.waitForTimeout(1000);
        await this.search.fill(searchValue);

    }
    async clickViewIcon() {
        await this.viewIcon.click();

    }
    async clickEditIcon() {
        await this.editIcon.click();

    }
    async clickDeleteIcon() {
        await this.deleteIcon.click();

    }






}
module.exports = { StorageLocation };