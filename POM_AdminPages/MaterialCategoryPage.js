const { expect } = require('@playwright/test');

class MaterialCategoryPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectMaterialCategory = page.locator("//div[contains(text(),'Material Category')]/../..");

        //Dashboard

        this.search = page.locator("#supplierquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addCategoryBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        //Add Category
        this.categoryName = page.locator("#categoryName");
        this.description = page.locator("#descValue");

        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToMaterialCategory() {

        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialCategory.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddCategoryBtn() {
        await this.addCategoryBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addCategoryBtn.click();
    }

    async addCategoryDetails(categoryName, description) {

        await this.categoryName.fill(categoryName);
        await this.page.waitForTimeout(2000);
        await this.description.fill(description);

    }

    async editCategoryDetails(categoryName, description) {
        await this.categoryName.fill(categoryName);
        await this.page.waitForTimeout(2000);
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
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(1000);

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
module.exports = { MaterialCategoryPage };