const { expect } = require('@playwright/test');

class PetBreedPage {
    constructor(page) {

        this.page = page;

        //Navigate to pet module
        this.petModule = page.locator(".v-navigation-drawer__content");
        this.selectPetModule = page.locator("//div[@class='v-list-item__title font-weight-bold' and text()='Pet']");
        this.selectPetBreed = page.locator("//div[text()='Pet Breed']/../..");

        //dashboard
        this.search = page.locator("#petBreedQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.addPetBreedBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");
        this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("//button[@class='btn delete-btn btn-secondary']");

        //Add pet breed
        this.species = page.locator("//span[contains(text(),'Birds')]/..");
        this.breedName = page.locator("#breedName");
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

    async navigateToPetBreed() {
        await this.petModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectPetModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectPetModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectPetBreed.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();
    }

    async ClickAddPetBreedBtn() {
        await this.addPetBreedBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async selectSpecies(species) {
        await this.page.waitForTimeout(1000);
        const speciesCount = await this.page.locator(`//span[contains(text(),'${species}')]/span`).textContent();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//span[contains(text(),'${species}')]/..`).click();
        return speciesCount;

    }

    async addPetBreedDetails(breed, description) {
            await this.page.waitForTimeout(1000);
        await this.breedName.fill(breed);
            await this.page.waitForTimeout(1000);
        await this.description.fill(description);

    }

    async editPetBreedDetails(breed, description) {
        await this.breedName.fill(breed);
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
        await this.page.locator(`//div[text()='${speciesName}']/following-sibling::div//button[contains(@class,'view')]`).click();

    }


    async clickDeleteBtn(speciesName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${speciesName}']/following-sibling::div//button[contains(@class,'delete')]`).click();


    }

    async clickEditBtn(speciesName) {
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[text()='${speciesName}']/following-sibling::div//button[contains(@class,'edit')]`).click();

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
module.exports = { PetBreedPage };