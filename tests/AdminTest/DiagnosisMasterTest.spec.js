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

        //from excel
        const excelReader = new ExcelReader();
        const DiagnosisMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiagnosisMasterTest');
        const NameOfdiagnosis = (DiagnosisMasterData[0].diagnosisName);
        const diagnosisDescription = (DiagnosisMasterData[0].description);

        await diagnosisMasterPage.addDiagnosisDetails(NameOfdiagnosis, diagnosisDescription);
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickCloseIcon();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationNo();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        //from excel
        const getToastMessage = (DiagnosisMasterData[0].ToastMessage);
        await diagnosisMasterPage.validateToastMessage(getToastMessage);

    })


    test('TC005 - edit diagnosis', async () => {
        const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await page.waitForTimeout(1000);
        //from excel
        const excelReader = new ExcelReader();
        const DiagnosisMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiagnosisMasterTest');
        //from excel
        const diagnosisMasterSearch = (DiagnosisMasterData[0].diagnosisSearch);
        await diagnosisMasterPage.searchTheValue(diagnosisMasterSearch)
        await page.waitForTimeout(2000);
        await diagnosisMasterPage.clickEditIcon();
        //from excel
        const NameOfdiagnosis = (DiagnosisMasterData[1].diagnosisName);
        const diagnosisDescription = (DiagnosisMasterData[1].description);


        await diagnosisMasterPage.editDiagnosisDetails(NameOfdiagnosis, diagnosisDescription);
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickCloseIcon();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationNo();
        await diagnosisMasterPage.clickSubmitBtn();
        await diagnosisMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        //from excel
        const getToastMessage = (DiagnosisMasterData[1].ToastMessage);
        await diagnosisMasterPage.validateToastMessage(getToastMessage);

    })

    test('TC006 - view diagnosis master', async () => {
        const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await page.waitForTimeout(1000);


        //from excel
        const excelReader = new ExcelReader();
        const DiagnosisMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiagnosisMasterTest');
        //from excel
        const diagnosisMasterSearch = (DiagnosisMasterData[1].diagnosisSearch);

        await diagnosisMasterPage.searchTheValue(diagnosisMasterSearch)
        await page.waitForTimeout(1000);
        await diagnosisMasterPage.clickViewIcon();
        await page.waitForTimeout(2000);
        await diagnosisMasterPage.backBtn.click();


    })

    test('TC007 - delete diagnosis master', async () => {
        const diagnosisMasterPage = new DiagnosisMasterPage(page);
        await page.waitForTimeout(1000);
        //from excel
        const excelReader = new ExcelReader();
        const DiagnosisMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DiagnosisMasterTest');
        //from excel
        const diagnosisMasterSearch = (DiagnosisMasterData[1].diagnosisSearch);

        await diagnosisMasterPage.searchTheValue(diagnosisMasterSearch)
        await page.waitForTimeout(1000);
        await diagnosisMasterPage.clickDeleteIcon();
        await diagnosisMasterPage.closeIcon.click();
        await diagnosisMasterPage.clickDeleteIcon();
        await diagnosisMasterPage.clickConfirmationNo();
        await diagnosisMasterPage.clickDeleteIcon();
        await diagnosisMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        //from excel
        const getToastMessage = (DiagnosisMasterData[2].ToastMessage);
        await diagnosisMasterPage.validateToastMessage(getToastMessage);
    })


})