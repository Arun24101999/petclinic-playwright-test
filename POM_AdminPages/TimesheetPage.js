const { expect } = require('@playwright/test');

class TimesheetPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.taskManagementModule = page.locator(".v-navigation-drawer__content");
        this.selectTaskManagement = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Task Management']");
        this.selectTimesheet = page.locator("//div[contains(text(),'Time Sheet')]/../..");

        //Dashboard

        this.search = page.locator("#projectQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addTaskStageBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");
        this.userDropDownBtn = page.locator("//button[@class='btn dropdown-toggle btn-primary']");

    }

    async navigateToTimesheet() {

        await this.taskManagementModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectTimesheet.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();

    }

   
    async selectUserDropdown(value) {
        await this.userDropDownBtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//label[text()='${value}']`).click();
        await this.page.waitForTimeout(1000);

        const userNameElement=await this.page.locator("//div[@col-id='assigned_name' and @role='gridcell' ]").first();
        const userName=await userNameElement.textContent();
        await expect(userName).toContain(value);
    }

    async searchValue(taskName) {
        await this.search.fill(taskName);
        await this.page.waitForTimeout(1000);

    }
   
    async getDetails(taskName) {
        const allRecords=await this.page.locator('.ag-center-cols-container>div>div');
        await this.page.waitForTimeout(1000);
        const count=await allRecords.count();
        const printText=[];
        for(let i=0; i<count; i++){
            const getDetails= await allRecords.nth(i).textContent();
            printText.push(getDetails+ '\n');
        }
        return printText;

    }
   

}
module.exports = { TimesheetPage };