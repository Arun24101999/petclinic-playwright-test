const { expect } = require('@playwright/test');

class AllPetsPage {
    constructor(page) {

        this.page = page;

        //Navigate to pet module
        this.petModule = page.locator(".v-navigation-drawer__content");
        this.selectPetModule = page.locator("//div[@class='v-list-item__title font-weight-bold' and text()='Pet']");
        this.selectAllPets = page.locator("//div[text()='All Pets']/../..");

        //dashboard
        this.search = page.locator("#petdetailsquickFilter");
        this.downloadBtn = page.locator("//button[contains(@class,'btn w-auto mr-2 d-none d-sm-inline btn-primary')]//*[name()='svg']/..");





    }

    async navigateToAllPets() {
        await this.petModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectPetModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectPetModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectAllPets.click();
        await this.page.waitForTimeout(5000);
        await this.downloadBtn.hover();
    }

    async selectTab(tab) {

        await this.page.locator(`//div[contains(text(),'${tab}') and @role='tab']`).click();
        await this.page.waitForTimeout(1000);
        const noOfPetCount = await this.page.locator(`//div[contains(text(),'${tab}') and @role='tab']/span`).textContent();
        return noOfPetCount;
    }

    async searchValue(value) {

        await this.search.fill(value);
        await this.page.waitForTimeout(3000);
    }

    async printPetDetails(id) {

        const count = await this.page.locator(`//div[text()='${id}']/following-sibling::div`).count();
        const value=[];
        for (let i = 0; i < count; i++) {
            const details = await this.page.locator(`//div[contains(text(),'${id}')]/following-sibling::div`).nth(i).textContent();
            value.push(details);

        }
        return value;
        
    }



}
module.exports = { AllPetsPage };
