const { expect } = require('@playwright/test');

class ServiceCategoryPage {
    constructor(page) {

        this.page = page;

        //Navigate to serviceMaster
        this.serviceModule = page.locator(".v-navigation-drawer__content");
        this.selectServiceModule = page.locator("//div[text()='Service']/../../..");
        this.selectServiceCategory = page.locator("//div[text()='Service Category']/../..");

        //dashboard
        this.search = page.locator("#servicecategoryquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addServiceCategoryBtn = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add Service Master
        this.serviceCategory = page.locator("#categoryName");
        this.serviceName = page.locator("//input[@id='serviceName']");
        this.description = page.locator("#description");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");


    }

    async navigateToServiceCategory() {
        await this.serviceModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectServiceModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectServiceCategory.click();
        await this.downloadBtn.hover();
    }

    async ClickAddServiceCategoryBtn() {
        await this.addServiceCategoryBtn.click();
       

    }

    async addServiceCategory(categoryName, description) {
        await this.serviceCategory.fill(categoryName);
        await this.description.fill(description);

    }

    async editServiceCategory(categoryName,description) {
         await this.serviceCategory.fill(categoryName);
        await this.description.fill(description);

    }

    
    async clickSubmitBtn() {
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickCancelBtn() {
        await this.cancelBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickViewBtn(givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='categoryName' and contains(text(), '${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='categoryName' and contains(text(), '${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn delete-btn btn-secondary']`).click();


    }

    async clickEditBtn(givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[@col-id='categoryName' and contains(text(), '${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();

    }

    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(2000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(2000);
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

     async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(2000);

    }







}
module.exports = { ServiceCategoryPage };