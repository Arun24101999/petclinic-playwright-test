const {test, expect}=require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const {SalesPage}=require('../../POM_AdminPages/SalesPage');



let page;
let context;


test.describe('TS03 - Report', () => {


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

    test('TC003 - Navigate to sales', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.navigateToSales();
        await page.waitForTimeout(1000);
    })

    //Op Tab
    test('TC004 - view order details in op Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickOpTab();
        await page.waitForTimeout(1000);
        await salesPage.searchValue('235');
        await salesPage.clickViewBtn('235');
    })

    test('TC004 - get medicine details in op Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log(getVal);
    })

    test('TC005 - get amount details in op Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })

    //All Tab
    test('TC006 - view order details in All Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickAllTab();
        await page.waitForTimeout(1000);
        await salesPage.searchValue('316');
        await salesPage.clickViewBtn('316');
    })

    test('TC007 - get medicine details in All Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log("OP Appointmnet Details :", getVal);
    })

    test('TC008 - get amount details in All Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })

    //Ip Tab
    test('TC006 - view order details in Ip Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickIpTab();
        await page.waitForTimeout(1000);
        await salesPage.searchValue('227');
        await salesPage.clickViewBtn('227');
    })

    test('TC007 - get medicine details in Ip Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log("IP Appointmnet Details :",getVal);
    })

    test('TC008 - get amount details in Ip Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })

    //Surrender Tab
    test('TC006 - view order details in Surrender Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickSurrenderTab();
        await page.waitForTimeout(1000);
        await salesPage.searchValue('544');
        await salesPage.clickViewBtn('544');
    })

    test('TC007 - get medicine details in Surrender Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log("Surrender Details :",getVal);
    })

    test('TC008 - get amount details in Surrender Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })

    //Adoption Tab
    test('TC006 - view order details in Adoption Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickAdoptionTab();
        await page.waitForTimeout(2000);
        await salesPage.searchValue('316');
        await salesPage.clickViewBtn('316');
    })

    test('TC007 - get medicine details in Adoption Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log("Adoption Details :",getVal);
    })

    test('TC008 - get amount details in Adoption Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })

    //Shop Tab
    test('TC006 - view order details in Shop Tab', async () => {
        const salesPage = new SalesPage(page);
        await salesPage.clickShopTab();
        await page.waitForTimeout(1000);
        await salesPage.searchValue('1739');
        await salesPage.clickViewBtn('1739');
    })

    test('TC007 - get medicine details in Shop Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getMedicineDetails();
        console.log("Shop Details :",getVal);
    })

    test('TC008 - get amount details in Shop Tab', async () => {
        const salesPage = new SalesPage(page);
        const getVal=await salesPage.getAmountDetails();
        console.log(getVal);
        await salesPage.clickBackBtn();
    })


})