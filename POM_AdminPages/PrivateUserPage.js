const { expect } = require('@playwright/test');

class PrivateUserPage {
    constructor(page) {
        this.page = page;

        //Navigate to Adoption Module
        this.privateHospitalModule = page.locator(".v-navigation-drawer__content");
        this.selectHospitalorClinicModule = page.locator("//div[text()='Private Hospital/Clinic']/../../..");
        this.selectPrivateUsers = page.locator("//div[@class='v-list-group__items']//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Private Users']/../..");

        //Dashboard
        this.search = page.locator('#usermanagementquickFilter');
        this.downloadBtn = page.locator("//button[@class='btn mr-2 btn-primary']");
        this.activeTab = page.locator("//div[@class='v-tab v-tab--active']");
        this.inactiveTab = page.locator("div[class='v-tab']");
        this.getActiveCount = page.locator(".v-tab.v-tab--active>span>span");
        this.getInActiveCount = page.locator("div[class='v-tab']>span>span");
        this.rolesDropdown = page.locator("//button[@class='btn dropdown-toggle btn-secondary' and text()='Roles']");

        //Add Private User
        this.addUserBtn = page.locator("button[class='btn primary-btn addroom-btn-size btn-secondary']");
        this.profileImage = page.locator(".profile-image>div");

        this.userRoles = page.locator(".multiselect__select");
        this.hospital = page.locator("#hospitalSelected");
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.gender = page.locator('#gender');
        this.dob = page.locator('#dateOfBirth');
        this.language = page.locator('#language');
        this.mobileNumber = page.locator("#mobileNumber");
        this.email = page.locator("#email");
        this.maritalStatus = page.locator('#maritalStatus');
        this.emergencyContactNo = page.locator("#emergencyContactNumber");
        this.address = page.locator("#address");
        this.emirateId = page.locator("#emiratesId");
        this.emirateValue = page.locator('#emirateValue');
        this.trnNo = page.locator("#trnNo");
        this.idProofImage = page.locator("//span[text()=' Click Here to Upload Files']/..").nth(0);
        this.otherDocumentImage = page.locator("//span[text()=' Click Here to Upload Files']/..").nth(1);
        this.calender = page.locator("//span[contains(text(),'2025')]");
        this.previousBtn = page.locator("//button[@aria-label='Previous Year']");
        this.validationErrorMessage = page.locator("//div[@class='error']");
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.submitBtn = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
        this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
        this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.activeBtn = page.locator("//span[text()='Active']");
        this.inActiveBtn = page.locator("//span[text()='Inactive']");

        //Calender locators
        this.clickCalenderfield = page.locator('#dateOfBirth');
        this.date = page.locator(".el-date-picker__header>span").nth(0);
        this.month = page.locator(".el-date-picker__header>span").nth(1);
        this.previousYearBtn = page.locator("//button[@aria-label='Previous Year']");



    }

    async navigateToPrivateUser() {
        await this.privateHospitalModule.hover();
        await this.page.waitForTimeout(2000);
        await this.selectHospitalorClinicModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectHospitalorClinicModule.click();
        await this.page.waitForTimeout(2000);
        await this.selectPrivateUsers.click();
        await this.page.waitForTimeout(2000);

    }

    async selectRolesDropdown(role) {
        await this.rolesDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//ul[@class='dropdown-menu show']/div//label[text()='${role}']`).click();
        await this.page.waitForTimeout(2000);
        const userNames = await this.page.locator("//div[@ref='eContainer' and @role='rowgroup']/div//div[@col-id='fullname']");
        for (let i = 0; i < await userNames.count(); i++) {
            const value = console.log(await userNames.nth(i).textContent());
            return value;
        }


    }

    async selectActiveTab() {
        await this.activeTab.click();
        await this.page.waitForTimeout(2000);
    }

