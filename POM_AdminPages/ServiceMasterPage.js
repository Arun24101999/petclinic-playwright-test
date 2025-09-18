const { expect } = require('@playwright/test');

class ServiceMasterPage {
    constructor(page) {
        this.page = page;

        //Navigate to serviceMaster
        this.serviceModule = page.locator(".v-navigation-drawer__content");
        this.selectServiceModule = page.locator("//div[text()='Service']/../../..");
        this.selectServiceMaster = page.locator("//div[text()='Service Master']/../..");

        //dashboard
        this.search = page.locator("//input[@id='servicemasterquickFilter']");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addServiceMasterBtn = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.category = page.locator("(//button[normalize-space()='Category'])[1]");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add Service Master
        this.serviceCategory = page.locator("//select[@id='serviceCategory']");
        this.serviceName = page.locator("//input[@id='serviceName']");
        this.mrp = page.locator("//input[@id='mrpValue']");
        this.cost = page.locator("//input[@id='purchase']");
        this.diagnosis = page.locator(".multiselect__select");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

        //Get all service and category names
        this.getAllserviceName = page.locator("//div[@ref='centerContainer']/div/div/div/div[@col-id='serviceName']");
        this.getAllCategoryName = page.locator("//div[@ref='centerContainer']/div/div/div/div[@col-id='serviceName']");

    }


    async navigateToServiceMaster() {
        await this.serviceModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectServiceModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectServiceMaster.click();
    }

    async addServiceMaster(dropDownValue, servieName, mrp, cost, diagnosis) {
        await this.page.waitForTimeout(1000);
        await this.addServiceMasterBtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.selectOption("//select[@id='serviceCategory']", { label: dropDownValue });
        await this.page.waitForTimeout(1000);
        await this.serviceName.fill(servieName);
        await this.page.waitForTimeout(1000);
        await this.mrp.fill(mrp);
        await this.page.waitForTimeout(1000);
        await this.cost.fill(cost);
        await this.page.waitForTimeout(1000);
        await this.diagnosis.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//span[text()='${diagnosis}']/..`).click();
    }

    async editServiceMaster(servieName, mrp, cost, diagnosis) {
        await this.page.waitForTimeout(1000);
        await this.serviceName.fill(servieName);
        await this.page.waitForTimeout(1000);
        await this.mrp.fill(mrp);
        await this.page.waitForTimeout(1000);
        await this.cost.fill(cost);
        await this.page.waitForTimeout(1000);
        await this.diagnosis.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//span[text()='${diagnosis}']/..`).click();

    }


    async clickSubmitBtn() {
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickCancelBtn() {
        await this.cancelBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickViewBtn(givenServiceName, givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[contains(text(),'${givenServiceName}')]/following-sibling::div[contains(text(),'${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(givenServiceName, givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[contains(text(),'${givenServiceName}')]/following-sibling::div[contains(text(),'${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn delete-btn btn-secondary']`).click();


    }


    async clickEditBtn(givenServiceName, givenCategoryName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[contains(text(),'${givenServiceName}')]/following-sibling::div[contains(text(),'${givenCategoryName}')]/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();


    }

    async selectCategory(value) {
        await this.page.waitForTimeout(1000);
        await this.category.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//label[text()='${value}']`).click();

    }

    async searchValue(value) {
        await this.page.locator("//input[@id='servicemasterquickFilter']").waitFor({ state: 'visible' });
        await this.search.fill(value);
        await this.page.waitForTimeout(4000);

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


}
module.exports = { ServiceMasterPage };