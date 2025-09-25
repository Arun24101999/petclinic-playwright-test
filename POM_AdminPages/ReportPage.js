const {expect}=require('@playwright/test');

class ReportPage{

    constructor(page){

        this.page=page;

        
        //Navigate to report Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectReport = page.locator("//div[text()='Reports']/../..");
        

        //Dashboard

        this.downloadBtn=page.locator("//button[@title='Download']");
        this.startDate=page.locator("#startDate");
        this.endDate=page.locator("#endDate");
        this.reportType=page.locator("#reportType");
        this.submitBtn=page.locator("button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");

        //Calender
        this.previousYearBtn=page.locator("//div[@class='el-date-picker__header']//button[@aria-label='Previous Year']");
        this.month=page.locator(".el-date-picker__header>span~span");
        this.year=page.locator(".el-date-picker__header span").nth(0);


        //filters

        //Adoption, stray, surrender and pet onboarding details
        this.serialNo=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='SI.NO Filter Input']");
        this.petId=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Pet ID Filter Input']");
        this.petName=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Name Filter Input']");
        this.category=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Category Filter Input']");
        this.breed=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Breed Filter Input']");
        this.dob=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='DOB Filter Input']");
        this.gender=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Gender Filter Input']");

        //Purchase Details
        this.purchaseOrderNo=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Purchase Order No Filter Input']");
        this.supplierName=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Supplier Name Filter Input']");
        this.date=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Date Filter Input']");
        this.itemCount=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Item Count Filter Input']");
        this.vat=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='VAT Filter Input']");
        this.taxTotal=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Tax Total Filter Input']");

        //Sales Details
        this.orderNo=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Tax Total Filter Input']");
        this.customerName=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Tax Total Filter Input']");
        this.noOfItems=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Tax Total Filter Input']");
        
        //Scrap details
        this.orderNo=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Scrap Order No Filter Input']");
        this.productName=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Product Name Filter Input']");
        this.batch=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Batch Filter Input']");
        this.quantity=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Quantity Filter Input']");
        this.price=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Price Filter Input']");

        //user last activity
        this.userId=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='User ID Filter Input']");
        this.name=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Name Filter Input]");
        this.mobileNo=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Mobilenumber Filter Input']");
        this.email=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Email Filter Input']");
        this.emiratesId=page.locator("//div[@class='ag-wrapper ag-input-wrapper ag-text-field-input-wrapper']/input[@aria-label='Emirates ID Filter Input']");


    }

    async naviagteToReports() {

        await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(1000);
        await this.selectReport.click();
        await this.page.waitForTimeout(2000);
        await this.downloadBtn.hover();

    }


    async selectReportType(reportType) {

        await this.reportType.selectOption({label : reportType})

    }

    async pickStartDate(date, month, year) {

    await this.startDate.click();
    await this.page.waitForTimeout(2000);
    const getYear = await this.year.textContent();

    if (getYear != year) {

      for (let i = getYear; i > year; i--) {
        await this.previousYearBtn.click();
      }

      await this.page.locator(".el-date-picker__header>span~span").click();
      await this.page.waitForTimeout(2000);
      await this.page.locator(`//a[text()='${month}']`).click();

      const getMonth = await this.page.locator(".el-date-picker__header>span~span").textContent();
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



   async pickEndDate(date, month, year) {

    await this.endDate.click();
    await this.page.waitForTimeout(2000);
    const getYear = await this.year.textContent();

    if (getYear != year) {

      for (let i = getYear; i > year; i--) {
        await this.previousYearBtn.click();
      }

      await this.page.locator(".el-date-picker__header>span~span").nth(3).click();
      await this.page.waitForTimeout(2000);
      await this.page.locator(`//a[text()='${month}']`).click();

      const getMonth = await this.page.locator(".el-date-picker__header>span~span").nth(1).textContent();
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


  async clickSubmitBtn(){
    await this.submitBtn.click();
  }

  async getText(petId){
    const text=await this.page.locator(`//div[text()='${petId}' and @col-id='pet_id']/following-sibling::div[@col-id='pet_name']`).textContent();
    return text;
  }






}
module.exports={ReportPage};