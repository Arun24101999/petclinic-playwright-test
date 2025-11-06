const { expect } = require('@playwright/test');

class PrivateHospitalPage {
    constructor(page) {
        this.page = page;

        //Navigate to Adoption Module
        this.privateHospitalModule = page.locator(".v-navigation-drawer__content");
        this.selectHospitalorClinicModule = page.locator("//div[text()='Private Hospital/Clinic']/../../..");
        this.selectprivateHospital = page.locator('a:has-text("Hospital/Clinic")');

        //Dashboard
        this.search = page.locator('#HospitalQuickFilter');
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.activeTab = page.locator("//div[@class='v-tab v-tab--active']");
        this.inactiveTab = page.locator("div[class='v-tab']");
        this.getActiveCount=page.locator("//div[@class='v-tab v-tab--active']/span");
        this.getInActiveCount=page.locator("//div[@class='v-tab']/span");

        //Add Private Hospital
        this.addPrivateHospitalBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");
        this.hospitalLogo = page.locator('.dz-default.dz-message');
        this.hospitalName = page.locator('#hospitalname');
        this.prefix = page.locator('#prefix');

        this.hospitalContactNumber = page.locator('#mobileNo');
        this.hospitalEmail = page.locator('#email');
        this.hospitalTNR = page.locator('#tnr');
        this.emirate = page.locator('#emirateValue');
        this.country = page.locator('#country');
        this.privateAdmin = page.locator('#admin');
        this.privateVeterinarian = page.locator('#veterinarian');
        this.privateNurse = page.locator('#nurse');
        this.privateFrontdesk = page.locator('#frontdisk');
        this.hospitalAddress = page.locator('#address');
        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");

        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.backBtn = page.locator(".fa-xs.back-arrow.svg-inline--fa.fa-arrow-left.fa-w-14");
        this.getToastMessage = page.locator("[role='alert']>p");
        this.closeIcon= page.locator(".el-message-box__close.el-icon-close");
        this.activeBtn=page.locator("//span[text()='Active']");
        this.inactiveBtn=page.locator("//span[text()='Inactive']");

    }

    async navigateToPrivateHospitalPage() {
        await this.privateHospitalModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectHospitalorClinicModule.click();
        await this.page.waitForTimeout(2000);
        await this.selectprivateHospital.click();
        await this.page.waitForTimeout(2000);

    }

    async selectActiveTab() {
        await this.activeTab.click();
        await this.page.waitForTimeout(2000);
    }

    async selectInActiveTab() {
        await this.inactiveTab.click();
        await this.page.waitForTimeout(2000);
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();
        // await this.page.waitForTimeout(2000);
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async clickAddHospitalBtn() {
        await this.addPrivateHospitalBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addProfileImage() {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.waitForTimeout(2000);
        await this.hospitalLogo.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./Images/profilepic.jpg');
        await this.page.waitForTimeout(2000);

    }

    async addHospitalDetails(hospitalName, prefix, hospitalContactNumber,hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress) {
        await this.hospitalName.fill(hospitalName);
        await this.page.waitForTimeout(2000);
        await this.prefix.fill(prefix);
       await this.page.waitForTimeout(2000);
        await this.hospitalContactNumber.fill(hospitalContactNumber);
       await this.page.waitForTimeout(2000);
        await this.hospitalEmail.fill(hospitalEmail);
        await this.page.waitForTimeout(2000);;
        await this.hospitalTNR.fill(hospitalTNR);
        await this.page.waitForTimeout(2000);
        await this.emirate.selectOption({ label: emirate });
        await this.page.waitForTimeout(2000);
        await this.country.fill(country);
        await this.page.waitForTimeout(2000);
        await this.privateAdmin.fill(privateAdmin);
       await this.page.waitForTimeout(2000);
        await this.privateVeterinarian.fill(privateVeterinarian);
       await this.page.waitForTimeout(2000);
        await this.privateNurse.fill(privateNurse);
        await this.page.waitForTimeout(1000);
        await this.privateFrontdesk.fill(privateFrontdesk);
       await this.page.waitForTimeout(2000);
        await this.hospitalAddress.fill(hospitalAddress);
        await this.page.waitForTimeout(2000);
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

      async clickViewBtn(hospitalName) {
        await this.page.locator(`//div[contains(text(),'${hospitalName}')]/../following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

      async clickEditBtn(hospitalName) {
        await this.page.locator(`//div[contains(text(),'${hospitalName}')]/../following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }





}module.exports = { PrivateHospitalPage };