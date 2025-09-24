const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ScrapPage } = require('../../POM_AdminPages/ScrapPage');


let page;
let context;


test.describe('TS03 - Scrap', () => {


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

    test('TC003 - Navigate to scrap module', async () => {
        const scrapPage = new ScrapPage(page);
        await scrapPage.navigateToScrapModule();
        await page.waitForTimeout(2000);
    })


    test('TC005 - add scrap', async () => {
        const scrapPage = new ScrapPage(page);
        await scrapPage.clickAddScrapBtn();
        await scrapPage.addScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
        await scrapPage.clickclearBtn();
        await page.waitForTimeout(2000);
        await scrapPage.addScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
        await scrapPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit good issue', async () => {
        const scrapPage = new ScrapPage(page);
        await scrapPage.clickEditIcon('Simparica', 'sim');
        await page.waitForTimeout(2000);
        await scrapPage.editScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
        await page.waitForTimeout(2000);
        await scrapPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC008 - submit good issue', async () => {
         const scrapPage = new ScrapPage(page);
        await scrapPage.clickSubmitBtn();
        await scrapPage.clickCloseIcon();
        await scrapPage.clickSubmitBtn();
        await scrapPage.clickConfirmationNo();
        await scrapPage.clickSubmitBtn();
        await scrapPage.clickConfirmationYes();
        const toast = await scrapPage.getToastMessage.textContent();
        await expect(toast).toBe("Scrap created successfully");
        await page.waitForTimeout(2000);

    })


    test('TC009 - search scrap ', async () => {
         const scrapPage = new ScrapPage(page);
        await scrapPage.searchValue('402');
        await page.waitForTimeout(1000);
        await scrapPage.clickViewIcon('402');
        await page.waitForTimeout(2000);
        await scrapPage.clickBackBtn();
    })






})