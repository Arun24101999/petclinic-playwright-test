const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TaskPolicyPage } = require('../../POM_AdminPages/TaskPolicyPage');


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

    test('TC003 - Navigate to Task Policy', async () => {
        const taskPolicyPage = new TaskPolicyPage(page);
        await taskPolicyPage.navigateToTaskPolicy();
    })



    test('TC004 - Add task policy with valid data', async () => {
       const taskPolicyPage = new TaskPolicyPage(page);
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickAddTaskPolicyBtn();
        await page.waitForTimeout(1000);
        await taskPolicyPage.addTaskPolicyDetails('Provide a cough syrup','TestProject','00:15','19','00','18','30','Week','W','11','24','Test the functionality');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskPolicyPage.validateToastMessage('Task Policy Created successfully');

    })

    test('TC005 - Cancel Add task policy', async () => {
       const taskPolicyPage = new TaskPolicyPage(page);
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickAddTaskPolicyBtn();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickBackBtn();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickAddTaskPolicyBtn();
        await page.waitForTimeout(1000);
        await taskPolicyPage.addTaskPolicyDetails('Provide a cough syrup','TestProject','00:15','19','00','18','30','Week','W','11','24','Test the functionality');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickCancelBtn();
        await taskPolicyPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickCancelBtn();
        await taskPolicyPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickCancelBtn();
        await taskPolicyPage.clickConfirmationYes();

    })


    test('TC006 - view task policy', async () => {
       const taskPolicyPage = new TaskPolicyPage(page);
        await page.waitForTimeout(1000);
        await taskPolicyPage.searchTheValue('Test One');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickViewIcon('test one','TestProject');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickBackBtn();
        
    })


    test('TC007 - edit task policy', async () => {
       const taskPolicyPage = new TaskPolicyPage(page);
        await page.waitForTimeout(1000);
        await taskPolicyPage.searchTheValue('Test One');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickEditIcon('test one','TestProject');
        await page.waitForTimeout(1000);
        await taskPolicyPage.editTaskPolicyDetails('Provide a cough syrup','00:10','19','00','18','30','Week','W','11','24','Test the functionality');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickSubmitBtn();
        await taskPolicyPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskPolicyPage.validateToastMessage('Task Policy updated successfully');

        
    })

    test('TC008 - delete task policy', async () => {
       const taskPolicyPage = new TaskPolicyPage(page);
        await page.waitForTimeout(1000);
        await taskPolicyPage.searchTheValue('Provide a cough syrup');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickDeleteIcon('Provide a cough syrup','TestProject');
        await page.waitForTimeout(1000);
        await taskPolicyPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskPolicyPage.validateToastMessage('Task Policy deleted successfully');

        
    })




})