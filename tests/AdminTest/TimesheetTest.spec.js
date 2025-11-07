const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TimesheetPage } = require('../../POM_AdminPages/TimesheetPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS03 - Material Category', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();  //{ viewport: { width: 1366, height: 580 } }
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const url = await excelReader.readExcel(pathone, 'URL');
        await loginPage.gotoLoginPage(url[0].URL);
        await page.waitForTimeout(2000);
    })

    test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const LoginDataset = await excelReader.readExcel(pathone, 'LoginTest');
        const { UserName, Password } = LoginDataset[0];
        await page.waitForTimeout(2000);
        await loginPage.login(UserName, Password);

    })

    test('TC002 - Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to Task Management', async () => {
        const timesheetPage = new TimesheetPage(page);
        await timesheetPage.navigateToTimesheet();
    })



    test('TC004 - print the task details', async () => {
        const timesheetPage = new TimesheetPage(page);
        await page.waitForTimeout(1000);
        //from excel
        const excelReader = new ExcelReader();
        const Timesheetdata = await excelReader.readExcel(pathone, 'TimesheetTest');
        const { task, user } = Timesheetdata[0];

        await timesheetPage.searchValue(task);
        // await timesheetPage.searchValue('give a paracetomol for 5 piece');
        // await timesheetPage.searchValue('give a paracetomol for 5 piece');
        await page.waitForTimeout(1000);

        await timesheetPage.selectUserDropdown(user);
        // await timesheetPage.selectUserDropdown('Arun Muthu Sukumar M ');
        // await timesheetPage.selectUserDropdown('Arun Muthu Sukumar M ');
        await page.waitForTimeout(1000)
        const getTaskDetails = await timesheetPage.getDetails();
        console.log('Task Details are in Below: ' + getTaskDetails);

    })




})