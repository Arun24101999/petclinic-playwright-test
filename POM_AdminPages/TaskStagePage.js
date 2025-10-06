const { expect } = require('@playwright/test');

class TaskStagePage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.taskManagementModule = page.locator(".v-navigation-drawer__content");
        this.selectTaskManagement = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Task Management']");
        this.selectTaskStage = page.locator("//div[contains(text(),'Task Stages')]/../..");

        //Dashboard

        this.search = page.locator("#taskStageQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addTaskStageBtn = page.locator("button[class='btn primary-btn add-btn-size btn-secondary']");

        //Add Category
        this.stageName = page.locator("#taskStageName");
        this.isCompletionStatusYes = page.locator("//span[text()='Yes']/..");
        this.isCompletionStatusNo = page.locator("//span[text()='No']/..");

        this.red = page.locator("input[id='#f74354']");
        this.green = page.locator("input[id='#04aa6d']");
        this.inkBlue = page.locator("input[id='#0b00ff']");
        this.lightBlue = page.locator("input[id='#03b9ba']");
        this.yellow = page.locator("input[id='#ffa500']");
        this.grey = page.locator("input[id='#ccc']");
        this.neon = page.locator("input[id='#00ffff']");
        this.pistaGreen = page.locator("input[id='#66d19e']");

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

    async navigateToTaskStage() {

        await this.taskManagementModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectTaskStage.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();

    }

    async clickAddTaskStageBtn() {
        await this.page.waitForTimeout(1000);
        await this.addTaskStageBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addTaskStageBtn.click();
    }

    async addTaskSatgeDetails(stageName, isCompletionStatus, description) {

        await this.stageName.fill(stageName);
        await this.page.waitForTimeout(1000);
        if (isCompletionStatus === 'Yes') {
            await this.isCompletionStatusYes.click();
            await this.page.waitForTimeout(1000);
        } else {
            await this.isCompletionStatusNo.click();
            await this.page.waitForTimeout(1000);
        }
        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

    }

    async clickRedColor() {
        await this.red.click();
        await this.page.waitForTimeout(1000);

    }

    async clickInkBlueColor() {
        await this.inkBlue.click();
        await this.page.waitForTimeout(1000);

    }

    async clickYellowColor() {
        await this.yellow.click();
        await this.page.waitForTimeout(1000);

    }

    async clickGreenColor() {
        await this.green.click();
        await this.page.waitForTimeout(1000);

    }

    async clickPistaGreenColor() {
        await this.pistaGreen.click();
        await this.page.waitForTimeout(1000);

    }

    async clickGreyColor() {
        await this.grey.click();
        await this.page.waitForTimeout(1000);

    }

    async clickLightBlueColor() {
        await this.lightBlue.click()
        await this.page.waitForTimeout(1000);

    }

    async clickNeonColor() {
        await this.neon.click()
        await this.page.waitForTimeout(1000);

    }

    async editCategoryDetails(categoryName, description) {
        await this.categoryName.fill(categoryName);
        await this.page.waitForTimeout(2000);
        await this.description.fill(description);
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
    async clickViewIcon(stageName) {
        await this.page.locator(`//div[text()='${stageName}']/following-sibling::div//button[contains(@class,'view')]`).click();

    }
    async clickEditIcon(stageName) {
        await this.page.locator(`//div[text()='${stageName}']/following-sibling::div//button[contains(@class,'edit')]`).click();

    }
    async clickDeleteIcon(stageName) {
        await this.page.locator(`//div[text()='${stageName}']/following-sibling::div//button[contains(@class,'delete')]`).click();

    }
    async clickBackBtn() {
        await this.backBtn.click();

    }






}
module.exports = { TaskStagePage };