const { expect } = require('@playwright/test');

class DashboardPage {

    constructor(page) {

        this.page = page;

        //Navigate to Project Master Module
        this.DashboardModule = page.locator(".v-navigation-drawer__content");
        this.selectDashboardModule = page.locator("//div[@class='v-list-item__title font-weight-bold'][normalize-space()='Dashboard']");
        this.selectDashboard = page.locator("//div[contains(text(),'Dashboard')]/../..");

        //Dashboard

        //Income
        this.getIncomeText = page.locator("//div[@class='col-6']/h5/b[text()='Income']");
        this.todayBtn = page.locator("button[class='btn btn-secondary active-btn payment-btn btn-one']");
        this.weekBtn = page.locator("button[class='btn btn-secondary payment-btn btn-three']");

        this.total = page.locator("//div[@class='rate-label']/b").nth(0);
        this.getTotalPrice = page.locator("//b[text()='Total']/../following-sibling::div");

        this.shop = page.locator("//div[@class='rate-label']/b").nth(1);
        this.getShopPrice = page.locator("//b[contains(text(),'Shop')]/../following-sibling::div");

        this.outPatient = page.locator("//div[@class='rate-label']/b").nth(2);
        this.getOPPrice = page.locator("//b[contains(text(),'Out')]/../following-sibling::div");

        this.inPatient = page.locator("//div[@class='rate-label']/b").nth(3);
        this.getIPPrice = page.locator("//b[contains(text(),'Inp')]/../following-sibling::div");

        this.surrender = page.locator("//div[@class='rate-label']/b").nth(4);
        this.getSurrenderPrice = page.locator("//b[text()='Surrender']/../following-sibling::div");

        this.adoption = page.locator("//div[@class='rate-label']/b").nth(5);
        this.getAdoptionPrice = page.locator("//b[text()='Adoption']/../following-sibling::div");

        this.getTopServiceAndMaterialText = page.locator("//h5[@class='mt-2 mb-0']/b").nth(0);
        this.getTopServiceAndMaterial = page.locator("//tbody[@role='rowgroup']/tr/td");

        //Pet
        this.noOfAdoption = page.locator("//div[@class='rate-label']/b").nth(6);
        this.totalAdoptionPet = page.locator("//b[text()='No of Adoptions']/../following-sibling::div");

        this.noOfSurrender = page.locator("//div[@class='rate-label']/b").nth(7);
        this.totalSurrenderPet = page.locator("//b[text()='No of Surrenders']/../following-sibling::div");

        this.noOfStrays = page.locator("//div[@class='rate-label']/b").nth(8);
        this.totalStrayPet = page.locator("//b[text()='No of Strays']/../following-sibling::div");

        this.euthanasiaCount = page.locator("//div[@class='rate-label']/b").nth(9);
        this.totalEuthanasiaCount = page.locator("//b[text()='Euthanasia Count']/../following-sibling::div");

        this.getSpecies = page.locator("#apexchartsgr3mwnhzh g[seriesName]");
        this.getSpeciesCount = page.locator("#apexchartsgr3mwnhzh g[seriesName] path");
        this.getOverallFacilityText = page.locator("//div[@id='overall-pet']//*[name()='svg'][@id='SvgjsSvg316887']/*[name()='text']");

        //Pets
        this.getPetText = page.locator(".col-12>h5>b").nth(0);

        this.noOfPetsInBirds = page.locator("//div[@class='rate-label']/b").nth(10);
        this.getBirdsPetCount = page.locator("//b[text()='Birds']/../following-sibling::div");

        this.noOfPetsInCat = page.locator("//div[@class='rate-label']/b").nth(11);
        this.getCatPetCount = page.locator("//b[text()='Cat']/../following-sibling::div");

        this.noOfPetsInCow = page.locator("//div[@class='rate-label']/b").nth(12);
        this.getCowPetCount = page.locator("//b[text()='Cow']/../following-sibling::div");

        this.noOfPetsInDog = page.locator("//div[@class='rate-label']/b").nth(13);
        this.getDogPetCount = page.locator("//b[text()='Dog']/../following-sibling::div");

        this.noOfPetsInFox = page.locator("//div[@class='rate-label']/b").nth(14);
        this.getFoxPetCount = page.locator("//b[text()='Fox']/../following-sibling::div");

        this.noOfPetsInGoat = page.locator("//div[@class='rate-label']/b").nth(15);
        this.getGoatPetCount = page.locator("//b[text()='Goat']/../following-sibling::div");

        this.noOfPetsInTestSpecies = page.locator("//div[@class='rate-label']/b").nth(16);
        this.getTestSpeciesPetCount = page.locator("//b[text()='Testspecies']/../following-sibling::div");

        this.switchPets = page.locator("//div[@class='pet-flex']//div[@id='data-card']/div");

        //Invoice
        this.getInvoiceText = page.locator("//b[text()='Invoice']");

        //Appointment
        this.getAppointmentText = page.locator("//b[text()='Invoice']");
        this.opMenuBtn = page.locator(".apexcharts-menu-icon").nth(1);
        this.ipMenuBtn = page.locator(".apexcharts-menu-icon").nth(2);

        //TaskManagement
        this.getTaskManagementText = page.locator("//b[text()='Task Management']");

        //Consumption in AWC Area Wise
        this.getConsumptionInAreaWiseText = page.locator("//b[text()='Consumption in AWC Area Wise']");
        this.awcConsumptionMenuBtn = page.locator(".apexcharts-menu-icon").nth(3);
        this.allSpecies = page.locator("//div[@class='v-slide-group__content v-tabs-bar__content']/div[@role='tab']");

        //Goods Received
        this.getGoodsReceivedText = page.locator("//b[text()='Goods Received']");

        //Goods Issue
        this.getGoodsIssueText = page.locator("//b[text()='Goods Issue']");

        //GRN Line Materials
        this.getGRNText = page.locator("//b[text()='GRN Line Materials']");

        //Consumption in OP/IP
        this.getConsumptionInOPorIPText = page.locator("//b[text()='Consumption in OP/IP']");

        //Consumption in AWC
        this.getConsumptionInAWC = page.locator("//b[text()='Consumption in AWC']");

        //Top 5 materials consumed by count
        this.getTopMaterialConsumedByCount = page.locator("//b[text()='Top 5 Materials Consumed by Count']");

        //Top 5 materials consumed by price
        this.getTopMaterialConsumedByPrice = page.locator("//b[text()='Top 5 Materials Consumed by Price']");

        //Onboarding
        this.getOnboardingText = page.locator("//b[text()='Onboarding']");
        this.userOnboardMenuBtn = page.locator(".apexcharts-menu-icon").nth(4);
        this.PetOnboardMenuBtn = page.locator(".apexcharts-menu-icon").nth(5);
        this.userOnboardCalender = page.locator(".el-input__inner").nth(0);
        this.clickYear = page.locator("//a[text()='2024']");
        this.petOnboardCalender = page.locator(".el-input__inner").nth(1);

        //Stray & Surrender Entry
        this.getStraySurrenderEntryText = page.locator("//b[text()='Stray & Surrender Entry']");
        this.straySurrenderMenuBtn = page.locator(".apexcharts-.apexcharts-toolbar>div[class='apexcharts-menu-icon']").nth(6);
        this.straySurrenderCalender = page.locator(".el-input__inner").nth(2);
        this.clickYear = page.locator("//a[text()='2024']");


    }

