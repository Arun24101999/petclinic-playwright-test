const { expect } = require('@playwright/test');

class ScrapPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectScrap = page.locator("//div[text()='Scrap']/../..");

        //Dashboard

        this.search = page.locator("#scrapquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.addScrapBtn = page.locator("//button[@class='btn submitbtn-color w-auto btn-secondary']");

        //Add scrap 
        this.storageLocationDropdown = page.locator("#storageLocation");
        this.material = page.locator("#searchInput");
        this.batch = page.locator("#batchId");
        this.scrapQuantity = page.locator("#scarpquantity");
        this.reason = page.locator(".form-text-area textarea");
        this.clearBtn = page.locator("button[class='btn cancelbtn-color mr-4 btn-secondary']");
        this.addBtn = page.locator("button[class='btn submit_btn primary_btn submitbtn-color btn-secondary']");

        this.submitBtn = page.locator("//button[@class='btn submitbtn-color btn-secondary']");
        this.backBtn = page.locator("button[class='btn cancelbtn-color btn-secondary']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToScrapModule() {

        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectScrap.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddScrapBtn() {
        await this.addScrapBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addScrapBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addScrapDetails(storageLocation, material, batch, quantity, reason) {

        await this.storageLocationDropdown.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(2000);
        await this.material.type(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.scrapQuantity.fill(quantity);
        await this.page.waitForTimeout(1000);
        await this.reason.fill(reason);
        await this.page.waitForTimeout(2000);

    }

    async editScrapDetails(storageLocation, material, batch, quantity, reason) {

        await this.page.locator("[title='Clear']").click();
        await this.page.waitForTimeout(1000);
        await this.storageLocationDropdown.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(1000);
        await this.material.type(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.scrapQuantity.fill(quantity);
        await this.page.waitForTimeout(1000);
        await this.reason.fill(reason);
        await this.page.waitForTimeout(2000);
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
    async clickViewIcon(scrapId) {
        await this.page.locator(`//div[contains(text(),'${scrapId}')]/following-sibling::div[@col-id='action']//span`).click();

    }
    async clickEditIcon(materialName, batchId) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div[text()='${batchId}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();

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
module.exports = { ScrapPage };