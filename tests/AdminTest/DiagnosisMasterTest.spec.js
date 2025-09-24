const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { DiagnosisMasterPage } = require('../../POM_AdminPages/DiagnosisMatserPage');


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

    test('TC003 - Navigate to Diagnosis Master', async () => {
        const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await diagnosisMasterPage.navigateToDiagnosisMaster();
        await page.waitForTimeout(2000);
    })



    test('TC004 - add diagnosis with valid data', async () => {
        const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await page.waitForTimeout(1000);
        await diagnosisMasterPage.clickAddDiagnosisBtn();
        await page.waitForTimeout(2000);
        await diagnosisMasterPage.addDiagnosisDetails('Pharma', 'test the function');
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickCloseIcon();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationNo();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await diagnosisMasterPage.validateToastMessage('Material diagnosis created successfully');

    })


    test('TC005 - edit diagnosis', async () => {
       const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await page.waitForTimeout(1000);
        await diagnosisMasterPage.searchTheValue('pharma')
        await page.waitForTimeout(2000);
        await diagnosisMasterPage.clickEditIcon();
        await diagnosisMasterPage.editDiagnosisDetails('Pharmacy', 'New');
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickCloseIcon();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationNo();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await diagnosisMasterPage.validateToastMessage('Material diagnosis updated successfully');

    })

    test('TC006 - view diagnosis master', async () => {
      const materialCategoryPage = new MaterialCategoryPage(page);
        await page.waitForTimeout(1000);
        await materialCategoryPage.searchTheValue('pharmacy')
        await page.waitForTimeout(1000);
        await materialCategoryPage.clickViewIcon();
        await page.waitForTimeout(2000);
        await materialCategoryPage.backBtn.click();


    })

    test('TC007 - delete diagnosis master', async () => {
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
        await materialCategoryPage.validateToastMessage('Material diagnosis deleted successfully');
    })


})