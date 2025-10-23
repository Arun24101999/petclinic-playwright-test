const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { InventoryAlertPage } = require('../../POM_AdminPages/InventoryAlertPage');


let page;
let context;


test.describe('TS04 - Inventory Alert', () => {


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

    test('TC003 - Navigate to Inventory Alert', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        await inventoryAlertPage.navigateToInventortAlert();
        await page.waitForTimeout(2000);
    })

    test('TC004 - get total low qty counts', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        await page.waitForTimeout(1000);
        const totalLowQtyCount = await inventoryAlertPage.getLowQtyCount.textContent();
        await page.waitForTimeout(1000);
        console.log('Total Low Qty Count:' + totalLowQtyCount);
    })

    test('TC005 - get low qty material details', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
         const excelReader = new ExcelReader();
        const inventoryAlertData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'InventoryAlertTest');

        await inventoryAlertPage.clickLowQtyTab();
        await inventoryAlertPage.searchValue(inventoryAlertData[0].searchValue);
        const materialDetails=await inventoryAlertPage.getLowQtyMaterialDetails(inventoryAlertData[0].searchValue);
        console.log(materialDetails);
    })

    test('TC006 - get total expiring qty counts', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        await page.waitForTimeout(1000);
        const totalExpiringCount = await inventoryAlertPage.getExpiringCount.textContent();
        await page.waitForTimeout(1000);
        console.log('Total Low Qty Count:' + totalExpiringCount);
    })

      test('TC007 - get low qty material details', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
         const excelReader = new ExcelReader();
        const inventoryAlertData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'InventoryAlertTest');

        await inventoryAlertPage.clickExpiringTab();
        await inventoryAlertPage.searchValue(inventoryAlertData[1].searchValue);
        const materialDetails=await inventoryAlertPage.getExpiringMaterialDetails(inventoryAlertData[1].searchValue);
        console.log(materialDetails);
    })








})