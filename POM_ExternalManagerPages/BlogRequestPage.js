const { expect } = require("playwright/test");



class BlogRequestPage {
    constructor(page) {
        this.page = page;
        this.blogManage = page.locator("//div[contains(text(),'Approval Management')]");
        this.blogRequest = page.locator("//div[contains(text(),'Blog Request')]");
        this.search = page.locator("#blogRequestQuickFilter");
        this.download = page.locator("//button[@class='btn mr-2 btn-primary']");

        this.allTab = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']//div[contains(text(),'All')]");
        this.pendingTab = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']//div[contains(text(),'Pending')]");
        this.inprogressTab = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']//div[contains(text(),'In')]");
        this.approveTab = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']//div[contains(text(),'App')]");
        this.rejectTab = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']//div[contains(text(),'Re')]");

        this.blogCategoryBtn = page.locator("#overallEvent__BV_toggle_");
        this.viewBtn = page.locator("button[class='btn view-btn btn-secondary']");
        this.editBtn = page.locator("button[class='btn edit-btn btn-secondary']");

        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");

        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator(".el-message-box__close.el-icon-close");
        this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
        this.getToastMessage = page.locator(".v-toast__icon~p");



    }

   async navigateToBlogRequest(){
    
   }
}
module.exports = { BlogRequestPage };