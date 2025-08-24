const { expect } = require('@playwright/test');

class UsersPage {


  constructor(page) {
    this.page = page;
    //dashboard locators
    this.userModule = page.locator("//a[@href='/user-management']");
    this.userRoleBtn = page.locator("//i[@class='v-icon notranslate mdi-24px mdi mdi-account-switch theme--light']/..");
    this.checkUserRoledropdown = page.locator("//button[text()='Roles']");
    this.selectRoleCheckbox = page.locator("//ul[@class='dropdown-menu show']/div/div/label");
    this.search = page.locator("#usermanagementquickFilter");
    this.active = page.locator("//span[contains(text(),'Active')]/..");
    this.inActive = page.locator("#firstName");
    this.downloadBtn = page.locator("//button[@data-test='download-button']");
    this.addUserBtn = page.locator("//button[@class='btn primary-btn addroom-btn-size btn-secondary']");
    this.viewBtn = page.locator("//button[@class='btn view-btn btn-secondary']");
    this.editBtn = page.locator("//button[@class='btn edit-btn btn-secondary']");

    //AddUser locators
    this.UploadPhoto = page.locator(".profile-image>div");
    this.UploadIdProof = page.locator("//span[text()=' Click Here to Upload Files']/..").nth(0);
    this.UploadOtherDocuments = page.locator("//span[text()=' Click Here to Upload Files']/..").nth(1);

    //Calender locators
    this.clickCalenderfield = page.locator('#dateOfBirth');
    this.date = page.locator(".el-date-picker__header>span").nth(0);
    this.month = page.locator(".el-date-picker__header>span").nth(1);
    this.previousYearBtn = page.locator("//button[@aria-label='Previous Year']");

    this.userRoles = page.locator(".multiselect__select");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.gender = page.locator('#gender');
    this.language = page.locator('#language');
    this.mobileNumber = page.locator("#mobileNumber");
    this.email = page.locator("#email");
    this.maritalStatus = page.locator('#maritalStatus');
    this.emergencyContactNo = page.locator("#emergencyContactNumber");
    this.address = page.locator("#address");
    this.emirateValue = page.locator('#emirateValue');
    this.emirateId = page.locator("#emiratesId");
    this.trnNo = page.locator("#trnNo");
    this.dob = page.locator('#dateOfBirth')
    this.calender = page.locator("//span[contains(text(),'2025')]");
    this.previousBtn = page.locator("//button[@aria-label='Previous Year']");
    this.validationErrorMessage = page.locator("//div[@class='error']");
    this.cancelBtn = page.locator("//button[contains(@class, 'cancel-btn-size')]");
    this.submitBtn = page.locator("//button[contains(@class, 'submit-btn-size')]");
    this.confirmationMessageYes = page.locator(".el-message-box__btns>button~button");
    this.confirmationMessageNo = page.locator(".el-message-box__btns>button");
    this.backBtn = page.locator("//*[name()='svg'][@class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
  }




  async selectUserRoleBtn() {
    const role = 'AWC Admin';
    await this.page.waitForTimeout(3000);
    await this.userRoleBtn.click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(`//ul[@class='dropdown-menu show']/li/a[text()='${role}']`).click();
  }

  async gotoUsersModule() {
    await this.userModule.click();
  }

  async clickAddUserBtn() {
    await this.addUserBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async addUserUploadPhoto() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.waitForTimeout(2000);
    await this.UploadPhoto.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./Images/profilepic.jpg');
    await this.page.waitForTimeout(2000);

  }

  async addUserIdProof() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.waitForTimeout(2000);
    await this.UploadIdProof.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./Images/profilepic.jpg');
    await this.page.waitForTimeout(2000);

  }

