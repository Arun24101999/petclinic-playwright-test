const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { AwcOPAppointmentPage } = require('../../POM_AdminPages/AwcOutpatientAppointmentPage');


let page;
let context;


test.describe('TS03 - OP Appointment', () => {


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

    test('TC003 - Navigate to AWC-Op Module', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);
        await awcOPAppointmentPage.navigateToAppointmentModule();
        await page.waitForTimeout(2000);
    })


    test('TC004 - click All tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectAllTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        await awcOPAppointmentPage.clickViewBtn();
        await page.waitForTimeout(1000);
        await awcOPAppointmentPage.clickCloseIcon();


    })

    test('TC005 - click Pending tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectPendingTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        await awcOPAppointmentPage.clickViewBtn();
        await page.waitForTimeout(1000);
        await awcOPAppointmentPage.clickCloseIcon();



    })

    test('TC006 - click Ongoing tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectOngoingTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        await awcOPAppointmentPage.clickViewBtn();
        await page.waitForTimeout(1000);
        await awcOPAppointmentPage.clickCloseIcon();



    })

    test('TC007 - click Wrapup tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectWrapUpTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        // await awcOPAppointmentPage.clickViewBtn();
        // await page.waitForTimeout(1000);
        // await awcOPAppointmentPage.clickCloseIcon();


    })


    test('TC010 - click Completed tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectCompletedTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        await awcOPAppointmentPage.clickViewBtn();
        await page.waitForTimeout(1000);
        await awcOPAppointmentPage.clickCloseIcon();

    })

    test('TC011 - click Cancelled tab to view the data', async () => {
        const awcOPAppointmentPage = new AwcOPAppointmentPage(page);

        await awcOPAppointmentPage.selectCancelledTab();
        await page.waitForTimeout(2000);
        // await opAppointmentPage.searchValue('238');
        // await page.waitForTimeout(2000);
        await awcOPAppointmentPage.clickViewBtn();
        await page.waitForTimeout(1000);
        await awcOPAppointmentPage.clickCloseIcon();

    })









})