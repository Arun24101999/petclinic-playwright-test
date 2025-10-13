const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { AttributeMasterPage } = require('../../POM_ExternalManagerPages/AttributeMasterPage');




let page;
let context;


test.describe('TS03 - Material Category', () => {

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
        await usersPage.selectUserRoleOption('External Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to MarketPlace Management', async () => {
        const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.navigateToAttributeMaster();
    })

    test('TC004 - Add Attribute Master', async () => {
       const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.ClickAddAttributeBtn();
        await attributeMasterPage.addAttributeDetails('testone', 'Testone functionality using automation');
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.clickConfirmationNo();
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.closeIcon.click();
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.clickConfirmationYes();
        await attributeMasterPage.validateToastMessage('Attribute Created successfully')
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel add Attribute master', async () => {
      const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.ClickAddAttributeBtn();
        await attributeMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
        await attributeMasterPage.ClickAddAttributeBtn();
        await page.waitForTimeout(1000);
        await attributeMasterPage.addAttributeDetails('testtwo', 'Testtwo functionality using automation');
        await attributeMasterPage.clickCancelBtn();
        await attributeMasterPage.clickConfirmationNo();
        await attributeMasterPage.clickCancelBtn();
        await attributeMasterPage.closeIcon.click();
        await attributeMasterPage.clickCancelBtn();
        await attributeMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit Attribute Master', async () => {
        const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.searchValue('testone');
        await page.waitForTimeout(1000);
        await attributeMasterPage.clickEditBtn('testone');
        await page.waitForTimeout(1000);
        await attributeMasterPage.editAttributeDetails('testtwo', 'Testtwo functionality using automation');
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.clickConfirmationNo();
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.closeIcon.click();
        await attributeMasterPage.clickSubmitBtn();
        await attributeMasterPage.clickConfirmationYes();
        await attributeMasterPage.validateToastMessage('Attribute updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view Attribute details', async () => {
         const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.searchValue('testtwo');
        await page.waitForTimeout(1000);
        await attributeMasterPage.clickViewBtn('testtwo');
        await page.waitForTimeout(1000);
        await attributeMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete Attribute master', async () => {
          const attributeMasterPage = new AttributeMasterPage(page);
        await attributeMasterPage.searchValue('testtwo');
        await page.waitForTimeout(1000);
        await attributeMasterPage.clickDeleteBtn('testtwo');
        await attributeMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await attributeMasterPage.validateToastMessage('Deleted successfully');
        await page.waitForTimeout(2000);
    })



})