const { expect } = require('@playwright/test');

class ShopMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to Shop master Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectShopMaster = page.locator("//div[text()='Shop Master']/../..");

        //Dashboard
        this.search = page.locator("#shopquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addShopBtn = page.locator(".text-end button[class='btn primary-btn submit-btn-size btn-secondary']");

        //Add shop 
        this.name = page.locator("#name");
        this.header = page.locator("#header");
        this.footer = page.locator("#footer");
        this.contactNumber = page.locator("#contactNumber");
        this.ContactEmail = page.locator("#contactEmail");
        this.showContactNumberYes = page.locator("//span[text()='Yes']");
        this.showContactNumberNo = page.locator("//span[text()='No']");
        this.description = page.locator("#descValue");
        this.billingStaff = page.locator(".multiselect__select").nth(0);
        this.paymentStaff = page.locator(".multiselect__select").nth(1)
        this.materialCategory = page.locator(".multiselect__select").nth(2);
        this.serviceCategory = page.locator(".multiselect__select").nth(3);
        this.storageLocation = page.locator(".custom-select");

        this.submitBtn = page.locator("//span[contains(text(),'Submit')]/..");
        this.cancelBtn = page.locator("//button[contains(text(),'Cancel')]");
        this.backIcon = page.locator(".fa-xs.back-arrow.svg-inline--fa.fa-arrow-left.fa-w-14");

        //confirmation messages
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToShopMaster() {

        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectShopMaster.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddShopBtn() {
        await this.addShopBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addShopDetails(name, header, footer, contactNumber, ContactEmail, showContactNum, description, billingStaff, paymentStaff, materialCategory, serviceCategory, storageLocation) {

        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.header.fill(header);
        await this.page.waitForTimeout(1000);
        await this.footer.fill(footer);
        await this.page.waitForTimeout(1000);
        await this.contactNumber.fill(contactNumber);
        await this.page.waitForTimeout(1000);
        await this.ContactEmail.fill(ContactEmail);
        await this.page.waitForTimeout(1000);

        if (showContactNum === 'Yes') {
            await this.showContactNumberYes.click();
        }
        else {
            await this.showContactNumberNo.click();
        }
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

        await this.billingStaff.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//span[contains(text(),'${billingStaff}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.paymentStaff.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//span[contains(text(),'${paymentStaff}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.materialCategory.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//span[contains(text(),'${materialCategory}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.serviceCategory.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//span[contains(text(),'${serviceCategory}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.storageLocation.selectOption({ label: storageLocation });


    }

    async editShopDetails(name, header, footer, contactNumber, ContactEmail, showContactNum, description, billingStaff, paymentStaff, materialCategory, serviceCategory, storageLocation) {
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.header.fill(header);
        await this.page.waitForTimeout(1000);
        await this.footer.fill(footer);
        await this.page.waitForTimeout(1000);
        await this.contactNumber.fill(contactNumber);
        await this.page.waitForTimeout(1000);
        await this.ContactEmail.fill(ContactEmail);
        await this.page.waitForTimeout(1000);

        if (showContactNum === 'Yes') {
            await this.showContactNumberYes.click();
        }
        else {
            await this.showContactNumberNo.click();
        }
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

        await this.billingStaff.click();
        await this.page.locator(`//ul//li//span[contains(text(),'${billingStaff}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.paymentStaff.click();
        await this.page.locator(`//ul//li//span[contains(text(),'${paymentStaff}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.materialCategory.click();
        await this.page.locator(`//ul//li//span[contains(text(),'${materialCategory}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.serviceCategory.click();
        await this.page.locator(`//ul//li//span[contains(text(),'${serviceCategory}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.storageLocation.selectOption({ label: storageLocation });

    }

    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.click();

    }
    async clickCloseIcon() {
        await this.page.waitForTimeout(1000);
        await this.closeIcon.click();


    }

    async clickConfirmationYes() {
        await this.page.waitForTimeout(1000);
        await this.confirmationMessageYes.click();
    }

    async clickConfirmationNo() {
        await this.page.waitForTimeout(1000);
        await this.confirmationMessageNo.click();
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async searchValue(searchValue) {
        await this.page.waitForTimeout(1000);
        await this.search.fill(searchValue);
        

    }
    async clickViewIcon(shopName) {
        await this.page.locator(`//div[contains(text(),'${shopName}')]/following-sibling::div//button[contains(@class,'view')]`).click();

    }
    async clickEditIcon(shopName) {
        await this.page.locator(`//div[contains(text(),'${shopName}')]/following-sibling::div//button[contains(@class,'edit')]`).click();

    }
    async clickDeleteIcon(shopName) {
        await this.page.locator(`//div[contains(text(),'${shopName}')]/following-sibling::div//button[contains(@class,'delete')]`).click();

    }
    async clickBackIcon() {
        await this.backIcon.click();
        await this.page.waitForTimeout(1000);
    }







}
module.exports = { ShopMasterPage };