    async navigateToDashboard() {

        await this.DashboardModule.hover();
        await this.page.waitForTimeout(1000);
        await this.selectDashboard.click();
        await this.page.waitForTimeout(1000);
        await this.weekBtn.hover();

    }

    async clickTodayBtn() {

        await this.todayBtn.hover();
        await this.page.waitForTimeout(1000);
        await this.todayBtn.click();

    }

    async clickWeekBtn() {

        await this.weekBtn.hover();
        await this.page.waitForTimeout(1000);
        await this.weekBtn.click();

    }



    async getIncomeDetails() {
        const getHeaderText = await this.getIncomeText.textContent();
        await this.page.waitForTimeout(1000);
        const getTotalText = await this.total.textContent();
        const getTotalPrice = await this.getTotalPrice.textContent();
        await this.page.waitForTimeout(1000);
        const getShopText = await this.shop.textContent();
        const getShopPrice = await this.getShopPrice.textContent();
        await this.page.waitForTimeout(1000);
        const getOPText = await this.outPatient.textContent();
        const getOPPrice = await this.getOPPrice.textContent();
        await this.page.waitForTimeout(1000);
        const getIPText = await this.inPatient.textContent();
        const getIPPrice = await this.getIPPrice.textContent();
        await this.page.waitForTimeout(1000);
        const getSurrenderText = await this.surrender.textContent();
        const getSurrenderPrice = await this.getSurrenderPrice.textContent();
        await this.page.waitForTimeout(1000);
        const getAdoptionText = await this.adoption.textContent();
        const getAdoptionPrice = await this.getAdoptionPrice.textContent();
        await this.page.waitForTimeout(1000);
        return { getHeaderText, getTotalText, getTotalPrice, getShopText, getShopPrice, getOPText, getOPPrice, getIPText, getIPPrice, getSurrenderText, getSurrenderPrice, getAdoptionText, getAdoptionPrice };

    }

    async getTopServiceAndMaterials() {
        const getHeaderText = await this.getTopServiceAndMaterialText.textContent();
        await this.page.waitForTimeout(1000);
        const getCount = await this.getTopServiceAndMaterial.count();
        const value = [];
        for (let i = 0; i < getCount; i++) {
            const getText = await this.getTopServiceAndMaterial.nth(i).textContent();
            value.push(getText);
        }
        return { getHeaderText, value };

    }

