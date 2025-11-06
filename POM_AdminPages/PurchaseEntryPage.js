const { expect } = require('@playwright/test');

class PurchaseEntryPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Master Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectPurchaseEntry = page.locator("//div[contains(text(),'Purchase Entry')]/../..");

        //Dashboard

        this.search = page.locator("#purchasequickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addPurchaseOrderBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");

        //Add purchase order
        this.supplierName = page.locator("//input[@class='input-cls form-control']");
        this.purchaseDate = page.locator("#orderDate");
        this.material = page.locator("//label[contains(text(),'Material')]/following-sibling::div//input[@class='input-field-cls form-control']");
        this.quantity = page.locator("//label[contains(text(),'Quantity')]/following-sibling::div//input[@class='input-field-cls form-control']");
        this.unitPrice = page.locator("#purchaseAmount");

        this.clearBtn = page.locator("button[class='btn cancel-btn-size secondary-btn mr-4 btn-secondary']");
        this.addBtn = page.locator("button[class='btn add-btn-size primary-btn btn-secondary']");
        this.addSupplierBtn = page.locator("button[class='btn primary-btn addsupplier-btn-size btn-secondary']");


        this.cancelSupplierDetail = page.locator(".search-grid-closeicon");
        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[contains(text(),'Cancel')]");
        this.saveBtn = page.locator("button[class='btn primary-btn save-btn-size mx-3 btn-secondary']");


        //PO details edit
        this.backBtn = page.locator("button[class='btn secondary-btn back-btn-size btn-secondary']");
        this.editBtn = page.locator("//button[contains(text(),'Edit')]");

        //Received goods
        this.receivedGoodsBtn = page.locator("//b[text()='Goods Received']/../../following-sibling::div/button");
        this.materialDropDown = page.locator("#materialName");
        this.batch = page.locator("//label[contains(text(),'Batch')]/following-sibling::div//input[@class='input-field-cls form-control']");
        this.storageLocation = page.locator("#storageVal");
        this.expiryDate = page.locator("#expiryDate");

        //Return
        this.returnBtn = page.locator("//button[contains(text(),'Return')]");

        //confirmation message
        this.confirmationMessageYes = page.locator("button[class='el-button el-button--default el-button--small el-button--primary ']");
        this.confirmationMessageNo = page.locator("button[class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }


    async navigateToPurchaseEntry() {
        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectPurchaseEntry.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddPurchaseOrderBtn() {
        await this.addPurchaseOrderBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async addPODetails(supplierName, material, quantity, unitPrice) {

        await this.supplierName.fill(supplierName);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li[contains(text(),'${supplierName}')]`).click();
        await this.page.waitForTimeout(1000);

        await this.material.fill(material);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//b[contains(text(),'${material}')]/..`).click();
        await this.page.waitForTimeout(1000);

        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(1000);

        await this.unitPrice.fill(unitPrice);
        await this.page.waitForTimeout(1000);

    }

    async receivedGoodsDetails(material, quantity, batch, storageLocation) {

        await this.materialDropDown.selectOption({ label: material });
        await this.page.waitForTimeout(1000);

        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(1000);

        await this.batch.fill(batch);
        await this.page.waitForTimeout(1000);

        await this.storageLocation.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(1000);

    }




    async clickCalender() {
        await this.page.waitForTimeout(2000);
        await this.purchaseDate.click();
        await this.page.locator("//td[@class='available']//span[contains(text(),'1')]").click();
    }

    async clickExpiryCalender() {
        await this.page.waitForTimeout(2000);
        await this.expiryDate.click();
        await this.page.locator("(//span[contains(text(),'8')])[2]").click();
    }

    async clickAddBtn() {
        await this.page.waitForTimeout(1000);
        await this.addBtn.click();
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.click();

    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

    async clickConfirmationMessageYes() {
        await this.confirmationMessageYes.click();

    }

    async clickConfirmationMessageNo() {
        await this.confirmationMessageNo.click();



    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }

    async clickClearBtn() {
        await this.page.waitForTimeout(1000);
        await this.clearBtn.click();
    }

    async clickSaveBtn() {
        // await this.page.waitForTimeout(1000);
        await this.saveBtn.click();
        await this.page.waitForTimeout(800);
    }

    async validatateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async searchValue(materialName) {
        await this.search.fill(materialName);
        await this.page.waitForTimeout(2000);
    }


    async clickEditMaterialBtn(materialName) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div//button[contains(@class,'edit')]`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickDeleteMaterialBtn(materialName) {
        await this.page.locator(`//div[contains(text(),'${materialName}')]/following-sibling::div//button[contains(@class,'delete')]`).click();
    }

    async clickViewBtn(POId) {
        await this.page.locator(`//div[contains(text(),'${POId}')]/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickDeleteBtn(POId) {
        await this.page.locator(`//div[contains(text(),'${POId}')]/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickEditBtn() {
        await this.page.waitForTimeout(1000);
        await this.editBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickReceivedGoodsBtn() {
        await this.receivedGoodsBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickReturnBtn(material) {
        await this.page.locator(`//div[text()='${material}']/following-sibling::div//button`).click();
        await this.page.waitForTimeout(1000);
    }

    async returnDetails(material, value) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//div[text()='${material}']/following-sibling::div[@col-id='quantityupdate']`).hover();
        await this.page.locator(`//div[text()='${material}']/following-sibling::div[@col-id='quantityupdate']`).type(value);
        await this.page.waitForTimeout(1000);
    }


}
module.exports = { PurchaseEntryPage };
