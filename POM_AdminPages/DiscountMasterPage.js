const { expect } = require('@playwright/test');

class DiscountMasterPage {
    constructor(page) {

        this.page = page;

        //Navigate to Discount
        this.discountModule = page.locator(".v-navigation-drawer__content");
        this.selectDiscountModule = page.locator("//div[text()='Discount']/../../..");
        this.selectDiscountMaster = page.locator("//div[text()='Discount Master']/../..");

        //dashboard
        this.search = page.locator("#discountMasterQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addDiscountBtn = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add vaccine Master
        this.discountName = page.locator("#discountName");
        this.discountType = page.locator("#discountType");
        this.discountValue = page.locator("#discountValue");
        this.discountCode = page.locator("#discountCode");
        this.remarkNo = page.locator("//label[text()='Remark']/../div//label/span[text()='No']");
        this.remarkYes = page.locator("//label[text()='Remark']/../div//label/span[text()='Yes']");
        this.allocationNeedYes = page.locator("//label[text()='Allocation Need']/../div//label/span[text()='Yes']");
        this.allocationNeedNo = page.locator("//label[text()='Allocation Need']/../div//label/span[text()='Yes']");
        this.validFrom = page.locator("#validFrom");
        this.validTo = page.locator("#validTo");
        this.remarkName = page.locator("#remarkableDesc");
        this.discription = page.locator("#descValue");
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
        await this.selectDiscountModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectDiscountModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectDiscountMaster.click();
    }


    async clickAddDiscountBtn() {
        await this.addDiscountBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addDiscountMaster(discountName, discountType, discountValue, discountCode, remarkName, description) {
        await this.discountName.fill(discountName);
        await this.page.waitForTimeout(1000);
        await this.discountType.selectOption({ label: discountType });
        await this.page.waitForTimeout(1000);
        await this.discountValue.fill(discountValue);
        await this.page.waitForTimeout(1000);
        await this.discountCode.fill(discountCode);
        await this.page.waitForTimeout(1000);
        await this.remarkName.fill(remarkName);
        await this.page.waitForTimeout(1000);
        await this.discription.fill(description);

    }

    async editDiscountMaster(discountName, discountType, discountValue, discountCode, remarkName, description) {
        await this.discountName.fill(discountName);
        await this.page.waitForTimeout(1000);
        await this.discountType.selectOption({ label: discountType });
        await this.page.waitForTimeout(1000);
        await this.discountValue.fill(discountValue);
        await this.page.waitForTimeout(1000);
        await this.discountCode.fill(discountCode);
        await this.page.waitForTimeout(1000);
        await this.remarkName.fill(remarkName);
        await this.page.waitForTimeout(1000);
        await this.discription.fill(description);

    }

    async remarkbtn(Value) {
        if (Value === 'Yes') {
            await this.remarkYes.click();
            await this.page.waitForTimeout(1000);

        } else {
            await this.remarkNo.click();
            await this.page.waitForTimeout(1000);
        }
    }

    async allocationNeedbtn(Value) {
        if (Value === 'Yes') {
            await this.allocationNeedYes.click();
            await this.page.waitForTimeout(1000);

        } else {
            await this.allocationNeedNo.click();
            await this.page.waitForTimeout(1000);
        }
    }

    async clickAddDiscountBtn() {
        await this.addDiscountBtn.click();
        await this.page.waitForTimeout(2000);
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

    async calenderValidFrom(date, month, year) {
        await this.page.waitForTimeout(1000);
        await this.validFrom.click();
        await this.page.waitForTimeout(2000);

        const locatorYear = await this.page.locator("//span[@role='button']").nth(3);
        const getYear = locatorYear.textContent();
        await this.page.waitForTimeout(2000);
        const locatorMonth = await this.page.locator("//span[@role='button']").nth(4);

        const getMonth = locatorMonth.textContent();
        return getMonth;
       await this.page.locator(`td[class='available today current'] div span`).click();
        if (year.includes(getYear)) {
            if (month.includes(getMonth)) {
                const clickDate = await this.page.locator(`//span[contains(text(),'${date}')]`).nth(2);
                clickDate.click();

            }
        }
    }


    // async calenderValidTo(date, month, year) {
    //     await this.page.waitForTimeout(1000);
    //     await this.validTo.click();
    //     const getYear = await this.page.locator("(//div[@x-placement='top-start']//span[@role='button'])[1]").textContent();
    //     const getMonth = await this.page.locator("div[x-placement='top-start'] div[class='el-date-picker__header'] span~span").textContent();

    //     if (year.includes(getYear)) {
    //         if (month.includes(getMonth)) {
    //             await this.page.locator(`//span[contains(text(),'${date}')]`).nth(2).click();

    //         }
    //     }
    // }


}
module.exports = { DiscountMasterPage };
