const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { SettingsPage } = require('../../POM_AdminPages/SettingsPage');


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
        await usersPage.selectUserRoleOption('AWC Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to settings module', async () => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.navigateToSettingsModule();
    })



    // test('TC004 - edit clinic details with valid data', async () => {
    //     const settingsPage = new SettingsPage(page);
    //     await page.waitForTimeout(1000);
    //     await settingsPage.clickEditBtn();
    //     await page.waitForTimeout(2000);
    //     await settingsPage.editClinicDetails('YaanPharma', '9717228568', 'Ajman', 'info@psd.rak.ae', '10030428410003', 'Public Services Department, PO BOX 1661, RAK, UAE Dubai');
    //     await page.waitForTimeout(1000);
    //     await settingsPage.clickSubmitBtn();
    //     await settingsPage.clickCloseIcon();
    //     await page.waitForTimeout(1000);
    //     await settingsPage.clickSubmitBtn();
    //     await settingsPage.clickConfirmationNo();
    //     await page.waitForTimeout(1000);
    //     await settingsPage.clickSubmitBtn();
    //     await settingsPage.clickConfirmationYes();
    //     await page.waitForTimeout(1000);
    //     await settingsPage.validateToastMessage('Language added successfully');

    // })


    test('TC005 - cancel edit clinic details', async () => {
       const settingsPage = new SettingsPage(page);
        await page.waitForTimeout(1000);
        await settingsPage.clickEditBtn();
        await page.waitForTimeout(2000);
        await settingsPage.editClinicDetails('YaanPharma', '9717228568', 'Ajman', 'info@psd.rak.ae', '10030428410003', 'Public Services Department, PO BOX 1661, RAK, UAE Dubai');
        await page.waitForTimeout(1000);
        await settingsPage.clickCancelBtn();
        await settingsPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await settingsPage.clickCancelBtn();
        await settingsPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await settingsPage.clickCancelBtn();
        await settingsPage.clickConfirmationYes();
       
    })


    

})