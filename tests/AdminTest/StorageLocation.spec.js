const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const {StorageLocation}=require('../../POM_AdminPages/StorageLocationPage');


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
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(1000);
    })

    test('Tc003 - storagelocation', async()=> {
    const storageLocation = new StorageLocation(page);
    await storageLocation.navigateToStorageLocation();
    await storageLocation.clickAddStorageLocation('store','Arunkumar R','test the function');
    await storageLocation.clickSubmitBtn();
    await storageLocation.clickConfirmationNo();



    })

})