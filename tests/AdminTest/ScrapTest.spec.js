const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ScrapPage } = require('../../POM_AdminPages/ScrapPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS03 - Scrap', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext(); //{ viewport: { width: 1366, height: 580 } }
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const url = await excelReader.readExcel(pathone, 'URL');
        await loginPage.gotoLoginPage(url[0].URL);
        await page.waitForTimeout(2000);
    })

    test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const LoginDataset = await excelReader.readExcel(pathone, 'LoginTest');
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

        //from excel
        const excelReader = new ExcelReader();
        const ScrapTestdata = await excelReader.readExcel(pathone, 'ScrapTest');
        const { location, material, batch, quantity, reason } = ScrapTestdata[0];

        await scrapPage.addScrapDetails(location, material, batch, quantity, reason);
        // await scrapPage.addScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
        await scrapPage.clickclearBtn();
        await page.waitForTimeout(2000);
        await scrapPage.addScrapDetails(location, material, batch, quantity, reason);
        // await scrapPage.addScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
        await scrapPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit good issue', async () => {
        const scrapPage = new ScrapPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ScrapTestdata = await excelReader.readExcel(pathone, 'ScrapTest');
        const { location, material, batch, quantity, reason } = ScrapTestdata[0];


        await scrapPage.clickEditIcon(material, batch);      //Simparica', 'sim
        await page.waitForTimeout(2000);

        await scrapPage.editScrapDetails(location, material, batch, quantity, reason);
        // await scrapPage.editScrapDetails('Clinic Store', 'Simparica', 'sim', '1', 'Damaged');
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

        //from excel
        const excelReader = new ExcelReader();
        const ScrapTestdata = await excelReader.readExcel(pathone, 'ScrapTest');
        const { toastmessage } = ScrapTestdata[0];

        const toast = await scrapPage.getToastMessage.textContent();
        await expect(toast).toBe(toastmessage);
        // await expect(toast).toBe("Scrap created successfully");
        await page.waitForTimeout(2000);

    })


    test('TC009 - search scrap ', async () => {
        const scrapPage = new ScrapPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ScrapTestdata = await excelReader.readExcel(pathone, 'ScrapTest');
        const { scrapid } = ScrapTestdata[0];

        await scrapPage.searchValue(scrapid);     //402
        await page.waitForTimeout(1000);
        await scrapPage.clickViewIcon(scrapid);   //402
        await page.waitForTimeout(2000);
        await scrapPage.clickBackBtn();
    })






})