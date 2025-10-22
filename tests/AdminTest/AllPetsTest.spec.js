const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { AllPetsPage } = require('../../POM_AdminPages/AllPetsPage');

let page;
let context;


test.describe('TS05 - Service Category', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext({ viewport: { width: 1366, height: 580 } });
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const url = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(url[0].URL);
        await page.waitForTimeout(2000);
    })

    test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const LoginDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = LoginDataset[0];
        await page.waitForTimeout(2000);
        await loginPage.login(UserName, Password);

    })

    test('TC002 - Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to pet species ', async () => {
        const allPetsPage = new AllPetsPage(page);
        await allPetsPage.navigateToAllPets();
        await page.waitForTimeout(1000);
    })

    test('TC004 - Navigate to All module ', async () => {
        const allPetsPage = new AllPetsPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const Allpetsdata = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'AllPets Test');

        const tab = (Allpetsdata[0].tabName);

        const noOfPetCount = await allPetsPage.selectTab(tab);
        console.log(noOfPetCount);
        await page.waitForTimeout(1000);
        //from excel
        const searchPet = (Allpetsdata[0].petSearch);

        await allPetsPage.searchValue(searchPet);
        const petDetails = await allPetsPage.printPetDetails(searchPet);
        console.log(petDetails);
    })

    test('TC005 - Navigate to All adopted ', async () => {
        const allPetsPage = new AllPetsPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const Allpetsdata = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'AllPets Test');

        const tab = (Allpetsdata[1].tabName);
        const noOfPetCount = await allPetsPage.selectTab(tab);
        console.log(noOfPetCount);
        await page.waitForTimeout(1000);
        //from excel
        const searchPet = (Allpetsdata[1].petSearch);
        await allPetsPage.searchValue(searchPet);
        const petDetails = await allPetsPage.printPetDetails(searchPet);
        console.log(petDetails);
    })

    test('TC006 - Navigate to All unadopted ', async () => {
        const allPetsPage = new AllPetsPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const Allpetsdata = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'AllPets Test');

        const tab = (Allpetsdata[2].tabName);
        const noOfPetCount = await allPetsPage.selectTab(tab);
        console.log(noOfPetCount);
        await page.waitForTimeout(1000);
        //from excel
        const searchPet = (Allpetsdata[2].petSearch);
        await allPetsPage.searchValue(searchPet);
        const petDetails = await allPetsPage.printPetDetails(searchPet);
        console.log(petDetails);
    })

    test('TC007 - Navigate to All stray ', async () => {
        const allPetsPage = new AllPetsPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const Allpetsdata = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'AllPets Test');

        const tab = (Allpetsdata[3].tabName);

        const noOfPetCount = await allPetsPage.selectTab(tab);
        console.log(noOfPetCount);
        await page.waitForTimeout(1000);
        //from excel
        const searchPet = (Allpetsdata[3].petSearch);
        await allPetsPage.searchValue(searchPet);

        const petDetails = await allPetsPage.printPetDetails(searchPet);
        console.log(petDetails);
    })

    test('TC008 - Navigate to All Inactive ', async () => {
        const allPetsPage = new AllPetsPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const Allpetsdata = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'AllPets Test');

        const tab = (Allpetsdata[4].tabName);

        const noOfPetCount = await allPetsPage.selectTab(tab);
        console.log(noOfPetCount);
        await page.waitForTimeout(1000);
         //from excel
        const searchPet = (Allpetsdata[4].petSearch);
        await allPetsPage.searchValue(searchPet);
       
        const petDetails = await allPetsPage.printPetDetails(searchPet);
        console.log(petDetails);
    })


})