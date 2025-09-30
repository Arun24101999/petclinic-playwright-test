const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { PetSpeciesPage } = require('../../POM_AdminPages/PetSpeciesPage');

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
        const petSpeciesPage = new PetSpeciesPage(page);
        await petSpeciesPage.navigateToPetSpecies();
        await page.waitForTimeout(1000);
    })

    test('TC004 - Add pet species', async () => {
        const petSpeciesPage = new PetSpeciesPage(page);
        await petSpeciesPage.ClickAddPetSpeciesBtn();
        await petSpeciesPage.clickBackBtn();
        await petSpeciesPage.ClickAddPetSpeciesBtn();
        await petSpeciesPage.addPetSpeciesDetails('Iguana', 'Test functionality using automation');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickConfirmationYes();
        const toast=await petSpeciesPage.validateToastMessage()
        await expect(toast).toBe('Pet species created successfully')
        await page.waitForTimeout(1000);
    })

    test('TC005 - Cancel add pet species', async () => {
        const petSpeciesPage = new PetSpeciesPage(page);;
        await petSpeciesPage.ClickAddPetSpeciesBtn();
        await page.waitForTimeout(1000);
        await petSpeciesPage.addPetSpeciesDetails('testtwo', 'Testtwo functionality using automation');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickCancelBtn();
        await petSpeciesPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickCancelBtn();
        await petSpeciesPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickCancelBtn();
        await petSpeciesPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
    })

    test('TC006 - edit Pet Species ', async () => {
         const petSpeciesPage = new PetSpeciesPage(page);
         await petSpeciesPage.searchValue('Iguana')
        await petSpeciesPage.clickEditBtn('Iguana');
        await petSpeciesPage.editPetSpeciesDetails( 'Test new functionality using automation');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickSubmitBtn();
        await petSpeciesPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast=await petSpeciesPage.validateToastMessage()
        await expect(toast).toBe('Pet species updated successfully')
        await page.waitForTimeout(2000);
    })

    test('TC008 - view pet species', async () => {
        const petSpeciesPage = new PetSpeciesPage(page);
        await petSpeciesPage.searchValue('Iguana');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickViewBtn('Iguana');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickBackBtn();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete pet species', async () => {
       const petSpeciesPage = new PetSpeciesPage(page);
        await petSpeciesPage.searchValue('Iguana');
        await page.waitForTimeout(1000);
        await petSpeciesPage.clickDeleteBtn('Iguana');
        await petSpeciesPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast= await petSpeciesPage.validateToastMessage();
        if(toast==='Pet species deleted successfully'){
            console.log(toast);

        }else{
            console.log(await petSpeciesPage.getToastMessage.textContent());

        }

        await page.waitForTimeout(2000);
    })



})