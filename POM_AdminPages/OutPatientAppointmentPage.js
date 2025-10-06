const { expect } = require('@playwright/test');

class OPAppointmentPage {

    constructor(page) {

        this.page = page;

        //Navigate to Appointment Module
        this.appointmentModule = page.locator(".v-navigation-drawer__content");
        this.selectAppointmentModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Appointment']");
        this.selectOpModule = page.locator("//div[text()='Outpatient']/../..");

        //Dashboard
        this.search = page.locator("#appointmentFilter");

        //switching tabs(pending,ongoing,..)
        this.alltab = page.locator("//div[contains(text(),'  All')]")
        this.pendingtab = page.locator("//div[contains(text(),'  Pending')]")
        this.ongoingtab = page.locator("//div[contains(text(),'  Ongoing')]")
        this.wrapup = page.locator("//div[contains(text(),'  Wrap-up')]")
        this.invoiceTab = page.locator("//div[contains(text(),'Invoice')]");
        this.paymentTab = page.locator("//div[contains(text(),'Pay')]");
        this.completeTab = page.locator("//div[contains(text(),'Comp') and @role='tab']");
        this.cancelTab = page.locator("//div[contains(text(),'Cancel') and @role='tab']");

        //view appointment details
        this.closeIcon = page.locator("[class='close']");
        this.loader = page.locator("#aggrid-table");

    }

    async navigateToAppointmentModule() {
        await this.appointmentModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectAppointmentModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectAppointmentModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectOpModule.click();
        await this.page.waitForTimeout(2000);
        await this.cancelTab.hover();

    }

    async selectAllTab() {
        await this.alltab.click();


    }
    async selectWrapUpTab() {
        await this.page.waitForTimeout(1000);
        await this.wrapup.click();


    }
    async selectPendingTab() {
        await this.page.waitForTimeout(1000);
        await this.pendingtab.click();


    }
    async selectOngoingTab() {
        await this.page.waitForTimeout(1000);
        await this.ongoingtab.click();

    }

    async selectInvoiceTab() {
        await this.page.waitForTimeout(1000);
        await this.invoiceTab.click();

    }

    async selectPaymentPendingTab() {
        await this.page.waitForTimeout(1000);
        await this.paymentTab.click();

    }

    async selectCompletedTab() {
        await this.page.waitForTimeout(1000);
        await this.completeTab.click();

    }

    async selectCancelledTab() {
        await this.page.waitForTimeout(1000);
        await this.cancelTab.click();

    }

    async searchValue(value) {
        await this.search.type(value);


    }

    async clickViewBtn() {
        await this.loader.waitFor({ state: 'visible' });
        await this.page.locator("[class='btn view-appointment-btn btn-secondary']").first().click();

    }

    async clickCloseIcon() {
        await this.closeIcon.click();

    }


}
module.exports = { OPAppointmentPage };