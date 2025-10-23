const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { GoodTransferPage } = require('../../POM_AdminPages/GoodTransferPage');


let page;
let context;


test.describe('TS03 - Good Transfer', () => {


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

    test('TC003 - Navigate to scrap module', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        await goodTransferPage.navigateToGoodsTransfer();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add goods transfer', async () => {

        const goodTransferPage = new GoodTransferPage(page);
        const excelReader = new ExcelReader();
        const goodTransferData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'GoodTransferTest');
        const { From, To, TransferDate, Material, Batch, Quantity } = goodTransferData[0];

        await goodTransferPage.clickAddGoodsTransferBtn();
        await goodTransferPage.addGoodsTransferDetails(From, To, TransferDate, Material, Batch, Quantity);
        await goodTransferPage.clickclearBtn();
        await page.waitForTimeout(2000);
        await goodTransferPage.addGoodsTransferDetails(From, To, TransferDate, Material, Batch, Quantity);
        await goodTransferPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC005 - edit good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        const excelReader = new ExcelReader();
        const goodTransferData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'GoodTransferTest');
        const { From, To, TransferDate, Material, Batch, Quantity } = goodTransferData[0];

        await goodTransferPage.clickEditIcon(Material, Batch);
        await page.waitForTimeout(2000);
        await goodTransferPage.editGoodsTransferDetails(goodTransferData[1].From, goodTransferData[1].To, goodTransferData[1].TransferDate, goodTransferData[1].Material, goodTransferData[1].Batch, goodTransferData[1].Quantity);
        await page.waitForTimeout(2000);
        await goodTransferPage.clickAddBtn();
        await page.waitForTimeout(2000);
    })

    test('TC006 - submit good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        const excelReader = new ExcelReader();
        const goodTransferData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'GoodTransferTest');
        const { Toast } = goodTransferData[0];

        await goodTransferPage.clickSubmitBtn();
        const toast = await goodTransferPage.getToastMessage.textContent();
        await expect(toast).toBe(Toast); x
        await page.waitForTimeout(2000);

    })

    test('TC007 - cancel good transfer', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        const excelReader = new ExcelReader();
        const goodTransferData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'GoodTransferTest');
        const { From, To, TransferDate, Material, Batch, Quantity } = goodTransferData[0];

        await goodTransferPage.clickAddGoodsTransferBtn();
        await goodTransferPage.addGoodsTransferDetails(From, To, TransferDate, Material, Batch, Quantity);
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickCloseIcon();
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickConfirmationNo();
        await goodTransferPage.clickCancelBtn();
        await goodTransferPage.clickConfirmationYes();
        await page.waitForTimeout(2000);

    })


    test('TC008 - search scrap ', async () => {
        const goodTransferPage = new GoodTransferPage(page);
        const excelReader = new ExcelReader();
        const goodTransferData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'GoodTransferTest');
        const { GTId } = goodTransferData[0];
        await goodTransferPage.searchValue(GTId);
        await page.waitForTimeout(1000);
        await goodTransferPage.clickViewIcon(GTId);
        await page.waitForTimeout(2000);
        await goodTransferPage.clickBackBtn();
    })






})