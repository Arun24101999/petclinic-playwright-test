const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TreatmentMasterPage } = require('../../POM_AdminPages/TreatmentMasterPage');

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
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to DiscountMaster ', async () => {
        const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.navigateToDiscountMaster();
        await page.waitForTimeout(1000);
    })

    test('TC004 - Add discount Master', async () => {
        const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.clickAddDiscountBtn();
        await discountMasterPage.addDiscountMaster('discountName', 'Amount', '20', 'GST20', 'Arun', 'description');
        await discountMasterPage.remarkbtn('Yes');
        await discountMasterPage.allocationNeedbtn('Yes');
        await discountMasterPage.clickSubmitBtn();
        await discountMasterPage.closeIcon.click();
        await discountMasterPage.clickSubmitBtn();
        await discountMasterPage.clickConfirmationNo();
        await discountMasterPage.clickSubmitBtn();
        await discountMasterPage.clickConfirmationYes();
        await discountMasterPage.validateToastMessage('Discount master created successfully');
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel the add discount Master', async () => {
        const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.clickAddDiscountBtn();
        await discountMasterPage.addDiscountMaster('discountName', 'Amount', '20', 'GST20', 'Arun', 'description');
        await discountMasterPage.remarkbtn('Yes');
        await discountMasterPage.allocationNeedbtn('Yes');
        await discountMasterPage.clickCancelBtn();
        await discountMasterPage.closeIcon.click();
        await discountMasterPage.clickCancelBtn();
        await discountMasterPage.clickConfirmationNo();
        await discountMasterPage.clickCancelBtn();
        await discountMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    // test('TC006 - edit discount Master', async () => {
    //   const discountMasterPage = new DiscountMasterPage(page);
    //     await discountMasterPage.searchValue('new discount');
    //     await page.waitForTimeout(1000);
    //     await discountMasterPage.clickEditBtn('New Discount Name');
    //     await page.waitForTimeout(1000);
    //     await discountMasterPage.editDiscountMaster('discountName', 'Amount', '20', 'GST20', 'Arun', 'description');
    //     await discountMasterPage.remarkbtn('No');
    //     await discountMasterPage.allocationNeedbtn('No');
    //     await discountMasterPage.clickSubmitBtn();
    //     await discountMasterPage.clickConfirmationNo();
    //     await discountMasterPage.clickSubmitBtn();
    //     await discountMasterPage.closeIcon.click();
    //     await discountMasterPage.clickSubmitBtn();
    //     await discountMasterPage.clickConfirmationYes();
    //     await discountMasterPage.validateToastMessage('Discount master updated successfully');
    //     await page.waitForTimeout(2000);
    // })

    test('TC008 - view discount Master', async () => {
       const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.searchValue('New Discount Name');
        await page.waitForTimeout(1000);
        await discountMasterPage.clickViewBtn('New Discount Name');
        await page.waitForTimeout(1000);
        await discountMasterPage.backBtn.click();
        await page.waitForTimeout(2000);
    })

    test('TC009 - delete Treatment Master', async () => {
         const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.searchValue('test discount');
        await page.waitForTimeout(1000);
        await discountMasterPage.clickDeleteBtn('test discount');
        await page.waitForTimeout(1000);
        await discountMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await discountMasterPage.validateToastMessage('Discount master deleted successfully');
        await page.waitForTimeout(2000);
    })


})