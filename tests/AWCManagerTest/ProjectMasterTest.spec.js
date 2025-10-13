const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ProjectMasterPage } = require('../../POM_AdminPages/ProjectMasterPage');


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
        await usersPage.selectUserRoleOption('AWC Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to Task Policy', async () => {
        const projectMasterPage = new ProjectMasterPage(page);
        await projectMasterPage.navigateToProjectMaster();
    })


    // test('TC004 - Add task policy with valid data', async () => {
    //     const projectMasterPage = new ProjectMasterPage(page);
    //     await page.waitForTimeout(1000);
    //     await projectMasterPage.clickAddProjectBtn();
    //     await page.waitForTimeout(1000);
    //     await projectMasterPage.addProjectDetails('Ak Project', 'arunstore', 'Tamilselvi', 'Test the functionality', 'ToDo', 'Inprogress', 'Completed (Is completed stage)');
    //     await page.waitForTimeout(1000);
    //     await projectMasterPage.clickSubmitBtn();
    //     await projectMasterPage.clickCloseIcon();
    //     await page.waitForTimeout(1000);
    //     await projectMasterPage.clickSubmitBtn();
    //     await projectMasterPage.clickConfirmationNo();
    //     await page.waitForTimeout(1000);
    //     await projectMasterPage.clickSubmitBtn();
    //     await projectMasterPage.clickConfirmationYes();
    //     await page.waitForTimeout(1000)
    //     await projectMasterPage.validateToastMessage('Project created successfully');

    // })

    test('TC005 - Cancel Add project ', async () => {
        const projectMasterPage = new ProjectMasterPage(page);
        await page.waitForTimeout(1000);
        await projectMasterPage.clickAddProjectBtn();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickBackBtn();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickAddProjectBtn();
        await page.waitForTimeout(1000);
        await projectMasterPage.addProjectDetails('Ak Project', 'arunstore', 'Tamilselvi', 'Test the functionality', 'ToDo', 'Inprogress', 'Completed (Is completed stage)');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickCancelBtn();
        await projectMasterPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickCancelBtn();
        await projectMasterPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickCancelBtn();
         await projectMasterPage.clickConfirmationYes();

    })


    test('TC006 - view project master', async () => {
       const projectMasterPage = new ProjectMasterPage(page);
        await page.waitForTimeout(1000);
        await projectMasterPage.searchTheValue('ak project');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickViewIcon('Ak Project');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickBackBtn();

    })


    test('TC007 - edit project master', async () => {
        const projectMasterPage = new ProjectMasterPage(page);
        await page.waitForTimeout(1000);
        await projectMasterPage.searchTheValue('ak project');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickEditIcon('Ak Project');
        await page.waitForTimeout(1000);
        await projectMasterPage.editProjectDetails('Ak Project', 'arunstore', 'Ribhadharshini', 'Test the functionality');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickSubmitBtn();
        await projectMasterPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickSubmitBtn();
        await projectMasterPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await projectMasterPage.clickSubmitBtn();
        await projectMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await projectMasterPage.validateToastMessage('Project updated successfully');


    })

    test('TC008 - delete project master', async () => {
           const projectMasterPage = new ProjectMasterPage(page);
        await page.waitForTimeout(1000);
        await projectMasterPage.searchTheValue('Ak Project');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickDeleteIcon('Ak Project');
        await page.waitForTimeout(1000);
        await projectMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await projectMasterPage.validateToastMessage('Project deleted successfully');


    })




})