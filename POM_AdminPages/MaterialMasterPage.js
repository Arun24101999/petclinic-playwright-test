const { expect } = require('@playwright/test');

class MaterialMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Master Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectMaterialMaster = page.locator("//div[contains(text(),'Material Master')]/../..");

        //Dashboard

        this.search = page.locator("#productquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addMaterialBtn = page.locator("button[class='btn primary-btn add-btn-size mr-2 btn-secondary']");

        this.materialTab = page.locator("//div[@class='v-tab v-tab--active']");
        this.batchTab = page.locator("//div[@class='v-tab']");

        //Add material
        this.name = page.locator("#name");
        this.manufacturer = page.locator("#searchInput");
        this.mrpAED = page.locator("#mrpValue");
        this.materialCategory = page.locator("#productCategory");
        this.materialType = page.locator("#productType");
        this.diagnosis = page.locator("//div[@class='multiselect__tags']");
        this.genericName = page.locator("#composition");

        this.canBeSoldYes = page.locator("//label[text()='Can be Sold']/..//div/label/span[text()='Yes']");
        this.canBeSoldNo = page.locator("//label[text()='Can be Sold']/..//div/label/span[text()='No']");
        this.canBeConsumedYes = page.locator("//label[text()='Can be Consumed']/..//div/label/span[text()='Yes']");
        this.canBeConsumedNo = page.locator("//label[text()='Can be Consumed']/..//div/label/span[text()='No']");
        this.canBeIporOpYes = page.locator("//label[text()='IP/OP']/..//div/label/span[text()='Yes']");
        this.canBeIporOpNo = page.locator("//label[text()='IP/OP']/..//div/label/span[text()='No']");
        this.isAppliedShopYes = page.locator("//label[contains(text(),'Is Applied Shop')]/..//div/label/span[text()='Yes']");
        this.isAppliedShopNo = page.locator("//label[contains(text(),'Is Applied Shop')]/..//div/label/span[text()='No']");

        this.uploadImage = page.locator("//p[text()='Drag and drop files here to upload']/../..");

        this.isReplacementorExchangePolicyYes = page.locator("//label[contains(text(),'Is Replacement/Exchange Policy')]/..//div/label/span[text()='Yes']");
        this.isReplacementorExchangePolicyNo = page.locator("//label[contains(text(),'Is Replacement/Exchange Policy')]/..//div/label/span[text()='No']");
        this.descriptionContent = page.locator("#descContent");
        this.expectedDeliveryDays = page.locator("#deliveryDate");
        this.productDescription = page.locator("div[class='ql-container ql-snow'] div[class='ql-editor ql-blank']");
        this.isReturnPolicyYes = page.locator("//label[contains(text(),'Is Return Policy')]/..//div/label/span[text()='Yes']");
        this.isReturnPolicyNo = page.locator("//label[contains(text(),'Is Return Policy')]/..//div/label/span[text()='No']");
        this.returnOrReplacementDays = page.locator("#returnDays");
        this.returnContent = page.locator("//body[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[20]/div[1]/div[1]/div[1]/div[2]/div[1]");


        this.submitBtn = page.locator("//span[contains(text(),'Submit')]/..");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator(".fa-xs.back-arrow.svg-inline--fa.fa-arrow-left.fa-w-14");


        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");

        //Batch Tab dropdowns
        this.categoryDropdownBtn = page.locator("//button[@class='btn dropdown-toggle btn-primary']");
        this.storageLocationDropDownBtn = page.locator("//button[text()='Storage Location' and @class='btn dropdown-toggle btn-secondary']");
        this.clickFirstViewBtn= page.locator("div[role='rowgroup'] div:nth-child(1) div:nth-child(10) div:nth-child(1) div:nth-child(1) button:nth-child(1)");

        //Material qty
        this.getAvailableQty = page.locator("//p[contains(text(),'Adrenaline  1ml')]/../../following-sibling::div[text()='Medicine']/following-sibling::div[@col-id='quantity']");
    

    }

    async navigateToMaterialMaster() {
        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialMaster.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddMaterialBtn() {
        await this.addMaterialBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async addMaterialDetails(name, manufacturer, mrpAED, materialCategory, materialType, diagnosis, genericName) {
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.manufacturer.fill(manufacturer);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul[@id='search-formul-list-one']/li/b[text()='${manufacturer}']`).click();
        await this.page.waitForTimeout(1000);
        await this.mrpAED.fill(mrpAED);
        await this.page.waitForTimeout(1000);
        await this.materialCategory.selectOption({ label: materialCategory });
        await this.page.waitForTimeout(1000);
        await this.materialType.selectOption({ label: materialType });
        await this.page.waitForTimeout(1000);
        await this.diagnosis.click();
        await this.page.locator(`//li//span[text()='${diagnosis}']`).click();
        await this.page.waitForTimeout(1000);
        await this.genericName.fill(genericName);

    }


    async addIsAppliedshopDetails(descriptionContent, expectedDeliveryDays, productDescription) {
        await this.descriptionContent.fill(descriptionContent);
        await this.expectedDeliveryDays.fill(expectedDeliveryDays);
        await this.productDescription.fill(productDescription);
    }

    async addIsReturnPolicyDetails(returnOrReplacementDays, returnContent) {
        await this.returnOrReplacementDays.fill(returnOrReplacementDays);
        await this.returnContent.fill(returnContent);
    }


    async clickCanBeSoldYes() {
        await this.canBeSoldYes.click();
    }
    async clickCanBeSoldNo() {
        await this.canBeSoldNo.click();
    }
    async clickCanBeConsumedYes() {
        await this.canBeConsumedYes.click();
    }
    async clickCanBeConsumedNo() {
        await this.canBeConsumedNo.click();
    }
    async clickCanBeIporOpYes() {
        await this.canBeIporOpYes.click();
    }
    async clickCanBeIporOpNo() {
        await this.canBeIporOpNo.click();
    }
    async clickIsAppliedShopYes() {
        await this.isAppliedShopYes.click();
    }
    async clickIsAppliedShopNo() {
        await this.isAppliedShopNo.click();
    }
    async clickIsReplacementorExchangePolicyYes() {
        await this.isReplacementorExchangePolicyYes.click();
    }
    async clickIsReplacementorExchangePolicyNo() {
        await this.isReplacementorExchangePolicyNo.click();
    }
    async clickIsReturnPolicyYes() {
        await this.isReturnPolicyYes.click();
    }
    async clickIsReturnPolicyNo() {
        await this.isReturnPolicyNo.click();
    }


    async uploadImageFile(filePath) {
        await this.uploadImage.scrollIntoViewIfNeeded();
        const [fileChooserPromise] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.uploadImage.click(),
        ]);

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(4000);
    }

    async clickSubmitBtn() {
        await this.page.waitForTimeout(2000);
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
        await this.page.waitForTimeout(1000);
    }

    async clickConfirmationMessageNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(1000);
    }

    async clickCloseIcon() {
        await this.page.waitForTimeout(1000);
        await this.closeIcon.click();
    }

    async validatateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async searchValue(materialName) {
        await this.search.fill(materialName);
        await this.page.waitForTimeout(2000);
    }


    async clickEditBtn(materialName, materialCategory) {
        await this.page.locator(`//p[contains(text(),'${materialName}')]/../../following-sibling::div[text()='${materialCategory}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickViewBtn(materialName, materialCategory) {
        await this.page.locator(`//p[contains(text(),'${materialName}')]/../../following-sibling::div[text()='${materialCategory}']/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickDeleteBtn(materialName, materialCategory) {
        await this.page.locator(`//p[contains(text(),'${materialName}')]/../../following-sibling::div[text()='${materialCategory}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickCategoryDropDown(materialCategory) {
        await this.categoryDropdownBtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//div/label[text()='${materialCategory}']`).click();
    }

    async clickStorageLocationDropDown(storageLocation) {
        await this.storageLocationDropDownBtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//div/label[text()='${storageLocation}']`).click();
    }



}
module.exports = { MaterialMasterPage };