const { expect } = require('@playwright/test');

class PetSpeciesPage {
    constructor(page) {

        this.page = page;

        //Navigate to pet module
        this.petModule = page.locator(".v-navigation-drawer__content");
        this.selectPetModule = page.locator("//div[@class='v-list-item__title font-weight-bold' and text()='Pet']");
        this.selectPetSpecies = page.locator("//div[text()='Pet Species']/../..");

        //dashboard
        this.search = page.locator("#petCategoryQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addPetSpeciesBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add pet species
        this.species = page.locator("#categoryName");
        this.description = page.locator("#descValue");
        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("button[class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.getToastMessage = page.locator("[role='alert']>p");


    }

    async navigateToPetSpecies() {
        await this.petModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectPetModule.scrollIntoViewIfNeeded();
         await this.page.waitForTimeout(1000);
        await this.selectPetModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectPetSpecies.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();
    }

    async ClickAddPetSpeciesBtn() {
        await this.addPetSpeciesBtn.click();
       

    }

    async addPetSpeciesDetails(species, description) {
        await this.species.fill(species);
        await this.description.fill(description);

    }

    async editPetSpeciesDetails(description) {
        await this.description.fill(description);

    }

    
    async clickSubmitBtn() {
        await this.page.waitForTimeout(1000);
        await this.submitBtn.click();
        
    }


    async clickCancelBtn() {
        await this.page.waitForTimeout(1000);
        await this.cancelBtn.click();

    }


    async clickViewBtn(speciesName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${speciesName}']/following::div//button[contains(@class,'view')]`).click();

    }


    async clickDeleteBtn(speciesName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${speciesName}']/following::div//button[contains(@class,'delete')]`).click();


    }

    async clickEditBtn(speciesName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${speciesName}']/following::div//button[contains(@class,'edit')]`).click();

    }

    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(2000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(2000);
    }

    async validateToastMessage() {
        const toast = await this.getToastMessage.textContent();
        return toast;
        
    }

     async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(1000);

    }

     async clickCloseIcon() {
        await this.closeIcon.click();
        await this.page.waitForTimeout(1000);

    }
     async clickBackBtn() {
        await this.backBtn.click();
        await this.page.waitForTimeout(1000);

    }







}
module.exports = { PetSpeciesPage };