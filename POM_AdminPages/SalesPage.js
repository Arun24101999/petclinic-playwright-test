const { expect } = require('@playwright/test');

class SalesPage {

    constructor(page) {

        this.page = page;

        //Navigate to Material Category Module
        this.materialModule = page.locator(".v-navigation-drawer__content");
        this.selectMaterialModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Material']");
        this.selectSales = page.locator("//div[text()='Sales']/../..");

        //Dashboard
        this.search=page.locator("#pharmacyhistoryFilter");
        this.downloadBtn=page.locator("button[class='btn btn-primary']");
        this.calenderField=page.locator("//input[@id='datepicker__e5s8kytau']");
       // this.viewBtn=//div[@id='order-status-rendered']/.././following-sibling::div//button

       this.allTab=page.locator("//div[contains(text(),'All')]");
       this.opTab=page.locator("//div[contains(text(),'OP')]");
       this.ipTab=page.locator("//div[contains(text(),'IP')]");
       this.surrenderTab=page.locator("//div[contains(text(),'Surrender')]");
       this.adoptionTab=page.locator("//div[contains(text(),'Adoption') and @role='tab']");
       this.shopTab=page.locator("//div[contains(text(),'Shop') and @role='tab']");
       
       this.backBtn=page.locator("//button[@class='btn cancelbtn-color btn-secondary']");
    }


    async navigateToSales() {
         await this.materialModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectMaterialModule.click();
        await this.page.waitForTimeout(2000);
         await this.selectSales.click();
        await this.downloadBtn.hover();

    }

    async clickAllTab(){
        await this.allTab.click();
    }

    async clickOpTab(){
        await this.opTab.click();
    }

    async clickIpTab(){
        await this.ipTab.click();
    }

    async clickSurrenderTab(){
        await this.surrenderTab.click();
    }

    async clickShopTab(){
        await this.shopTab.click();
    }

    async clickAdoptionTab(){
          await this.page.waitForTimeout(2000);
        await this.adoptionTab.click();
    }

    async searchValue(search){
        await this.search.fill(search);
        await this.page.waitForTimeout(1000);
    }

    async clickViewBtn(orderId){
        await this.page.locator(`//b[contains(text(),'${orderId}')]/../../.././following-sibling::div//button`).click();
        await this.page.waitForTimeout(1000);
    }

    async getMedicineDetails(){

        const ele=await this.page.locator('//div[@col-id="product" and @role="gridcell"]');
        const count1=await ele.count();
        const medicine=[];
        for(let i=0; i<count1; i++){
            const getMedicineValue=await ele.nth(i).textContent();
            medicine.push(getMedicineValue);
        }
        return medicine;
    }

        async getAmountDetails(){
        
        const ele2=await this.page.locator("(//div[@class='bottom-total'])[2]//div[@class='bill-grid-total']/div/p");
        const count2=await ele2.count();
        const amount=[];
         for(let j=0; j<count2; j++){
            const getAmountValue=await ele2.nth(j).textContent();
            amount.push(getAmountValue);
        }
         return amount ;

    
    }

    async clickBackBtn(){
        await this.backBtn.click();
    }




} module.exports = { SalesPage };


