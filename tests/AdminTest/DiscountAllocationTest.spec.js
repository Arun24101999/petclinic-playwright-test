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
        await usersPage.selectUserRoleBtn();
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
        //from excel
        const excelReader = new ExcelReader();
        const DiscountAllocationTestData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiscountAllocationTest');

        const discountSearch = (DiscountAllocationTestData[0].SearchDiscount);
        const discountName = (DiscountAllocationTestData[0].nameOfDiscount);
        const orderTypeName = (DiscountAllocationTestData[0].orderType);
        const ruleAgainst = (DiscountAllocationTestData[0].discountRuleAgainst);
        const ruleAgainstID = (DiscountAllocationTestData[0].discountRuleAgainstId);
        const timeFrame = (DiscountAllocationTestData[0].TimeFrame);
        const count = (DiscountAllocationTestData[0].TotalCount);

        await discountAllocationPage.addDiscountAllocation(discountSearch, discountName, orderTypeName, ruleAgainst, ruleAgainstID, timeFrame, count);

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
        //from excel
        const excelReader = new ExcelReader();
        const DiscountAllocationTestData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiscountAllocationTest');

        const discountSearch = (DiscountAllocationTestData[0].SearchDiscount);
        const discountName = (DiscountAllocationTestData[0].nameOfDiscount);
        const orderTypeName = (DiscountAllocationTestData[0].orderType);
        const ruleAgainst = (DiscountAllocationTestData[0].discountRuleAgainst);
        const ruleAgainstID = (DiscountAllocationTestData[0].discountRuleAgainstId);
        const timeFrame = (DiscountAllocationTestData[0].TimeFrame);
        const count = (DiscountAllocationTestData[0].TotalCount);

        await discountAllocationPage.addDiscountAllocation(discountSearch, discountName, orderTypeName, ruleAgainst, ruleAgainstID, timeFrame, count);
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
        //from excel
        const excelReader = new ExcelReader();
        const DiscountAllocationTestData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiscountAllocationTest');

        const discountSearch = (DiscountAllocationTestData[0].SearchDiscount);
        const discountName = (DiscountAllocationTestData[0].nameOfDiscount);
        const orderTypeName = (DiscountAllocationTestData[0].orderType);
        const ruleAgainst = (DiscountAllocationTestData[0].discountRuleAgainst);
        const ruleAgainstID = (DiscountAllocationTestData[0].discountRuleAgainstId);
        const timeFrame = (DiscountAllocationTestData[0].TimeFrame);
        const count = (DiscountAllocationTestData[0].TotalCount);
        await discountAllocationPage.searchValue(discountSearch);
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickEditBtn(discountName, ruleAgainst);
        await page.waitForTimeout(1000);
        await discountAllocationPage.editDiscountAllocation(orderTypeName, ruleAgainst, ruleAgainstID, timeFrame, count);
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationNo();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.closeIcon.click();
        await discountAllocationPage.clickSubmitBtn();
        await discountAllocationPage.clickConfirmationYes();
        //from excel
        const getToastMessage = (DiscountAllocationTestData[0].ToastMessage);
        await discountAllocationPage.validateToastMessage(getToastMessage);
        await page.waitForTimeout(1000);
    })

    test('TC008 - view discount allocation', async () => {
        const discountAllocationPage = new DiscountAllocationPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const DiscountAllocationTestData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiscountAllocationTest');

        const discountSearch = (DiscountAllocationTestData[0].SearchDiscount);
        const discountName = (DiscountAllocationTestData[0].nameOfDiscount);
        const orderTypeName = (DiscountAllocationTestData[0].orderType);
        const ruleAgainst = (DiscountAllocationTestData[0].discountRuleAgainst);
        const ruleAgainstID = (DiscountAllocationTestData[0].discountRuleAgainstId);
        const timeFrame = (DiscountAllocationTestData[0].TimeFrame);
        const count = (DiscountAllocationTestData[0].TotalCount);

        await discountAllocationPage.searchValue(discountSearch);
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickViewBtn(discountName, ruleAgainst);
        await page.waitForTimeout(1000);
        await discountAllocationPage.backBtn.click();
        await page.waitForTimeout(2000);
    })

    test('TC009 - delete discount allocation', async () => {
        const discountAllocationPage = new DiscountAllocationPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const DiscountAllocationTestData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiscountAllocationTest');

        const discountSearch = (DiscountAllocationTestData[0].SearchDiscount);
        const discountName = (DiscountAllocationTestData[0].nameOfDiscount);
        const orderTypeName = (DiscountAllocationTestData[0].orderType);
        const ruleAgainst = (DiscountAllocationTestData[0].discountRuleAgainst);
        const ruleAgainstID = (DiscountAllocationTestData[0].discountRuleAgainstId);
        const timeFrame = (DiscountAllocationTestData[0].TimeFrame);
        const count = (DiscountAllocationTestData[0].TotalCount);

        await discountAllocationPage.searchValue(discountSearch);
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickDeleteBtn(discountName, ruleAgainst);
        await page.waitForTimeout(1000);
        await discountAllocationPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        //from excel
        const getToastMessage = (DiscountAllocationTestData[0].ToastMessage);
        await discountAllocationPage.validateToastMessage(getToastMessage);
        await page.waitForTimeout(2000);
    })


})