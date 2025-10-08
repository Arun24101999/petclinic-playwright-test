const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { VariantMasterPage } = require('../../POM_ExternalManagerPages/VariantMasterPage');




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
        await usersPage.selectUserRoleOption('External Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to MarketPlace Management', async () => {
        const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.navigateToVariantMaster();
    })

    test('TC004 - Add Variant Master', async () => {
        const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.ClickAddVariantBtn();
        await variantMasterPage.addVariantDetails('testone', 'Testone functionality using automation');
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.clickConfirmationNo();
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.closeIcon.click();
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.clickConfirmationYes();
        await variantMasterPage.validateToastMessage('Variant Created successfully')
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel add variant master', async () => {
        const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.ClickAddVariantBtn();
        await variantMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
        await variantMasterPage.ClickAddVariantBtn();
        await page.waitForTimeout(1000);
        await variantMasterPage.addVariantDetails('testtwo', 'Testtwo functionality using automation');
        await variantMasterPage.clickCancelBtn();
        await variantMasterPage.clickConfirmationNo();
        await variantMasterPage.clickCancelBtn();
        await variantMasterPage.closeIcon.click();
        await variantMasterPage.clickCancelBtn();
        await variantMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit Variant Master', async () => {
        const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.searchValue('testone');
        await page.waitForTimeout(1000);
        await variantMasterPage.clickEditBtn('testone');
        await page.waitForTimeout(1000);
        await variantMasterPage.editVariantDetails('testtwo', 'Testtwo functionality using automation');
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.clickConfirmationNo();
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.closeIcon.click();
        await variantMasterPage.clickSubmitBtn();
        await variantMasterPage.clickConfirmationYes();
        await variantMasterPage.validateToastMessage('Variant updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view variant details', async () => {
         const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.searchValue('testtwo');
        await page.waitForTimeout(1000);
        await variantMasterPage.clickViewBtn('testtwo');
        await page.waitForTimeout(1000);
        await variantMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete variant master', async () => {
        const variantMasterPage = new VariantMasterPage(page);
        await variantMasterPage.searchValue('testtwo');
        await page.waitForTimeout(1000);
        await variantMasterPage.clickDeleteBtn('testtwo');
        await variantMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await variantMasterPage.validateToastMessage('Deleted successfully');
        await page.waitForTimeout(2000);
    })



})