const { expect } = require('@playwright/test');

class RoomManagePage {

    constructor(page) {

        this.page = page;

        //Navigate to Room Module
        this.materialCategoryModule = page.locator(".v-navigation-drawer__content");
        this.selectRoomModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][text()='Room']/../../..");
        this.selectRoomManage = page.locator("//div[contains(text(),'Room Manage')]/../..");

        //Dashboard

        this.search = page.locator("#roomquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.petSpeciesDropDownBtn = page.locator("//button[@class='btn dropdown-toggle btn-secondary'][text()='Pet Species']");
        this.addRoomBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");
        this.getFacilityCount=page.locator("span[class='badge badge-primary badge-pill']");

        //Add room 
        this.roomName = page.locator("#roomNo");
        this.petSpecies = page.locator("#petSpecies");
        this.roomType = page.locator("#roomType");
        this.wardNo = page.locator("#wardNo");
        this.floor = page.locator("#wardAddress");
        this.spaces = page.locator("#countingNumber");


        this.submitBtn = page.locator("//span[contains(text(),'Submit')]/..");
        this.cancelBtn = page.locator("button[class='btn mr-4  secondary-btn cancel-btn-size btn-secondary']");
        this.closeIconAddRoom = page.locator("button[class='close']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");


        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.getToastMessage = page.locator("[role='alert']>p");


    }

    async navigateToRoomManage() {
        await this.materialCategoryModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectRoomModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectRoomModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectRoomManage.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }

    async clickAddRoomBtn() {
        await this.addRoomBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async addRoomDetails(roomName, petSpecies, roomType, wardNo, floor, spaces) {
        await this.roomName.fill(roomName);
        await this.page.waitForTimeout(1000);
        await this.petSpecies.selectOption({label:petSpecies });
        await this.page.waitForTimeout(1000);
        await this.roomType.selectOption({label:roomType });
        await this.page.waitForTimeout(1000);
        await this.wardNo.fill(wardNo);
        await this.page.waitForTimeout(1000);
        await this.floor.fill(floor);
        await this.page.waitForTimeout(1000);
        await this.spaces.fill(spaces);
        

    }

    async editRoomDetails(floor, spaces) {
        
        await this.floor.fill(floor);
        await this.page.waitForTimeout(1000);
        await this.spaces.fill(spaces);
   

    }



    async clickCloseBtn() {
        await this.page.waitForTimeout(1000);
        await this.closeIconAddRoom.click();
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

    async validatateToastMessage() {
        const toast = await this.getToastMessage.textContent();
        return toast;
    }

    async searchValue(roomType) {
        await this.search.fill(roomType);
        await this.page.waitForTimeout(2000);
    }


    async clickViewBtn(roomNo, roomType, petSpecies) {
        await this.page.locator(`//div[text()='${roomNo}']/following-sibling::div[text()='${roomType}']/following-sibling::div/following-sibling::div[text()='${petSpecies}']/following-sibling::div/div//button[contains(@class,'view')]`).click();
        await this.page.waitForTimeout(1000);
    }

    async clickEditBtn(roomNo, roomType, petSpecies) {
        await this.page.locator(`//div[text()='${roomNo}']/following-sibling::div[text()='${roomType}']/following-sibling::div/following-sibling::div[text()='${petSpecies}']/following-sibling::div/div//button[contains(@class,'edit')]`).click();
        await this.page.waitForTimeout(1000);
    }

    async clickDeleteBtn(roomNo, roomType, petSpecies) {
        await this.page.locator(`//div[text()='${roomNo}']/following-sibling::div[text()='${roomType}']/following-sibling::div/following-sibling::div[text()='${petSpecies}']/following-sibling::div/div//button[contains(@class,'delete')]`).click();
        await this.page.waitForTimeout(1000);
    }

 
    



}
module.exports = { RoomManagePage };