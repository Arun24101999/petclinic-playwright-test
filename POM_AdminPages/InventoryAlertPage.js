const { expect } = require('@playwright/test');

class InventoryAlertPage {
    constructor(page) {
        this.page = page;

        //Navigate to inventory alert module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectInventoryAlert = page.locator("//div[text()='Inventory Alert']/../..");

        //dashboard
        this.search = page.locator("#productquickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.lowQtyTab=page.locator("//a[@role='tab']").nth(0);
        this.ExpiringTab=page.locator("//a[@role='tab']").nth(1);

        this.getLowQtyCount = page.locator("//ul[@class='nav nav-tabs']//li/a//span").nth(0);
        this.getExpiringCount = page.locator("//ul[@class='nav nav-tabs']//li/a//span").nth(1);

        //div[contains(text(),'Buster collar')]/../div



    }


    async navigateToInventortAlert() {
        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectInventoryAlert.click();
        await this.downloadBtn.hover();

    }

    async clickLowQtyTab() {
        await this.lowQtyTab.click();
        await this.page.waitForTimeout(1000);

    }

    async clickExpiringTab() {
        await this.ExpiringTab.click();
        await this.page.waitForTimeout(1000);

    }

    async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(1000);

    }

    async getLowQtyMaterialDetails(materialName) {
        await this.page.waitForTimeout(1000);
        const getMaterialDetails = await this.page.locator(`//div[contains(text(),'${materialName}')]/../div`);
        await this.page.waitForTimeout(1000);
        const value=[]
        for(let i=0; i<await getMaterialDetails.count(); i++){
            const printValue=await getMaterialDetails.nth(i).textContent();
            await this.page.waitForTimeout(1000);
            value.push(printValue);
        }
        return value;

    }

    async getExpiringMaterialDetails(materialName) {
        await this.page.waitForTimeout(1000);
        const getMaterialDetails = await this.page.locator(`//div[contains(text(),'${materialName}')]/../div`);
        await this.page.waitForTimeout(1000);
        const value=[]
        for(let i=0; i<await getMaterialDetails.count(); i++){
            const printValue=await getMaterialDetails.nth(i).textContent();
            await this.page.waitForTimeout(1000);
            value.push(printValue);
        }
        return value;

    }




}
module.exports = { InventoryAlertPage };