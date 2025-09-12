const { expect } = require('@playwright/test');

class StorageLocation {

    constructor(page) {
        this.search = page.locator("//input[@id='storageQuickFilter']");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");

        //naviagte to Storagelocation
        this.storageLocationModule = page.locator("//a[@class='v-item--active v-list-item--active v-list-item v-list-item--link theme--light']");
        this.storageLocationBtn = page.locator("//div[contains(text(),'Storage Location')]/..");

        //Add new Storage location
        this.addStorageLocationBtn = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
        this.storageLocation = page.locator("#storageLocation");
        this.storageUser = page.locator("//div[@class='multiselect__tags']");
        this.getStorageInchageName = page.locator(".multiselect__content>li>span[data-selected='Selected']");
        this.description = page.locator("#descValue");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backIcon = page.locator("//*[name()='svg'][@class='back-navigation svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//button[normalize-space()='×']");

    }

    async navigateToStorageLocation() {

        await this.storageLocationModule.hover();
        await this.storageLocationBtn.click();
     
    }

    async clickAddStorageLocation(storename, inchargeName, description) {

        await this.addStorageLocationBtn.click();
        await this.storageLocation.fill("new store");
        await this.storageUser.click();

        for (let i = 0; i < this.getStorageInchageName.count(); i++) {
            const name = await this.getStorageInchageName.nth(i).textContent();
            if (name.includes(givenName)) {
                await this.page.locator(`//span[contains(text(),'${name}')]`).click();
                await this.page.locator("//i[@class='multiselect__tag-icon']").click();
                await this.page.locator(`//span[contains(text(),'${name}')]`).click();
                break;
            }
            else {
                return console.log("error");
            }
        }

        await this.description.fill("value");

    }

   async clickSubmitBtn(){
    await this.submitBtn.click();

   }
   
   async clickCancelBtn(){
    await this.cancelBtn.click();

   }

   async clickConfirmationYes() {
    await this.confirmationMessageYes.click();
    await this.page.waitForTimeout(1000);
  }

  async clickConfirmationNo() {
    await this.confirmationMessageNo.click();
    await this.page.waitForTimeout(1000);
  }






}
module.exports = { StorageLocation };