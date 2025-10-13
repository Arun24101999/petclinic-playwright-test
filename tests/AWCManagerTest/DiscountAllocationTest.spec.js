const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { DiscountAllocationPage } = require('../../POM_AdminPages/DiscountAllocationPage');

let page;
let context;


test.describe('TS05 - Service Category', () => {


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

    test('TC003 - Navigate to discount Allocation ', async () => {
        const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.navigateToDiscountAllocation();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add discount Allocation', async () => {
        const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.clickAddAllocationBtn();
        await discountAllocationPage.addDiscountAllocation('new discount', 'New Discount Name', 'All', 'Overall Pet', 'GST20', 'Every Day', '1');
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.closeIcon.click();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationNo();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationYes();
        await discountAllocationPage.validateToastMessage('Discount allocation created successfully');
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel the add discount allocation', async () => {
        const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.clickAddAllocationBtn();
        await discountAllocationPage.addDiscountAllocation('new discount', 'New Discount Name', 'All', 'Overall Pet', 'GST20', 'Every Day', '1');
        await discountAllocationPage.clickCancelBtn();
        await discountAllocationPage.closeIcon.click();
        await discountAllocationPage.clickCancelBtn();
        await discountAllocationPage.clickConfirmationNo();
        await discountAllocationPage.clickCancelBtn();
        await discountAllocationPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit discount Master', async () => {
       const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.searchValue('new discount');
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickEditBtn('New Discount Name', 'Overall Pet');
        await page.waitForTimeout(1000);
        await discountAllocationPage.editDiscountAllocation( 'All', 'Overall Pet', 'GST20', 'Every Day', '2');
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationNo();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.closeIcon.click();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationYes();
        await discountAllocationPage.validateToastMessage('Discount allocation updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view discount allocation', async () => {
       const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.searchValue('New Discount');
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickViewBtn('New Discount Name','Overall Pet');
        await page.waitForTimeout(1000);
        await discountAllocationPage.backBtn.click();
        await page.waitForTimeout(2000);
    })

    test('TC009 - delete discount allocation', async () => {
         const discountAllocationPage = new DiscountAllocationPage(page);
        await discountAllocationPage.searchValue('New Discount');
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickDeleteBtn('New Discount Name','Overall Pet');
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await discountAllocationPage.validateToastMessage('Discount allocation deleted successfully');
        await page.waitForTimeout(2000);
    })


})