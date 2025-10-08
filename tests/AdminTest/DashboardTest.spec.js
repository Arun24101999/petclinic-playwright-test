const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { DashboardPage } = require('../../POM_AdminPages/DashboardPage');


let page;
let context;


test.describe('TS03 - DashboardPage', () => {


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
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToDashboard();
    })


    test('TC004 - get Income details', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        await dashboardPage.clickTodayBtn();
        const todayIncomeDetails = await dashboardPage.getIncomeDetails();
        console.log(todayIncomeDetails);

        await dashboardPage.clickWeekBtn();
        const weekIncomeDetails = await dashboardPage.getIncomeDetails();
        console.log(weekIncomeDetails);

    })

    test('TC005 - get Top service & Material', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        const serviceDetails = await dashboardPage.getTopServiceAndMaterials();
        console.log(serviceDetails);

    })

    test('TC005 - get pet details', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        const petDetails = await dashboardPage.getPetDetails();
        console.log(petDetails);

    })

    test('TC005 - get adoption details', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        const adoptionDetails = await dashboardPage.getAdoptionDetails();
        console.log(adoptionDetails);

    })

    test('TC005 - get no of pet details', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        const petDetails = await dashboardPage.getNoOfPetsDetails();
        console.log(petDetails);

    })

    test('TC006 - view details', async () => {
        const dashboardPage = new DashboardPage(page);
        await page.waitForTimeout(1000);
        await dashboardPage.getInvoiceDetails();
        await dashboardPage.getAppointmentDetails();
        await dashboardPage.getTaskManagementDetails();
        await dashboardPage.getConsumptionInAwcAreaWiseDetails();
        await dashboardPage.getGoodsReceivedDetails();
        await dashboardPage.getGoodsIssueDetails();
        await dashboardPage.getConsumptionInOporIpDetails();
        await dashboardPage.getTop5MaterialsConsumedByCountDetails();
        await dashboardPage.getOnboardingDetails();
        await dashboardPage.getStraySurrenderDetails();
       

    })






})