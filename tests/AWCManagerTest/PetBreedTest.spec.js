const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { PetBreedPage } = require('../../POM_AdminPages/PetBreedPage');

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
        await usersPage.selectUserRoleOption('AWC Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to pet breed ', async () => {
        const petBreedPage = new PetBreedPage(page);
        await petBreedPage.navigateToPetBreed();
        await page.waitForTimeout(1000);
    })

    test('TC004 - select species', async () => {
        const petBreedPage = new PetBreedPage(page);
        const speciesCount = await petBreedPage.selectSpecies('Iguana');
        console.log('Total Species Count:' + speciesCount);
        await page.waitForTimeout(1000);
    })

    // test('TC004 - Add pet breed', async () => {
    //     const petBreedPage = new PetBreedPage(page);
    //     await petBreedPage.ClickAddPetBreedBtn();
    //     await petBreedPage.clickBackBtn();
    //     await petBreedPage.ClickAddPetBreedBtn();
    //     await petBreedPage.addPetBreedDetails('RedIguana', 'Test functionality using automation');
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickSubmitBtn();
    //     await petBreedPage.clickCloseIcon();
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickSubmitBtn();
    //     await petBreedPage.clickConfirmationNo();
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickSubmitBtn();
    //     await petBreedPage.clickConfirmationYes();
    //     const toast = await petBreedPage.validateToastMessage()
    //     await expect(toast).toBe('Pet breed created successfully')
    //     await page.waitForTimeout(1000);
    // })

    // test('TC005 - Cancel add pet breed ', async () => {
    //     const petBreedPage = new PetBreedPage(page);
    //     await petBreedPage.ClickAddPetBreedBtn();
    //     await petBreedPage.addPetBreedDetails('greenIguana', 'Test functionality using automation');
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickCancelBtn();
    //     await petBreedPage.clickCloseIcon();
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickCancelBtn();
    //     await petBreedPage.clickConfirmationNo();
    //     await page.waitForTimeout(1000);
    //     await petBreedPage.clickCancelBtn();
    //     await petBreedPage.clickConfirmationYes();
    // })

    test('TC006 - edit Pet Species ', async () => {
         const petBreedPage = new PetBreedPage(page);
        await petBreedPage.searchValue('RedIguana')
        await petBreedPage.clickEditBtn('RedIguana');
        await petBreedPage.editPetBreedDetails('Green Iguana','Test new functionality using automation');
        await page.waitForTimeout(1000);
        await petBreedPage.clickSubmitBtn();
        await petBreedPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await petBreedPage.clickSubmitBtn();
        await petBreedPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await petBreedPage.clickSubmitBtn();
        await petBreedPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast = await petBreedPage.validateToastMessage()
        await expect(toast).toBe('Pet breed updated successfully')
        await page.waitForTimeout(2000);
    })

    test('TC008 - view pet species', async () => {
        const petBreedPage = new PetBreedPage(page);
        await petBreedPage.searchValue('Green Iguana');
        await page.waitForTimeout(1000);
        await petBreedPage.clickViewBtn('Green Iguana');
        await page.waitForTimeout(1000);
        await petBreedPage.clickBackBtn();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete pet species', async () => {
        const petBreedPage = new PetBreedPage(page);
        await petBreedPage.searchValue('Green Iguana');
        await page.waitForTimeout(1000);
        await petBreedPage.clickDeleteBtn('Green Iguana');
        await petBreedPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast = await petBreedPage.validateToastMessage();
        if (toast === 'Pet species deleted successfully') {
            console.log(toast);

        } else {
            console.log(await petBreedPage.getToastMessage.textContent());

        }

        await page.waitForTimeout(2000);
    })



})