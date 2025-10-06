const { expect } = require('@playwright/test');

class ProjectMasterPage {

    constructor(page) {

        this.page = page;

        //Navigate to Project Master Module
        this.taskManagementModule = page.locator(".v-navigation-drawer__content");
        this.selectTaskManagement = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Task Management']");
        this.selectProjectMaster = page.locator("//div[contains(text(),'Project Master')]/../..");

        //Dashboard

        this.search = page.locator("#projectQuickFilter");
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.viewIcon = page.locator("//button[@class='btn view-btn btn-secondary']");
        this.editIcon = page.locator("//button[@class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("//button[@class='btn delete-btn btn-secondary']");
        this.addProjectBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']").nth(0);

        //Add project master
        this.name = page.locator("#name");
        this.project = page.locator("//select[@class='custom-select']").nth(0);
        this.storageLocation = page.locator("//label[text()='Storage Location']/following-sibling::select");

        this.allowedUsers = page.locator("//label[text()='Allowed Users']/following-sibling::div/div[@class='multiselect__select']");
        this.description = page.locator("#descValue");
        this.stage = page.locator("//div[@class='draggable-content']//select[@class='d-flex align-items-center enlarged-select custom-select']");
        this.stage1 = page.locator("//div[@class='draggable-content']//select[@class='d-flex align-items-center enlarged-select custom-select']").nth(1);
        this.stage2= page.locator("//div[@class='draggable-content']//select[@class='d-flex align-items-center enlarged-select custom-select']").nth(2);

        this.submitBtn = page.locator(".text-center>button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.cancelBtn = page.locator(".text-center>button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
        this.addBtn = page.locator("//div[@class='d-flex justify-content-between align-items-center mb-2']//button[@type='button']");

        //confirmation message
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("button[class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.getToastMessage = page.locator("[role='alert']>p");

    }

    async navigateToProjectMaster() {

        await this.taskManagementModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectTaskManagement.click();
        await this.page.waitForTimeout(1000);
        await this.selectProjectMaster.click();
        await this.page.waitForTimeout(1000);
        await this.downloadBtn.hover();

    }

    async clickAddProjectBtn() {
        await this.page.waitForTimeout(1000);
        await this.addProjectBtn.hover();
        await this.page.waitForTimeout(2000);
        await this.addProjectBtn.click();
    }

    async addProjectDetails(name, storageLocation, allowedUser, description, stage1,stage2, stage3) {

        await this.name.fill(name);
        await this.page.waitForTimeout(1000);

        await this.storageLocation.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(1000);

        await this.allowedUsers.click();
        await this.page.locator(`//span[contains(text(),'${allowedUser}')]/..`).click();
        await this.page.waitForTimeout(1000);

        await this.description.fill(description);
        await this.page.waitForTimeout(1000);

        await this.stage.selectOption({label: stage1});
        await this.addBtn.click();
        await this.stage1.selectOption({label: stage2});
        await this.addBtn.click();
        await this.stage2.selectOption({label: stage3});


    }

    async editProjectDetails(name, storageLocation, allowedUser, description) {

        await this.name.fill(name);
        await this.page.waitForTimeout(1000);

        await this.storageLocation.selectOption({ label: storageLocation });
        await this.page.waitForTimeout(1000);

        await this.allowedUsers.click();
        await this.page.locator(`//span[contains(text(),'${allowedUser}')]/..`).click();
        await this.page.waitForTimeout(1000);

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

    async clickViewIcon(projectName) {
        await this.page.locator(`//div[text()='${projectName}']/following-sibling::div//button[contains(@class,'view')]`).click();

    }

    async clickEditIcon(projectName) {
        await this.page.locator(`//div[text()='${projectName}']/following-sibling::div//button[contains(@class,'edit')]`).click();

    }

    async clickDeleteIcon(projectName) {
        await this.page.locator(`//div[text()='${projectName}']/following-sibling::div//button[contains(@class,'delete')]`).click();

    }
   
    async clickBackBtn() {
        await this.backBtn.click();

    }






}
module.exports = { ProjectMasterPage };