const { expect } = require('@playwright/test');

class DiscountAllocationPage {
    constructor(page) {

        this.page = page;

        //Navigate to Discount
        this.discountModule = page.locator(".v-navigation-drawer__content");
        this.selectDiscountModule = page.locator("//div[text()='Discount']/../../..");
        this.selectDiscountAllocation = page.locator("//div[text()='Discount Allocation']/../..");

        //dashboard
        this.search = page.locator("#discountAllocationQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addAllocationBtn = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add vaccine Master
        this.discountName = page.locator("#searchInput");
        this.orderType = page.locator("#orderType");
        this.ruleAgainst = page.locator("#rulesAgainst");
        this.ruleAgainstId = page.locator("#rulesAgainstId");
        this.timeFrame = page.locator("#timeFrame");
        this.allocationCount = page.locator("#allocationCount");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");


    }


    async navigateToDiscountMaster() {
        await this.discountModule.hover();
        await this.page.waitForTimeout(2000);
        await this.page.scrollIntoViewIfNeeded(this.selectDiscountModule);
        await this.selectDiscountModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectDiscountMaster.click();
    }


    async clickAddDiscountBtn() {
        await this.addDiscountBtn.click();
        await this.page.waitForTimeout(2000);


    }

    async addDiscountMaster(discountName, discountType, discountValue, discountCode,remarkName,description) {
        await this.discountName.fill(discountName);
        await this.page.selectOption(this.discountType,{label: `${discountType}`});
          await this.discountValue.fill(discountValue);
        await this.discountCode.fill(discountCode);
          await this.remarkName.fill(remarkName);
        
        await this.description.fill(description);

    }

    async editVaccineMaster(vaccineName, targetDisease, description) {
        await this.page.waitForTimeout(1000);
        await this.vaccineName.fill(vaccineName);
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


    async clickViewBtn(givenDiscountName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenDiscountName}']/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();

    }


    async clickDeleteBtn(givenDiscountName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenDiscountName}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();


    }

    async clickEditBtn(givenDiscountName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${givenDiscountName}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();

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
module.exports = { DiscountAllocationPage };
