const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { DiscountHistoryPage } = require('../../POM_AdminPages/DiscountHistoryPage');

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

    test('TC003 - Navigate to discount Allocation ', async () => {
        const discountHistoryPage = new DiscountHistoryPage(page);
        await discountHistoryPage.naviagteToDiscountHistory();
        await page.waitForTimeout(2000);
    })

    test('TC004 - View to discount history ', async () => {
        const discountHistoryPage = new DiscountHistoryPage(page);
        const totalEntries = await discountHistoryPage.getDiscountHistoryList();
        console.log('no of discount entries',totalEntries);
        await page.waitForTimeout(2000);
    })

    test('TC005 - get discount history details based on user Id', async () => {
        const discountHistoryPage = new DiscountHistoryPage(page);
         await page.waitForTimeout(1000);
        await discountHistoryPage.searchValue('14438');
        await page.waitForTimeout(1000);
        const userDetails = await discountHistoryPage.getHistoryDetailsBasedonUserId('14438');
        console.log(userDetails);
        await page.waitForTimeout(2000);
    })

})