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
        const excelReader = new ExcelReader();
        const manufacturerData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { Name, MobileNumber, Email, Emirate, Address, Toast } = manufacturerData[0];
        await manufacturerPage.clickAddManufacturerBtn();
        await manufacturerPage.addManufacturerDetails(Name, MobileNumber, Email, Emirate, Address);
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickSubmitBtn()
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage(Toast);
    })

    test('TC005 - edit manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelReader = new ExcelReader();
        const manufacturerData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { Name, MobileNumber, Email, Emirate, Address, Toast } = manufacturerData[1];

        await manufacturerPage.searchValue(manufacturerData[0].MobileNumber);
        await manufacturerPage.clickEditBtn(manufacturerData[0].MobileNumber);
        await manufacturerPage.addManufacturerDetails(Name, MobileNumber, Email, Emirate, Address);
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickSubmitBtn()
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage(Toast);
    })



    test('TC006 - cancel add manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelReader = new ExcelReader();
        const manufacturerData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { Name, MobileNumber, Email, Emirate, Address } = manufacturerData[2];

        await manufacturerPage.clickAddManufacturerBtn();
        await manufacturerPage.addManufacturerDetails(Name, MobileNumber, Email, Emirate, Address);
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickCancelBtn()
        await manufacturerPage.clickConfirmationYes();
    })

    test('TC005 - view manufacturer details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelReader = new ExcelReader();
        const manufacturerData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');

        await manufacturerPage.searchValue(manufacturerData[2].MobileNumber);
        await manufacturerPage.clickViewBtn(manufacturerData[2].MobileNumber);
        await page.waitForTimeout(2000);
        await manufacturerPage.clickCloseBtn();

    })

    test('TC007 - delete supplier details ', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelReader = new ExcelReader();
        const manufacturerData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const mobileNumber=manufacturerData[2].MobileNumber;
        await manufacturerPage.searchValue(mobileNumber);
        await manufacturerPage.clickDeleteBtn(mobileNumber);
        await manufacturerPage.clickCloseIcon();
        await manufacturerPage.clickDeleteBtn(mobileNumber);
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickDeleteBtn(mobileNumber);
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.validateToastMessage(manufacturerData[2].Toast);
    })






})