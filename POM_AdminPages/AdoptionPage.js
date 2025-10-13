const { expect } = require('@playwright/test');

class AdoptionPage {

  constructor(page) {
    this.page = page;

    //Navigate to Adoption Module
    this.adoptionModule = page.locator(".v-navigation-drawer__content");
    this.selectAdoptionModule = page.locator("//div[text()='Adoption']/../../..");
    this.requestbtn = page.locator("//div[text()='Request']/../..");

    //Adoption Page Elements
    this.selectAdoptionRequest = page.locator(".v-slide-group__wrapper>div>div~div").nth(0);
    this.selectFosterRequest = page.locator(".v-slide-group__wrapper>div>div~div").nth(1);
    this.selectTrialRequest = page.locator(".v-slide-group__wrapper>div>div~div").nth(2);
    this.selectReturnRequest = page.locator(".v-slide-group__wrapper>div>div~div").nth(3);

    this.selectFosterActive = page.locator(".v-slide-group__wrapper>div>div~div").nth(4);
    this.selectTrialActive = page.locator(".v-slide-group__wrapper>div>div~div").nth(5);
    //Request Columns
    this.search = page.locator("#FosterFilter");

    this.getCustomerName = page.locator("(//div[@ref='leftContainer']/following-sibling::div/div/div)[1]/div/div[@col-id='name']");
    this.getPetName = page.locator("(//div[@ref='leftContainer']/following-sibling::div/div/div)[1]/div/div[@col-id='petname']");
    this.viewAdoptionRequest = page.locator("//div[@role='gridcell'][normalize-space()='Tamilselvi A']/following-sibling::div[@col-id='action']/div/div/div/div/button");

    this.rejectBtn = page.locator("//button[@class='btn secondary-btn  cancel-btn-size mr-3 btn-secondary']");
    this.closeIcon = page.locator("//button[@class='close']");
    this.submitBtn = page.locator("//button[@class='btn mt-4 float-right primary-btn submit-btn-size btn-secondary']");
    this.acceptBtn = page.locator("//button[@class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
    this.confirmationMessageYes = page.locator("//button[contains(@class,'el-button el-button--default el-button--small el-button--primary')]");
    this.confirmationMessageNo = page.locator("//button[@class='el-button el-button--default el-button--small']");
    this.closeIcon = page.locator("//button[normalize-space()='×']");
    this.backBtn = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");
    this.getToatMessage = page.locator(".v-toast__icon~p");
    this.completeBtn = page.locator("[class='btn primary-btn submit-btn-size btn-secondary']");

    //Active Column
    this.activeSearch = page.locator("#fosterOrderFilter");
    this.getPetNameActiveColumn = page.locator("//h4[text()='Active']/../../../div/following-sibling::div//div[@ref='centerContainer']/div/div/div/div[@col-id='name']/following-sibling::div[@col-id='petname']");
    //Calender locators
    this.startDate = page.locator("//input[@id='dateStart']");
    this.endDate = page.locator("//input[@id='dateEnd']")
    this.year = page.locator(".el-date-picker__header span").nth(0);
    this.month = page.locator(".el-date-picker__header span").nth(1);

    //Adoption History Elements
    this.adoptionHistoryBtn = page.locator("//div[contains(text(),'History')]");
    this.selectAdoptionHistory = page.locator("(//div[@role='tab'])[1]");
    this.selectFosterHistory = page.locator("(//div[@role='tab'])[2]");
    this.selectTrialHistory = page.locator("(//div[@role='tab'])[3]");
    this.selectReturnHistory = page.locator("(//div[@role='tab'])[4]");
    this.searchAdoptionHistory = page.locator("//input[@id='managerHistoryquickFilter']");
    this.backIcon = page.locator("//*[name()='svg' and @class='arrow-icon svg-inline--fa fa-arrow-left fa-w-14']");
  }



  async navigateToAdoptionRequests() {

    await this.adoptionModule.hover();
    await this.page.waitForTimeout(1000);
    await this.selectAdoptionModule.click();
    await this.page.waitForTimeout(1000);
    await this.requestbtn.click();
    await this.page.waitForTimeout(1000);
    await this.selectFosterActive.hover();
  }

  async clickAdoptionRequest(searchValue, givenPetName, givenCustomerName) {

    await this.selectAdoptionRequest.click();
    await this.page.waitForTimeout(2000);
    await this.search.fill(searchValue);
    await this.page.waitForTimeout(2000);

    await this.page.locator(`//div[text()='${givenCustomerName}']/following-sibling::div[text()='${givenPetName}']/following-sibling::div[@col-id='action']/div/div/div/div/button`).click();

    for (let i = 0; i < await this.getCustomerName.count(); i++) {
      const customerName = await this.getCustomerName.nth(i).textContent();

      for (let j = 0; j < await this.getPetName.count(); j++) {
        const petName = await this.getPetName.nth(j).textContent();

        if (customerName.includes(givenCustomerName) && petName.includes(givenPetName)) {
          await this.page.waitForTimeout(1000);
          await this.page.locator(`//div[@role='gridcell'][normalize-space()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div/div/div/button`).click();
        }
        else {
          return console.log("error");
        }

      }

    }
}

  async clickFosterRequest(searchValue, givenPetName, givenCustomerName) {

    await this.selectFosterRequest.click();
    await this.page.waitForTimeout(1000);
    await this.page.waitForTimeout(2000);
    await this.search.fill(searchValue);
    await this.page.waitForTimeout(2000);

    for (let i = 0; i < await this.getCustomerName.count(); i++) {
      const customerName = await this.getCustomerName.nth(i).textContent();

      for (let j = 0; j < await this.getPetName.count(); j++) {
        const petName = await this.getPetName.nth(j).textContent();

        if (customerName.includes(givenCustomerName) && petName.includes(givenPetName)) {
          await this.page.locator(`//div[@role='gridcell'][normalize-space()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div/div/div/button`).click();
        }
        else {
          return console.log("error");
        }


      }

    }
  }


  async clickTrialRequest(searchValue, givenPetName, givenCustomerName) {

    await this.selectTrialRequest.click();
    await this.page.waitForTimeout(1000);
    await this.page.waitForTimeout(2000);
    await this.search.fill(searchValue);
    await this.page.waitForTimeout(2000);

    for (let i = 0; i < await this.getCustomerName.count(); i++) {
      const customerName = await this.getCustomerName.nth(i).textContent();

      for (let j = 0; j < await this.getPetName.count(); j++) {
        const petName = await this.getPetName.nth(j).textContent();

        if (customerName.includes(givenCustomerName) && petName.includes(givenPetName)) {
          await this.page.locator(`//div[@role='gridcell'][normalize-space()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div/div/div/button`).click();
        }
        else {
          return console.log("error");
        }
      }

    }


  }
  async clickReturnRequest(searchValue, givenPetName, givenCustomerName) {

    await this.selectReturnRequest.click();
    await this.page.waitForTimeout(1000);
    await this.search.fill(searchValue);
    await this.page.waitForTimeout(2000);

    for (let i = 0; i < await this.getCustomerName.count(); i++) {
      const customerName = await this.getCustomerName.nth(i).textContent();

      for (let j = 0; j < await this.getPetName.count(); j++) {
        const petName = await this.getPetName.nth(j).textContent();

        if (customerName.includes(givenCustomerName) && petName.includes(givenPetName)) {
          await this.page.locator(`//div[@role='gridcell'][normalize-space()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div/div/div/button`).click();
        }
        else {
          return console.log("error");
        }
      }

    }


  }

  async clickFosterActive(searchValue, givenPetName, givenCustomerName) {

    await this.selectFosterActive.click();
    await this.page.waitForTimeout(1000);
    await this.activeSearch.fill(searchValue);
    await this.page.waitForTimeout(2000);

    for (let j = 0; j < await this.getPetNameActiveColumn.count(); j++) {
      const petName = await this.getPetNameActiveColumn.nth(j).textContent();

      if (petName.includes(givenPetName)) {
        await this.page.locator(`//h4[text()='Active']/../../../div/following-sibling::div//div[@ref='centerContainer']/div/div/div/div[text()='${givenCustomerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div//button`).click();

      }
      else {
        return console.log("error");
      }
    }

  }



  async clickTrialActive(searchValue, givenPetName, givenCustomerName) {

    await this.selectTrialActive.click();
    await this.page.waitForTimeout(2000);
    await this.activeSearch.fill(searchValue);
    await this.page.waitForTimeout(1000);

    for (let i = 0; i < await this.getPetNameActiveColumn.count(); i++) {
      const petName = await this.getPetNameActiveColumn.nth(i).textContent();

      if (petName.includes(givenPetName)) {
        await this.page.locator(`//h4[text()='Active']/../../../div/following-sibling::div//div[@ref='centerContainer']/div/div/div/div[text()='${givenCustomerName}']/following-sibling::div[text()='${petName}']/following-sibling::div[@col-id='action']/div/div//button`).click();
      }
      else {
        return console.log("error");
      }
    }

  }

  async clickRejectBtn(givenReason) {

    await this.rejectBtn.click();
    await this.page.waitForTimeout(3000);

    const reasons = this.page.locator("//div[@id='radio-group-1']/div/label/span");
    const count = await reasons.count();

    for (let k = 0; k < count; k++) {
      const reason = await reasons.nth(k).textContent();

      if (reason && reason.includes(givenReason)) {
        await reasons.nth(k).click();
        break;
      }
    }


  }

  async clickAcceptBtn() {
    await this.page.waitForTimeout(1000);
    await this.acceptBtn.click();

  }

  async clickConfirmationYes() {
    await this.confirmationMessageYes.click();

  }

  async clickConfirmationNo() {
    await this.confirmationMessageNo.click();


  }

  async clickCompleteBtn() {
    await this.completeBtn.click();
  }

  async pickCalenderStartDate(date, month, year) {

    await this.page.waitForTimeout(2000);
    const getYear = await this.year.textContent();
    const getMonth = await this.month.textContent();
    await this.page.waitForTimeout(2000);

    if (getYear.includes(year) && getMonth.includes(month)) {
      await this.page.locator(`//td[@class='available']/div/span[normalize-space()='${date}']`).click();
    }

  }

  async pickCalenderEndDate(date, month, year) {

    await this.page.waitForTimeout(2000);
    const getYear = await this.year.textContent();
    const getMonth = await this.month.textContent();
    await this.page.waitForTimeout(2000);

    if (getYear.includes(year) && getMonth.includes(month)) {
      await this.page.locator(`(//td[@class='available']/div/span[normalize-space()='${date}'])[2]`).click();
    }


  }


  //---------------------------------------Adoption History-------------------------------------------------------


  async navigateToAdoptionHistory() {

    await this.adoptionHistoryBtn.click();
    await this.page.waitForTimeout(1000);
    await this.selectReturnHistory.hover();
  }

  async clickAdoptionHistory(searchValue, givenCustomerName, givenPetName) {

    await this.page.waitForTimeout(2000);
    await this.searchAdoptionHistory.fill(searchValue);
    await this.page.waitForTimeout(2000);

    for (let i = 0; i < await this.getCustomerName.count(); i++) {
      const customerName = await this.getCustomerName.nth(i).textContent();

      for (let j = 0; j < await this.getPetName.count(); j++) {
        const petName = await this.getPetName.nth(j).textContent();

        if (customerName.includes(givenCustomerName) && petName.includes(givenPetName)) {
          await this.page.locator(`//div[@class='pt-0 col-12']//div[@ref='eBodyViewport']//div[text()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div//button`).click();
          await this.page.waitForTimeout(2000);
          await this.backIcon.click();
          await this.page.waitForTimeout(2000);
          const getStatusMessage = await this.page.locator(`//div[@class='pt-0 col-12']//div[@ref='eBodyViewport']//div[text()='${customerName}']/following-sibling::div[text()='${petName}']/following-sibling::div//span`).textContent();
          return getStatusMessage;
        }
        else {
          return console.log("error");
        }
      }

    }



  }


}

module.exports = { AdoptionPage };