  async addUserOtherDocuments() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.waitForTimeout(2000);
    await this.UploadOtherDocuments.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./Images/ATS Resume.pdf');
    await this.page.waitForTimeout(2000);

  }


  async addUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo) {

    await this.userRoles.click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(`//span[text()='${role}']/..`).click();

    await this.page.waitForTimeout(1000);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.gender.selectOption({ label: `${gender}` });
    await this.language.selectOption({ label: `${language}` });
    await this.mobileNumber.fill(mobileNumber);
    await this.email.fill(email);
    await this.maritalStatus.selectOption({ label: `${maritalStatus}` });
    await this.emergencyContactNo.fill(emergencyContactNo);
    await this.address.fill(address);
    await this.emirateValue.selectOption({ label: `${emirateValue}` });
    await this.emirateId.fill(emirateId);
    await this.trnNo.fill(trnNo);
    await this.page.waitForTimeout(1000);
    await this.submitBtn.click();
    await this.page.waitForTimeout(2000);
  }



  async addUserwithoutMandatoryFields() {

    await this.submitBtn.click();
    await this.page.waitForTimeout(2000);
    const locators = await this.validationErrorMessage;
    const count = await locators.count();

    return await locators.allTextContents();


  }

  async clickSubmitBtn() {
    await this.submitBtn.click();
  }

  async clickCancelBtn() {
    await this.cancelBtn.click();
    await this.confirmationMessageYes.click();
    //await this.confirmationMessageNo.click();
    await this.page.waitForTimeout(2000);
  }

  async addUserWithInvalidData(role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo) {

    await this.userRoles.click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(`//span[text()='${role}']/..`).click();
    await this.page.waitForTimeout(1000);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.mobileNumber.fill(mobileNumber);
    await this.email.fill(email);
    await this.emergencyContactNo.fill(emergencyContactNo);
    await this.emirateId.fill(emirateId);
    await this.trnNo.fill(trnNo);
    await this.page.waitForTimeout(1000);
    await this.submitBtn.click();
    await this.page.waitForTimeout(2000);

  }

  async editUserWithValidData() {

    await this.page.waitForTimeout(1000);
    await this.firstName.fill('ArunkumarRagavan');
    await this.lastName.fill('R');
    await this.gender.selectOption({ label: 'Female' });
    await this.language.selectOption({ label: 'English' });
    await this.mobileNumber.fill('7094753145');
    await this.email.fill('arunkumar.r@medyaan.com');
    await this.maritalStatus.selectOption({ label: 'Single' });
    await this.emergencyContactNo.fill('Arun');
    await this.address.fill('rjpm');
    await this.emirateValue.selectOption({ label: 'Abu Dhabi' });
    await this.emirateId.fill('7094');
    await this.trnNo.fill('55145');
    await this.page.waitForTimeout(1000);
    await this.submitBtn.click();
    await this.page.waitForTimeout(2000);
  }



  async selectCheckbox(role) {

    await this.checkUserRoledropdown.click();
    await this.page.waitForTimeout(1000);
    const locators = await this.selectRoleCheckbox;
    for (let i = 0; i < await locators.count(); i++) {
      const locator = await locators.nth(i).textContent();
      await this.page.waitForTimeout(500);
      if (locator.includes(role)) {
        await locators.nth(i).click();
        break;
      }
    }
    await this.page.waitForTimeout(1000);
  }


  async searchTheUserAndView() {
    await this.page.waitForTimeout(1000);
    await this.checkUserRoledropdown.hover();
    await this.search.fill('Arunkumar');
    const userName = await this.page.locator("#patient-profile-pharmacy-rendered p");
    const mobileNo = await this.page.locator("//div[@col-id='mobilenumber']");
    for (let i = 0; i < await userName.count(); i++) {
      const user = await userName.nth(i).textContent();
      for (let j = 0; j < await mobileNo.count(); j++) {
        const mobile = await mobileNo.nth(j).textContent();
        if (user.includes('Arun') && mobile.includes('7094755145')) {
          await this.page.locator("//div[text()='7094755145']/following-sibling::div[@col-id='action']/div/div/button[@class='btn view-btn btn-secondary']").click();
          break;

        }
      }
    }
    await this.page.waitForTimeout(5000);
  }


  async searchTheUserAndEdit() {
    await this.page.waitForTimeout(1000);
    await this.checkUserRoledropdown.hover();
    await this.search.fill('Arunkumar');
    const userName = await this.page.locator("#patient-profile-pharmacy-rendered p");
    const mobileNo = await this.page.locator("//div[@col-id='mobilenumber']");
    for (let i = 0; i < await userName.count(); i++) {
      const user = await userName.nth(i).textContent();
      for (let j = 0; j < await mobileNo.count(); j++) {
        const mobile = await mobileNo.nth(j).textContent();
        if (user.includes('Arun') && mobile.includes('7094755145')) {
          await this.page.locator("//div[text()='7094755145']/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary']").click();
          break;

        }
      }
    }
    await this.page.waitForTimeout(5000);
    await this.backBtn.click();
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
      await this.page.locator(`//a[text()='${month}']`).click();

      const getMonth = await this.month.textContent();
      if (getMonth.includes(month)) {
         await this.page.waitForTimeout(2000);
         const locators=await this.page.locator(".el-date-table__row>td");
         for(let j=0;j<await locators.count();j++){
          const locator=await locators.nth(j).textContent();
          if(locator.includes(date)){
            await locators.nth(j).click();
            break;
          }
             
         }

        //await this.page.locator(`//tr[@class='el-date-table__row']//td//span[contains(text(),'${date}')]`).click();

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


}

module.exports = { UsersPage };