    async getAdoptionDetails() {
        const getHeaderText = await this.page.locator("//b[text()='Pet']").textContent();

        const getNoOfAdoption = await this.noOfAdoption.textContent();
        const getTotalAdoptionPet = await this.totalAdoptionPet.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfSurrender = await this.noOfSurrender.textContent();
        const getTotalSurrenderPet = await this.totalSurrenderPet.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfStrays = await this.noOfStrays.textContent();
        const getTotalStraysPet = await this.totalStrayPet.textContent();
        await this.page.waitForTimeout(1000);
        const getEuthanasiaCount = await this.euthanasiaCount.textContent();
        const getEuthanasiaPet = await this.totalEuthanasiaCount.textContent();

        return { getHeaderText, getNoOfAdoption, getTotalAdoptionPet, getNoOfSurrender, getTotalSurrenderPet, getNoOfStrays, getTotalStraysPet, getEuthanasiaCount, getEuthanasiaPet };

    }

    async getPetDetails() {
        const getSubHeaderText = await this.getOverallFacilityText.textContent();
        await this.page.waitForTimeout(1000);
        const getSpeciesName = await this.getSpecies.count();
        const speciesName = [];

        for (let i = 0; i < getSpeciesName; i++) {
            const getSpeciesText = await this.getSpecies.nth(i).getAttribute('seriesName');
            const getCountText = await this.getSpeciesCount.nth(i).getAttribute('data:value');
            speciesName.push(getSpeciesText, getCountText);
        }

        return { getSubHeaderText, speciesName };

    }

    async getNoOfPetsDetails() {
        const getHeaderText = await this.getPetText.textContent();
        await this.page.waitForTimeout(1000);


        const getNoOfBirds = await this.noOfPetsInBirds.textContent();
        const getTotalAPetInBirds = await this.getBirdsPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfCat = await this.noOfPetsInCat.textContent();
        const getTotalPetInCat = await this.getCatPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfCow = await this.noOfPetsInCow.textContent();
        const getTotalPetInCow = await this.getCowPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfDog = await this.noOfPetsInDog.textContent();
        const getTotalPetInDog = await this.getDogPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfFox = await this.noOfPetsInFox.textContent();
        const getTotalPetInFox = await this.getFoxPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfGoat = await this.noOfPetsInGoat.textContent();
        const getTotalPetInGoat = await this.getGoatPetCount.textContent();
        await this.page.waitForTimeout(1000);
        const getNoOfTestSpecies = await this.noOfPetsInTestSpecies.textContent();
        const getTotalPetInTestSpecies = await this.getTestSpeciesPetCount.textContent();

        const count = await this.switchPets.count();


        for (let i = 0; i < count; i++) {
            await this.switchPets.nth(i).click();
            await this.page.waitForTimeout(2000);
        }

        return {
            getHeaderText,
            getNoOfBirds,
            getTotalAPetInBirds,
            getNoOfCat,
            getTotalPetInCat,
            getNoOfCow,
            getTotalPetInCow,
            getNoOfDog,
            getTotalPetInDog,
            getNoOfFox,
            getTotalPetInFox,
            getNoOfGoat,
            getTotalPetInGoat,
            getNoOfTestSpecies,
            getTotalPetInTestSpecies

        };

    }

    
    async getInvoiceDetails() {
        await this.getInvoiceText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
       
    }
    
    async getAppointmentDetails() {
        await this.getAppointmentText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.opMenuBtn.click();
        await this.page.waitForTimeout(1000);
        await this.ipMenuBtn.click();
       
    }
    
    async getTaskManagementDetails() {
        await this.getTaskManagementText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

     async getConsumptionInAwcAreaWiseDetails() {
        await this.getConsumptionInAreaWiseText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
       const count= await this.allSpecies.count();
        for(let i=0; i<count; i++){
            await this.allSpecies.nth(i).click();
             await this.page.waitForTimeout(2000);
        }
        await this.page.waitForTimeout(1000);
        await this.awcConsumptionMenuBtn.click();
       
       
    }

     async getGoodsReceivedDetails() {
        await this.getGoodsReceivedText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

     async getGoodsIssueDetails() {
        await this.getGoodsIssueText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

     async getConsumptionInOporIpDetails() {
        await this.getConsumptionInOPorIPText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

     async getTop5MaterialsConsumedByCountDetails() {
        await this.getTopMaterialConsumedByCount.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

     async getOnboardingDetails() {
        await this.getOnboardingText.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.userOnboardMenuBtn.click();
        await this.page.waitForTimeout(1000);
        await this.userOnboardCalender.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("//a[text()='2024']").click();
        await this.PetOnboardMenuBtn.click();
        //await this.petOnboardCalender.click();
        //await this.page.locator("//a[text()='2025']").nth(1).click();



    }

      async getStraySurrenderDetails() {
        await this.getStraySurrenderEntryText.scrollIntoViewIfNeeded();
        await this.straySurrenderMenuBtn.click();
        await this.page.locator("//a[text()='2024']").nth(2).click();
      }





}
module.exports = { DashboardPage };