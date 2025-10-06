const { expect } = require('@playwright/test');

class SettingsPage {

    constructor(page) {

        this.page = page;

        //Navigate to language Module
        this.settingsModule = page.locator(".v-navigation-drawer__content");
        this.selectSettingsModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Settings']");
        this.selectClinicModule = page.locator("//div[contains(@class,'v-list-item__title font-weight-bold')][normalize-space()='Clinic']");

        //Dashboard
        this.editBtn = page.locator("button[title='Click here, to edit the form']");
       
        //Edit clinic details
        this.clinicName = page.locator("#clinicname");
        this.mobileNumber = page.locator("#phonenumber");
        this.emirate = page.locator("#emirateValue");
        this.email = page.locator("#email");
        this.trnNo = page.locator("//label[text()=' TRN No ']/../following-sibling::div/input");
        this.address = page.locator("#address1");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-2 btn-secondary']");

        this.getErrorMessage=page.locator("[class='error']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToSettingsModule() {

        await this.settingsModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectSettingsModule.scrollIntoViewIfNeeded();
         await this.page.waitForTimeout(1000);
        await this.selectSettingsModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectClinicModule.click();
        await this.page.waitForTimeout(1000);
      

    }

    async clickEditBtn() {
        await this.editBtn.click();
    }

    async editClinicDetails(clinicName,mobileNumber,emirate,email,trnNo,address) {

        await this.clinicName.fill(clinicName);
        await this.page.waitForTimeout(1000);
        await this.mobileNumber.fill(mobileNumber);
        await this.page.waitForTimeout(1000);
        await this.emirate.selectOption({label:emirate});
        await this.page.waitForTimeout(1000);
        await this.email.fill(email);
        await this.page.waitForTimeout(1000);
        await this.trnNo.fill(trnNo);
        await this.page.waitForTimeout(1000);
        await this.address.fill(address);
        await this.page.waitForTimeout(1000);

    }


    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.scrollIntoViewIfNeeded();
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
        await expect(toast).toContain(expectedMessage);
    }

  






}
module.exports = { SettingsPage };