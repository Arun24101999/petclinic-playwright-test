const { expect } = require('@playwright/test');

class RoomTypePage {

    constructor(page) {

        this.page = page;

        //Navigate to Room Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectRoomModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][text()='Room']/../../..");
        this.selectRoomType = page.locator("//div[contains(text(),'Room Type')]/../..");

        //Dashboard

        this.search = page.locator("#supplierquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.petSpeciesDropDownBtn = page.locator("//button[@class='btn dropdown-toggle btn-secondary'][text()='Pet Species']");
        this.addRoomTypeBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");

        //Add room type
        this.roomType = page.locator("#categoryName");
        this.petSpeciesdropdown = page.locator(".multiselect__tags");
        this.treatmentYes = page.locator("//div[@id='treatmentValue']//label//span[text()='Yes']");
        this.treatmentNo = page.locator("//div[@id='treatmentValue']//label//span[text()='No']");
        this.description = page.locator("#descValue");

        this.submitBtn = page.locator("//span[contains(text(),'Submit')]/..");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.closeIconAddRoomType = page.locator("button[class='close']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");


        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.getToastMessage = page.locator("[role='alert']>p");


    }

    async navigateToRoomModule() {
        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectRoomModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectRoomModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectRoomType.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddRoomTypeBtn() {
        await this.addRoomTypeBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async addRoomTypeDetails(roomType, petSpecies, treatment, description) {
        await this.roomType.fill(roomType);
        await this.page.waitForTimeout(1000);
        await this.petSpeciesdropdown.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//ul//li//span[text()='${petSpecies}']`).click();
        await this.page.waitForTimeout(1000);

        if(treatment==='Yes'){
            await this.treatmentYes.click();
        }else
            {
            await this.treatmentNo.click();
        }

        await this.page.waitForTimeout(1000);
        await this.description.fill(description)

    }




    async clickCloseBtn() {
        await this.page.waitForTimeout(1000);
        await this.closeIconAddRoomType.click();
    }
    async clickSubmitBtn() {
        await this.page.waitForTimeout(2000);
        await this.submitBtn.click();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
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
        return toast;
    }

    async searchValue(roomType) {
        await this.search.fill(roomType);
        await this.page.waitForTimeout(2000);
    }


    async clickViewBtn(roomType) {
        await this.page.locator(`//div[contains(text(),'${roomType}') and @col-id='categoryname']/following-sibling::div//button[contains(@class,'view')]`).click();
        await this.page.waitForTimeout(1000);
    }

    async clickEditBtn(roomType) {
        await this.page.locator(`//div[contains(text(),'${roomType}') and @col-id='categoryname']/following-sibling::div//button[contains(@class,'edit')]`).click();
        await this.page.waitForTimeout(1000);
    }

    async clickDeleteBtn(roomType) {
        await this.page.locator(`//div[contains(text(),'${roomType}') and @col-id='categoryname']/following-sibling::div//button[contains(@class,'delete')]`).click();
        await this.page.waitForTimeout(1000);
    }

    async clickPetSpeciesDropDown(species) {
        await this.petSpeciesDropDownBtn.click();
          await this.page.waitForTimeout(1000);
        await this.page.locator(`//label[text()='${species}']`).click();
        await this.page.waitForTimeout(2000);

        const petList=[];
      
        const getPetListElements=await this.page.locator("//div[@col-id='categoryname'][@role='gridcell']");

        for(let i=0; i< await getPetListElements.count(); i++){
            const printText=await getPetListElements.nth(i).textContent();
            petList.push(printText);
        }
        return petList;
    }




}
module.exports = { RoomTypePage };