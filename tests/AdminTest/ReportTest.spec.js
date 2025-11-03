const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ReportPage } = require('../../POM_AdminPages/ReportPage');



let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";

test.describe('TS03 - Report', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();       //{ viewport: { width: 1366, height: 580 } }
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

    test('TC003 - Navigate to report', async () => {
        const reportPage = new ReportPage(page);
        await reportPage.naviagteToReports();
        await page.waitForTimeout(1000);
    })

    test('TC004 - select start date', async () => {
        const reportPage = new ReportPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const Reportdata = await excelReader.readExcel(pathone, 'ReportTest');
        const { date, month, year } = Reportdata[0];


        await reportPage.pickStartDate(date, month, year);        //'24', 'Jul', '2024'
        await page.waitForTimeout(1000);
    })

    test('TC005- select end date', async () => {
        const reportPage = new ReportPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const Reportdata = await excelReader.readExcel(pathone, 'ReportTest');
        const { date, month, year } = Reportdata[1];

        await reportPage.pickEndDate(date, month, year);      //'24', 'Aug', '2022'
        await page.waitForTimeout(1000);
    })


    test('TC005- select report type', async () => {
        const reportPage = new ReportPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const Reportdata = await excelReader.readExcel(pathone, 'ReportTest');
        const { reporttype } = Reportdata[0];

        await reportPage.selectReportType(reporttype);    //Pet Onboarding
        await page.waitForTimeout(1000);
    })

    test('TC005- submit the report', async () => {
        const reportPage = new ReportPage(page);
        await reportPage.clickSubmitBtn();
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const Reportdata = await excelReader.readExcel(pathone, 'ReportTest');
        const { petid } = Reportdata[0];

        await reportPage.petId.fill(petid);       //27307

    })

    test('TC006- get pet name', async () => {
        const reportPage = new ReportPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const Reportdata = await excelReader.readExcel(pathone, 'ReportTest');
        const { petid } = Reportdata[0];

        await reportPage.petId.fill(petid);       //27307
        const value = await reportPage.getText(petid);        //27307
        console.log(value);


    })







})
