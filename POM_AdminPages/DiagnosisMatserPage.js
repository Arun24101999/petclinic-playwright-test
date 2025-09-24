const { expect } = require('@playwright/test');

class DiagnosisMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[text()='Material']/../../..");
        this.selectDiagnosisMaster = page.locator("//div[contains(text(),'Diagnosis Master')]/../..");

        //Dashboard

        this.search = page.locator("#supplierquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addDiagnosisBtn = page.locator("//button[@class='btn primary-btn add-btn-size  mr-4 btn-secondary']");

        //Add Category
        this.diagnosisName = page.locator("#categoryName");
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

    async navigateToDiagnosisMaster() {

        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectDiagnosisMaster.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddDiagnosisBtn() {
        await this.addDiagnosisBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addDiagnosisBtn.click();
    }

    async addDiagnosisDetails(diagnosisName, description) {

        await this.diagnosisName.fill(diagnosisName);
        await this.page.waitForTimeout(2000);
        await this.description.fill(description);

    }

    async editDiagnosisDetails(diagnosisName, description) {
         await this.diagnosisName.fill(diagnosisName);
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
module.exports = { DiagnosisMasterPage };