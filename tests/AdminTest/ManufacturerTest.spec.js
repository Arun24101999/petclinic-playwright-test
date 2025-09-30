const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ManufacturerPage } = require('../../POM_AdminPages/ManufacturerPage');


let page;
let context;


test.describe('TS04 - Supplier or Vendor', () => {


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

    test('TC003 - Navigate to Manufacturer', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.navigateToManufacturerModule();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add manfacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.clickAddManufacturerBtn();
        await manufacturerPage.addManufacturerDetails('MedyaanDatayaa', '7094750000', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickSubmitBtn()
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage('Manufacturer created successfully');
    })

    test('TC005 - edit manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.searchValue('7094750000');
        await manufacturerPage.clickEditBtn('7094750000');
        await manufacturerPage.addManufacturerDetails('Medyaan', '7094755145', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickSubmitBtn()
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage('Manufacturer updated successfully');
    })



    test('TC006 - cancel add manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.clickAddManufacturerBtn();
        await manufacturerPage.addManufacturerDetails('Arunku', '7094750000', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickCancelBtn()
        await manufacturerPage.clickConfirmationYes();
    })

    test('TC005 - view manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.searchValue('7094755145');
        await manufacturerPage.clickViewBtn('7094755145');
        await page.waitForTimeout(2000);
        await manufacturerPage.clickCloseBtn();

    })

    test('TC007 - delete supplier details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.searchValue('7094755145');
        await manufacturerPage.clickDeleteBtn('7094755145');
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickDeleteBtn('7094755145');
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickDeleteBtn('7094755145');
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage('Manufacturer deleted successfully');
    })






})