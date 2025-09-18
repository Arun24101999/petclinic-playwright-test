const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ServiceCategoryPage } = require('../../POM_AdminPages/ServiceCategoryPage');

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

    test('TC003 - Navigate to ServiceCategory ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.navigateToServiceCategory();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();
        await serviceCategoryPage.addServiceCategory('testone', 'Testone functionality using automation');
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await serviceCategoryPage.validateToastMessage('Service category created successfully')
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel add Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();
        await serviceCategoryPage.backBtn.click();
        await page.waitForTimeout(1000);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();
         await page.waitForTimeout(1000);
        await serviceCategoryPage.addServiceCategory('testtwo', 'Testtwo functionality using automation');
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.searchValue('testone');
         await page.waitForTimeout(1000);
        await serviceCategoryPage.clickEditBtn('testone');
         await page.waitForTimeout(1000);
        await serviceCategoryPage.editServiceCategory('testtwo', 'Testtwo functionality using automation');
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await serviceCategoryPage.validateToastMessage('Service category updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.searchValue('testtwo');
         await page.waitForTimeout(1000);
        await serviceCategoryPage.clickViewBtn('testtwo');
         await page.waitForTimeout(1000);
        await serviceCategoryPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC007 - delete Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.searchValue('testtwo');
         await page.waitForTimeout(1000);
        await serviceCategoryPage.clickDeleteBtn('testtwo');
        await serviceCategoryPage.clickConfirmationYes();
         await page.waitForTimeout(1000);
        await serviceCategoryPage.validateToastMessage('Service category deleted successfully');
        await page.waitForTimeout(2000);
    })



})