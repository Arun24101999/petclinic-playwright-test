const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { GoodTransferPage } = require('../../POM_AdminPages/GoodTransferPage');


let page;
let context;


test.describe('TS03 - Good Transfer', () => {


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
        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.navigateToGoodsTransfer();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add goods transfer', async () => {

        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.clickAddGoodsTransferBtn();
        await goodTransferPage.addGoodsTransferDetails('Clinic Store', 'Main & Food Store','15','Simparica', 'sim', '1');
        await goodTransferPage.clickclearBtn();
        await page.waitForTimeout(2000);
        await goodTransferPage.addGoodsTransferDetails('Clinic Store', 'Main & Food Store','15','Simparica', 'sim', '1');
        await goodTransferPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC005 - edit good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.clickEditIcon('Simparica', 'sim');
        await page.waitForTimeout(2000);
        await goodTransferPage.editGoodsTransferDetails('Clinic Store', 'Main & Food Store','15','Simparica', 'sim', '1');
        await page.waitForTimeout(2000);
        await goodTransferPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - submit good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.clickSubmitBtn();
        const toast = await goodTransferPage.getToastMessage.textContent();
        await expect(toast).toBe("Goods transferred successfully");
        await page.waitForTimeout(2000);

    })

    test('TC007 - cancel good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.clickAddGoodsTransferBtn();
        await goodTransferPage.addGoodsTransferDetails('Clinic Store', 'Main & Food Store','15','Simparica', 'sim', '1');
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickCloseIcon();
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickConfirmationNo();
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickConfirmationYes();
        await page.waitForTimeout(2000);

    })


    test('TC008 - search scrap ', async () => {
       const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.searchValue('52');
        await page.waitForTimeout(1000);
        await goodTransferPage.clickViewIcon('52');
        await page.waitForTimeout(2000);
        await goodTransferPage.clickBackBtn();
    })






})