    async selectInActiveTab() {
        await this.inactiveTab.click();
        await this.page.waitForTimeout(2000);
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async clickCancelBtn() {
         await this.page.waitForTimeout(2000);
        await this.cancelBtn.click();
        

    }

    async clickAddUserBtn() {
        await this.page.waitForTimeout(2000);
        await this.addUserBtn.click();
        
    }

    async addProfileImage() {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.waitForTimeout(2000);
        await this.profileImage.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./Images/profilepic.jpg');
        await this.page.waitForTimeout(2000);

    }

    async addIdProof() {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
         await this.page.waitForTimeout(1000);
        await this.idProofImage.scrollIntoViewIfNeeded();
        await this.idProofImage.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./Images/profilepic.jpg');
    
        



    }

    async addOthersImage() {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
         await this.page.waitForTimeout(1000);
        await this.otherDocumentImage.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./Images/profilepic.jpg');
        // await this.page.waitForTimeout(3000);
       

    }

    async addUserWithValidData(role, hospital, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateId, emirateValue, trnNo) {
        await this.userRoles.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//span[text()='${role}']/..`).click();
        await this.page.waitForTimeout(2000);

        if (await this.page.locator("//div[@class='multiselect__tags']//span[text()='Veterinarian']").isVisible()) {
            await this.page.locator("#speciality").scrollIntoViewIfNeeded();
            await this.page.locator("#speciality").selectOption({ label: 'Cardialogist' });
            await this.page.waitForTimeout(1000);
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.page.waitForTimeout(1000);
            await this.page.locator("#signatureUrl div>span").click();
            await this.page.locator("//label[text()='Signature']/../following-sibling::div/div").click();

            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles('Images/download.jpg');
            await this.page.waitForTimeout(2000);

        }
        else {
            console.log("Veterinarian Role is not selected");
        }

        await this.hospital.selectOption({ label: hospital });
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.gender.selectOption({ label: gender });
        await this.language.selectOption({ label: language });
        await this.mobileNumber.fill(mobileNumber);
        await this.email.fill(email);
        await this.maritalStatus.selectOption({ label: maritalStatus });
        await this.emergencyContactNo.fill(emergencyContactNo);
        await this.address.fill(address);
        await this.page.waitForTimeout(2000);
        await this.emirateValue.selectOption({ label: emirateValue });
        await this.page.waitForTimeout(2000);
        await this.emirateId.fill(emirateId);
        await this.trnNo.fill(trnNo);
        await this.page.waitForTimeout(2000);
    }


    async clickConfirmationYes() {
        await this.confirmationMessageYes.click();
        await this.page.waitForTimeout(2000);
    }

    async clickConfirmationNo() {
        await this.confirmationMessageNo.click();
        await this.page.waitForTimeout(2000);
    }

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async searchValue(value) {
        await this.search.fill(value);
        await this.page.waitForTimeout(2000);
    }

    async clickViewBtn(mobileNumber) {
        await this.page.locator(`//div[text()='${mobileNumber}']/following-sibling::div//button[@class='btn view-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async clickEditBtn(mobileNumber) {
        await this.page.locator(`//div[text()='${mobileNumber}']/following-sibling::div//button[@class='btn edit-btn btn-secondary']`).click();
        await this.page.waitForTimeout(2000);
    }

    async addUserPickCalender(date, month, year) {

        await this.clickCalenderfield.click();
        await this.page.waitForTimeout(2000);
        const getYear = await this.date.nth(0).textContent();

        if (getYear != year) {

            for (let i = getYear; i > year; i--) {
                await this.previousYearBtn.click();
            }

            await this.month.click();
            await this.page.waitForTimeout(2000);
            await this.page.locator(`//a[text()='${month}']`).click();

            const getMonth = await this.month.textContent();
            if (getMonth.includes(month)) {
                await this.page.waitForTimeout(2000);
                const locators = await this.page.locator(".el-date-table__row>td");
                for (let j = 0; j < await locators.count(); j++) {
                    const locator = await locators.nth(j).textContent();
                    if (locator.includes(date)) {
                        await locators.nth(j).click();
                        break;
                    }

                }

            }


        }

        else {
            await this.month.click();
            await this.page.locator(`//a[text()='${month}']`).click();
            await this.page.waitForTimeout(2000);

            const getMonth = await this.month.textContent();
            if (getMonth.includes(month)) {
                await this.page.waitForTimeout(2000);
                await this.page.locator(`//tr[@class='el-date-table__row']//td//span[contains(text(),'${date}')]`).click();

            }
        }

    }





} module.exports = { PrivateUserPage };