const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { GoodIssuePage } = require('../../POM_AdminPages/GoodIssuePage');


let page;
let context;


test.describe('TS03 - Material Category', () => {


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

    test('TC003 - Navigate to good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.navigateToGoodIssue();
        await page.waitForTimeout(2000);
    })


    test('TC005 - add good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.clickAddGoodIssueBtn();
        await goodIssuePage.addGoodIssueDetails('Ribhadharshini B','Clinic Store','Simpari','sim','1');
        await goodIssuePage.clickclearBtn();
        await page.waitForTimeout(2000);
        await goodIssuePage.addGoodIssueDetails('Ribhadharshini B','Clinic Store','Simpari','sim','1');
        await goodIssuePage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.clickEditIcon('Simparica','sim');
        await page.waitForTimeout(2000);
        await goodIssuePage.editGoodIssueDetails('Ribhadharshini B','Clinic Store','Simparica','sim','1');
        await page.waitForTimeout(2000);
        await goodIssuePage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - delete good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.clickDeleteIcon('Simparica','sim');
        await page.waitForTimeout(2000);

    })

    test('TC007 - submit good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.addGoodIssueDetails('Ribhadharshini B','Clinic Store','Simparica','sim','1');
        await page.waitForTimeout(2000);
        await goodIssuePage.clickAddBtn();
        await goodIssuePage.clickSubmitBtn();
        await goodIssuePage.clickCloseIcon();
        await goodIssuePage.clickSubmitBtn();
        await goodIssuePage.clickConfirmationNo();
        await goodIssuePage.clickSubmitBtn();
        await goodIssuePage.clickConfirmationYes();
     const toast = await goodIssuePage.getToastMessage.textContent();
        await expect(toast).toBe("Good issue created successfully");
        await page.waitForTimeout(2000);

    })

    test('TC008 - cancel good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.clickAddGoodIssueBtn();
        await goodIssuePage.addGoodIssueDetails('Ribhadharshini B', 'Clinic Store', 'Simparica', 'sim', '1');
        await page.waitForTimeout(2000);
        await goodIssuePage.clickAddBtn();
        await goodIssuePage.clickCancelBtn();
        await goodIssuePage.clickCloseIcon();
        await goodIssuePage.clickCancelBtn();
        await goodIssuePage.clickConfirmationNo();
        await goodIssuePage.clickCancelBtn();
        await goodIssuePage.clickConfirmationYes();
        await page.waitForTimeout(2000);

    })

    test('TC009 - search good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await goodIssuePage.searchValue('Arun');
        await page.waitForTimeout(1000);
        await goodIssuePage.clickViewIcon('ARUN', "24/09/2025");
        await page.waitForTimeout(2000);
    })

    test('TC010 - return good issue', async () => {
        const goodIssuePage = new GoodIssuePage(page);
        await page.waitForTimeout(1000);
        await goodIssuePage.clickReturnBtn();
        await goodIssuePage.returnQuantityDeatils('Simparica', "sim", "1");
        await goodIssuePage.clickSubmitBtn();
        await goodIssuePage.clickConfirmationYes();
        const toast = await goodIssuePage.getToastMessage.textContent();
        await expect(toast).toBe("Goods issue return successfully");
        await page.waitForTimeout(3000);
    })




})