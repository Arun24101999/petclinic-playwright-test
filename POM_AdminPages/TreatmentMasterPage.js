const { expect } = require('@playwright/test');

class TreatmentMasterPage {
    constructor(page) {

        this.page = page;

        //Navigate to VaccineMaster
        this.VaccineModule = page.locator(".v-navigation-drawer__content");
        this.selectVaccineorServiceModule = page.locator("//div[text()='Vaccine / Treatment']/../../..");
        this.selectTreatmentMaster = page.locator("//div[text()='Treatment Master']/../..");

        //dashboard
        this.search = page.locator("#treatmentquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addTreatmentBtn = page.locator("//button[@class='btn submitbtn-color w-auto mr-4 btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add vaccine Master
        this.treatmentName = page.locator("#treatmentname");
        this.targetDisease = page.locator("#targetdisease");
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

    async navigateToTreatmentMaster() {
        await this.VaccineModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectVaccineorServiceModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectTreatmentMaster.click();
    }


    async clickAddTreatmentBtn() {
        await this.addTreatmentBtn.click();
        await this.page.waitForTimeout(2000);


    }

    async addTreatmentMaster(treatmentName, targetDisease, description) {
        await this.treatmentName.fill(treatmentName);
        await this.page.waitForTimeout(2000);
        await this.targetDisease.fill(targetDisease);
        await this.page.waitForTimeout(2000);
        await this.description.fill(description);

    }

    async editTreatmentMaster(treatmentName, targetDisease, description) {
        await this.page.waitForTimeout(1000);
        await this.treatmentName.fill(treatmentName);
        await this.page.waitForTimeout(2000);
        await this.targetDisease.fill(targetDisease);
        await this.page.waitForTimeout(2000);
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


    async clickViewBtn(givenTreatmentName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenTreatmentName}']/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(givenTreatmentName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenTreatmentName}']/following-sibling::div[@col-id='action']//button[@class='btn delete-btn btn-secondary']`).click();


    }

    async clickEditBtn(givenTreatmentName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenTreatmentName}']/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();

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
module.exports = { TreatmentMasterPage };
