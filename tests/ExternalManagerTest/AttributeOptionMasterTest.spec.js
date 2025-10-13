const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { AttributeOptionMasterPage } = require('../../POM_ExternalManagerPages/AttributeOptionMasterPage');


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
        const attributeOptionMasterPage = new AttributeOptionMasterPage(page);
        await attributeOptionMasterPage.navigateToAttributeOptionMaster();
    })

    test('TC004 - add variant option with valid data', async () => {
        const attributeOptionMasterPage = new AttributeOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.clickAddAttributeOptionBtn();
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.addAttributeOptionDetails('Attribute A', 'Pharma', 'test the function');
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickCloseIcon();
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickConfirmationNo();
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await attributeOptionMasterPage.validateToastMessage('Attribute option Created successfully');
    })


    test('TC005 - edit variant option', async () => {
        const attributeOptionMasterPage = new AttributeOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.searchTheValue('pharma')
        await page.waitForTimeout(2000);
        await attributeOptionMasterPage.clickEditIcon('PHARMA', 'Attribute A');
        await attributeOptionMasterPage.editAttributeOptionDetails('Pharmacy', 'Test the function');
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickCloseIcon();
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickConfirmationNo();
        await attributeOptionMasterPage.clickSubmitBtn();
        await attributeOptionMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await attributeOptionMasterPage.validateToastMessage('Attribute option updated successfully');

    })

    test('TC006 - view variant option', async () => {
        const attributeOptionMasterPage = new AttributeOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.searchTheValue('Pharmacy')
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.clickViewIcon('Pharmacy', 'Attribute A');
        await page.waitForTimeout(2000);
        await attributeOptionMasterPage.backBtn.click();


    })

    test('TC007 - delete variant option', async () => {
        const attributeOptionMasterPage = new AttributeOptionMasterPage(page);
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.searchTheValue('Pharmacy')
        await page.waitForTimeout(1000);
        await attributeOptionMasterPage.clickDeleteIcon('Pharmacy', 'Attribute A');
        await attributeOptionMasterPage.clickCloseIcon();
        await attributeOptionMasterPage.clickDeleteIcon('Pharmacy', 'Attribute A');
        await attributeOptionMasterPage.clickConfirmationNo();
        await attributeOptionMasterPage.clickDeleteIcon('Pharmacy', 'Attribute A');
        await attributeOptionMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await attributeOptionMasterPage.validateToastMessage('Deleted successfully');
    })


})