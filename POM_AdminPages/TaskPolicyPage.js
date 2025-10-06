const { expect } = require('@playwright/test');

class TaskPolicyPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.taskManagementModule = page.locator(".v-navigation-drawer__content");
        this.selectTaskManagement = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Task Management']");
        this.selectTaskPolicy = page.locator("//div[contains(text(),'Task Policy')]/../..");

        //Dashboard

        this.search = page.locator("#taskQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addTaskPolicyBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");

        //Add task policy
        this.taskTitle = page.locator("#taskTitle");
        this.project = page.locator("//select[@class='custom-select']").nth(0);
        this.plannerHrs = page.locator("//div[@class='el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time-select']//input[@placeholder='HH:MM']");

        this.startTime = page.locator("//label[text()='Start Time']/following-sibling::div/input");
        this.endTime = page.locator("//label[text()='End Time']/following-sibling::div/input");
        this.recurrence = page.locator("//select[@class='custom-select']").nth(1);
        this.startDate = page.locator("#startDate");
        this.endDate = page.locator("#endDate");
        this.description = page.locator("#descValue");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("button[class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToTaskPolicy() {

        await this.taskManagementModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectTaskPolicy.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();

    }

    async clickAddTaskPolicyBtn() {
        await this.page.waitForTimeout(1000);
        await this.addTaskPolicyBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addTaskPolicyBtn.click();
    }

    async addTaskPolicyDetails(taskTitle, projectName, plannerHrs, startHrs, startMin, endHrs, endMin, recurrence, day1, startDate, endDate, description) {

        await this.taskTitle.fill(taskTitle);
        await this.page.waitForTimeout(1000);

        await this.project.selectOption({ label: projectName });
        await this.page.waitForTimeout(1000);

        await this.plannerHrs.click();
        await this.page.locator(`//div[@class='el-scrollbar__view']/div[@class='time-select-item' and text()='${plannerHrs}']`).click();
        await this.page.waitForTimeout(1000);

        // await this.startTime.click();
        // await this.page.waitForTimeout(2000);
        // await this.page.locator(`(//div//div//ul//li[contains(text(),'${startHrs}')])`).nth(4).click();
        // await this.page.waitForTimeout(1000);
        // await this.page.locator(`(//div//div//ul//li[contains(text(),'${startMin}')])`).click();
        // await this.page.waitForTimeout(1000);


        await this.recurrence.selectOption({ label: recurrence });
        await this.page.locator(`//button[contains(text(),'${day1}') and @class='btn date-btn btn-secondary non-active']`).click();
        await this.page.waitForTimeout(1000);

        // await this.startDate.click();
        //  await this.page.waitForTimeout(1000);
        // await this.page.locator(`(//span[contains(text(),'12')])`).nth(2).click();

        // await this.endDateDate.click();
        //  await this.page.waitForTimeout(1000);
        // await this.page.locator(`//span[contains(text(),'${endDate}')]`).nth(2).click();

        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

    }



    async editTaskPolicyDetails(taskTitle, plannerHrs, startHrs, startMin, endHrs, endMin, recurrence, day1, startDate, endDate, description) {

        await this.taskTitle.fill(taskTitle);
        await this.page.waitForTimeout(1000);

        await this.plannerHrs.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//div[@class='el-scrollbar__view']/div[@class='time-select-item' and text()='${plannerHrs}']`).click();
        await this.page.waitForTimeout(1000);

        // await this.startTime.click();
        // await this.page.waitForTimeout(2000);
        // await this.page.locator(`(//div//div//ul//li[contains(text(),'${startHrs}')])`).nth(4).click();
        // await this.page.waitForTimeout(1000);
        // await this.page.locator(`(//div//div//ul//li[contains(text(),'${startMin}')])`).click();
        // await this.page.waitForTimeout(1000);


        await this.recurrence.selectOption({ label: recurrence });
        await this.page.locator(`//button[contains(text(),'${day1}') and @class='btn date-btn btn-secondary non-active']`).click();
        await this.page.waitForTimeout(1000);

        // await this.startDate.click();
        //  await this.page.waitForTimeout(1000);
        // await this.page.locator(`(//span[contains(text(),'12')])`).nth(2).click();

        // await this.endDateDate.click();
        //  await this.page.waitForTimeout(1000);
        // await this.page.locator(`//span[contains(text(),'${endDate}')]`).nth(2).click();

        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

    }


    async clickSubmitBtn() {
        await this.submitBtn.click();

    }

    async clickCancelBtn() {
        await this.cancelBtn.click();

    }
    async clickCloseIcon() {
        await this.closeIcon.click();

    }

    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(1000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(1000);
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async validateErrorMessage(expectedMessage) {
        const toast = await this.page.locator(".error-height>div>[class='required']").textContent();
        await expect(toast).toContain(expectedMessage);
    }

    async searchTheValue(searchValue) {
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(1000);

    }
    async clickViewIcon(taskName, projectName) {
        await this.page.locator(`//div[text()='${taskName}']/following-sibling::div[text()='${projectName}']/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();

    }
    async clickEditIcon(taskName, projectName) {
        await this.page.locator(`//div[text()='${taskName}']/following-sibling::div[text()='${projectName}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();

    }
    async clickDeleteIcon(taskName, projectName) {
        await this.page.locator(`//div[text()='${taskName}']/following-sibling::div[text()='${projectName}']/following-sibling::div//button[@class='btn delete-btn btn-secondary']`).click();

    }
    async clickBackBtn() {
        await this.backBtn.click();

    }






}
module.exports = { TaskPolicyPage };