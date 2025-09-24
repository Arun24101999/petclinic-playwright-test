const { expect } = require('@playwright/test');

class GoodTransferPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectGoodTransfer = page.locator("//div[text()='Goods Transfer']/../..");

        //Dashboard
        this.search = page.locator("#purchasequickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.addTransferGoodsBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");

        //Add scrap 
        this.from = page.locator("#storageLocationId");
        this.to = page.locator("#storageDestId");
        this.transferDate = page.locator("#transferDate");
        this.material = page.locator("#searchInput");
        this.batch = page.locator("#batchNo");
        this.quantity = page.locator("input[class='input-field-cls form-control']");
        this.clearBtn = page.locator(".add-med-btndiv button[class='btn cancel-btn-size secondary-btn mr-4 btn-secondary']");
        this.addBtn = page.locator("button[class='btn add-btn-size primary-btn btn-secondary']");

        this.submitBtn = page.locator(".text-right button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator(".text-right button[class='btn cancel-btn-size secondary-btn mr-4 btn-secondary']");
        this.backBtn = page.locator("button[class='btn cancel-btn-size secondary-btn mr-4 btn-secondary']");

        //confirmation messages
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToGoodsTransfer() {

        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectGoodTransfer.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddGoodsTransferBtn() {
        await this.addTransferGoodsBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addTransferGoodsBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addGoodsTransferDetails(from, to, date, material, batch, quantity) {

        await this.from.selectOption({ label: from });
        await this.page.waitForTimeout(1000);
        await this.to.selectOption({ label: to });
        await this.page.waitForTimeout(1000);
        await this.transferDate.click();
        await this.page.locator(`//span[contains(text(),'${date}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.material.type(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(1000);


    }

    async editGoodsTransferDetails(from, to, date, material, batch, quantity) {

        await this.page.locator("[title='Clear']").click();
        await this.from.selectOption({ label: from });
        await this.page.waitForTimeout(1000);
        await this.to.selectOption({ label: to });
        await this.page.waitForTimeout(1000);
        await this.transferDate.click();
        await this.page.locator(`//span[contains(text(),'${date}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.material.type(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(1000);
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

    async searchValue(searchValue) {
        await this.page.waitForTimeout(1000);
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(2000);

    }
    async clickViewIcon(gtId) {
        await this.page.locator(`//div[contains(text(),'${gtId}')]/following-sibling::div[@col-id='action']//button`).click();

    }
    async clickEditIcon(materialName, batchId) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div[text()='${batchId}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();

    }
    async clickDeleteIcon(materialName, batchId) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div[text()='${batchId}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();

    }
    async clickBackBtn() {
        await this.backBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickclearBtn() {
        await this.clearBtn.click();
        await this.page.waitForTimeout(1000);
    }
    async clickAddBtn() {
        await this.addBtn.click();
        await this.page.waitForTimeout(1000);
    }







}
module.exports = { GoodTransferPage };