const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { VariantOptionMasterPage } = require('../../POM_ExternalManagerPages/VariantOptionMasterPage');


let page;
let context;


test.describe('TS03 - Storage Location', () => {


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
        await usersPage.selectUserRoleOption('External Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to variant option', async () => {
        const variantOptionMasterPage = new VariantOptionMasterPage(page);
        await variantOptionMasterPage.navigateToVariantOptionMaster();
    })



    // test('TC004 - add variant option with valid data', async () => {
    //     const variantOptionMasterPage = new VariantOptionMasterPage(page);
    //     await page.waitForTimeout(1000);
    //     await variantOptionMasterPage.clickAddVariantOptionBtn();
    //     await page.waitForTimeout(2000);
    //     await variantOptionMasterPage.addVariantOptionDetails('Test', 'Pharma', 'test the function');
    //     await variantOptionMasterPage.clickSubmitBtn();
    //     await variantOptionMasterPage.clickCloseIcon();
    //     await variantOptionMasterPage.clickSubmitBtn();
    //     await variantOptionMasterPage.clickConfirmationNo();
    //     await variantOptionMasterPage.clickSubmitBtn();
    //     await variantOptionMasterPage.clickConfirmationYes();
    //     await page.waitForTimeout(1000)
    //     await variantOptionMasterPage.validateToastMessage('Variant option Created successfully');
    // })


    test('TC005 - edit variant option', async () => {
        const variantOptionMasterPage = new VariantOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await variantOptionMasterPage.searchTheValue('pharma')
        await page.waitForTimeout(2000);
        await variantOptionMasterPage.clickEditIcon('Pharma', 'Test');
        await variantOptionMasterPage.editVariantOptionDetails('Pharmacy', 'New');
        await variantOptionMasterPage.clickSubmitBtn();
        await variantOptionMasterPage.clickCloseIcon();
        await variantOptionMasterPage.clickSubmitBtn();
        await variantOptionMasterPage.clickConfirmationNo();
        await variantOptionMasterPage.clickSubmitBtn();
        await variantOptionMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await variantOptionMasterPage.validateToastMessage('Variant option updated successfully');

    })

    test('TC006 - view variant option', async () => {
        const variantOptionMasterPage = new VariantOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await variantOptionMasterPage.searchTheValue('pharmacy')
        await page.waitForTimeout(1000);
        await variantOptionMasterPage.clickViewIcon('Pharmacy', 'Test');
        await page.waitForTimeout(2000);
        await variantOptionMasterPage.backBtn.click();


    })

    test('TC007 - delete variant option', async () => {
         const variantOptionMasterPage = new VariantOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await variantOptionMasterPage.searchTheValue('pharmacy')
        await page.waitForTimeout(1000);
        await variantOptionMasterPage.clickDeleteIcon('Pharmacy', 'Test');
        await variantOptionMasterPage.clickCloseIcon();
        await variantOptionMasterPage.clickDeleteIcon('Pharmacy', 'Test');
        await variantOptionMasterPage.clickConfirmationNo();
        await variantOptionMasterPage.clickDeleteIcon('Pharmacy', 'Test');
        await variantOptionMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await variantOptionMasterPage.validateToastMessage('Deleted successfully');
    })


})