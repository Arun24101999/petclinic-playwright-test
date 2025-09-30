const { expect } = require('@playwright/test');

class SupplierOrVendorPage {
    constructor(page) {
        this.page = page;

        //Navigate to supplier module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectSupplierModule = page.locator("//div[text()='Supplier / Vendor']/../..");

        //dashboard
        this.search = page.locator("#supplierquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addSupplierBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");
       

        //Add Supplier
        this.name = page.locator("#name");
        this.mobileNumber = page.locator("#mobilenumber");
        this.email = page.locator("#email");
        this.emirate = page.locator("#emirateValue");
        this.address = page.locator("#address");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-2 btn-secondary']");
        this.closeBtn = page.locator("button[class='close']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }


    async navigateToSupplierModule() {
        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectSupplierModule.click();
        await this.downloadBtn.hover();
        
    }

    async clickAddSupplierBtn() {
        await this.addSupplierBtn.click();
         await this.page.waitForTimeout(2000);
    }

    async addSupplierDetails(name, mobileNumber, email, emirateValue, address) {
        
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.mobileNumber.fill(mobileNumber);
        await this.page.waitForTimeout(1000);
        await this.email.fill(email);
        await this.page.waitForTimeout(1000);
         await this.emirate.selectOption({ label: emirateValue });
        await this.page.waitForTimeout(1000);
        await this.address.fill(address);
        
    }

    async editSupplierDetails(name, mobileNumber, email, emirateValue, address) {
        
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.mobileNumber.fill(mobileNumber);
        await this.page.waitForTimeout(1000);
        await this.email.fill(email);
        await this.page.waitForTimeout(1000);
         await this.emirate.selectOption({ label: emirateValue });
        await this.page.waitForTimeout(1000);
        await this.address.fill(address);
        
    }



    async clickSubmitBtn() {
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickCancelBtn() {
        await this.cancelBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async clickCloseBtn() {
        await this.closeBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async clickViewBtn(userId) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[text()='${userId}']/following-sibling::div/div//button[contains(@class,'view')]`).click();

    }


    async clickDeleteBtn(userId) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[text()='${userId}']/following-sibling::div/div//button[contains(@class,'delete')]`).click();


    }


    async clickEditBtn(userId) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[text()='${userId}']/following-sibling::div/div//button[contains(@class,'edit')]`).click();


    }

   

    async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(1000);

    }

    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(1000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(1000);
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
        await this.page.waitForTimeout(1000);
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }


}
module.exports = { SupplierOrVendorPage };