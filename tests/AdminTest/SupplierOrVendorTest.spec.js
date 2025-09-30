const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { SupplierOrVendorPage } = require('../../POM_AdminPages/SupplierOrVendorPage');


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

    test('TC003 - Navigate to supplier or vendor ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.navigateToSupplierModule();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add supplier details ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.clickAddSupplierBtn();
        await supplierOrVendorPage.addSupplierDetails('Arunkumar', '7094750000', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await supplierOrVendorPage.clickSubmitBtn();
        await supplierOrVendorPage.clickCloseIcon();
        await supplierOrVendorPage.clickSubmitBtn();
        await supplierOrVendorPage.clickConfirmationNo();
        await supplierOrVendorPage.clickSubmitBtn()
        await supplierOrVendorPage.clickConfirmationYes();
        await supplierOrVendorPage.validateToastMessage('Supplier created successfully');
    })

    test('TC005 - edit supplier details ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.searchValue('7094750000');
        await supplierOrVendorPage.clickEditBtn('7094750000');
        await supplierOrVendorPage.addSupplierDetails('Arunkumar', '7094755145', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await supplierOrVendorPage.clickSubmitBtn();
        await supplierOrVendorPage.clickCloseIcon();
        await supplierOrVendorPage.clickSubmitBtn();
        await supplierOrVendorPage.clickConfirmationNo();
        await supplierOrVendorPage.clickSubmitBtn()
        await supplierOrVendorPage.clickConfirmationYes();
        await supplierOrVendorPage.validateToastMessage('Supplier details updated successfully');
    })



    test('TC006 - cancel add supplier details ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.clickAddSupplierBtn();
        await supplierOrVendorPage.addSupplierDetails('Arunkumar', '7094750000', 'arun@medyaan.com', 'Ajman', 'Test the functionality');
        await supplierOrVendorPage.clickCancelBtn();
        await supplierOrVendorPage.clickCloseIcon();
        await supplierOrVendorPage.clickCancelBtn();
        await supplierOrVendorPage.clickConfirmationNo();
        await supplierOrVendorPage.clickCancelBtn()
        await supplierOrVendorPage.clickConfirmationYes();
    })

    test('TC005 - view supplier details ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.searchValue('7094755145');
        await supplierOrVendorPage.clickViewBtn('7094755145');
        await page.waitForTimeout(2000);
        await supplierOrVendorPage.clickCloseBtn();

    })

    test('TC007 - delete supplier details ', async () => {
        const supplierOrVendorPage = new SupplierOrVendorPage(page);
        await supplierOrVendorPage.searchValue('7094755145');
        await supplierOrVendorPage.clickDeleteBtn('7094755145');
        await supplierOrVendorPage.clickCloseIcon();
        await supplierOrVendorPage.clickDeleteBtn('7094755145');
        await supplierOrVendorPage.clickConfirmationNo();
        await supplierOrVendorPage.clickDeleteBtn('7094755145');
        await supplierOrVendorPage.clickConfirmationYes();
        await supplierOrVendorPage.validateToastMessage('Supplier details deleted successfully');
    })






})