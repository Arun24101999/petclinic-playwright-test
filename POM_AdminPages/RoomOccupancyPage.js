const { expect } = require('@playwright/test');

class RoomOccupancyPage {

    constructor(page) {

        this.page = page;

        //Navigate to Room Module
        this.roomModule = page.locator(".v-navigation-drawer__content");
        this.selectRoomModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][text()='Room']/../../..");
        this.selectRoomOccupancy = page.locator("//div[contains(text(),'Room Occupancy')]/../..");

        //Dashboard
        this.getTotalSpeciesName = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']/div/span");
        this.getAllLabel = page.locator(".rate-label h5");
        this.getAllRoomSpaces = page.locator(".average-rate h2");
        this.noOfRoomsAvailable = page.locator(".custom-header>h5 b");
        this.allPetList = page.locator("[class='v-slide-group__content v-tabs-bar__content']>div~div");

        this.nxtBtn = page.locator("[class='v-icon notranslate mdi mdi-chevron-right theme--light']");
        this.backBtn = page.locator("[class='v-icon notranslate mdi mdi-chevron-right theme--light']");


    }

    async navigateToRoomOccupancy() {
        await this.roomModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectRoomModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectRoomModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectRoomOccupancy.click();
        await this.page.waitForTimeout(2000);
        await this.nxtBtn.hover();

    }

    async clickNextBtn() {
        await this.page.waitForTimeout(1000);
        await this.nxtBtn.click();
    }

    async clickBackBtn() {
        await this.page.waitForTimeout(2000);
        await this.backBtn.click();
    }

    async getAllSpecies() {
        const petList = await this.getTotalSpeciesName.count();
        const value = [];

            for (let j = 0; j < petList; j++) {
                const headers = await this.getTotalSpeciesName.nth(j).textContent();
                value.push(headers.replace('\n','').trim());
            }
            return value;
    }

        

    async getRoomDetails() {
        const petList = await this.allPetList.count();
        const value = [];
        for (let i = 0; i < petList; i++) {
            await this.allPetList.nth(i).click();

            for (let j = 0; j < 3; j++) {
                const headers = await this.getAllLabel.nth(j).textContent();
                const spaces = await this.getAllRoomSpaces.nth(j).textContent();
                value.push(headers + spaces)
            }

        } return value;
    }









}
module.exports = { RoomOccupancyPage };