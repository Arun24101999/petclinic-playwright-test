const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { MaterialCategoryPage } = require('../../POM_AdminPages/MaterialCategoryPage');


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
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to Material category', async () => {
        const materialCategoryPage = new MaterialCategoryPage(page);
        await materialCategoryPage.navigateToMaterialCategory();
    })



    test('TC004 - add category with valid data', async () => {
        const materialCategoryPage = new MaterialCategoryPage(page);
        await page.waitForTimeout(1000);
        await materialCategoryPage.clickAddCategoryBtn();
        await page.waitForTimeout(2000);
        await materialCategoryPage.addCategoryDetails('Pharma', 'test the function');
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickCloseIcon();
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickConfirmationNo();
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialCategoryPage.validateToastMessage('Material category created successfully');

    })


    test('TC005 - edit material category', async () => {
        const materialCategoryPage = new MaterialCategoryPage(page);
        await page.waitForTimeout(1000);
        await materialCategoryPage.searchTheValue('pharma')
        await page.waitForTimeout(2000);
        await materialCategoryPage.clickEditIcon();
        await materialCategoryPage.editCategoryDetails('Pharmacy', 'New');
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickCloseIcon();
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickConfirmationNo();
        await materialCategoryPage.clickSubmitBtn();
        await materialCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialCategoryPage.validateToastMessage('Material category updated successfully');

    })

    test('TC006 - view material category', async () => {
      const materialCategoryPage = new MaterialCategoryPage(page);
        await page.waitForTimeout(1000);
        await materialCategoryPage.searchTheValue('pharmacy')
        await page.waitForTimeout(1000);
        await materialCategoryPage.clickViewIcon();
        await page.waitForTimeout(2000);
        await materialCategoryPage.backBtn.click();


    })

    test('TC007 - delete material category', async () => {
        const materialCategoryPage = new MaterialCategoryPage(page);
        await page.waitForTimeout(1000);
         await materialCategoryPage.searchTheValue('pharmacy')
        await page.waitForTimeout(1000);
        await materialCategoryPage.clickDeleteIcon();
        await materialCategoryPage.closeIcon.click();
        await materialCategoryPage.clickDeleteIcon();
        await materialCategoryPage.clickConfirmationNo();
        await materialCategoryPage.clickDeleteIcon();
        await materialCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialCategoryPage.validateToastMessage('Material category deleted successfully');
    })


})