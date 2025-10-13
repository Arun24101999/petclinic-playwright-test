const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');

let page;
let context;


test.describe('TS02 - Adoption Requests Module Tests', () => {


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
    })

    test('TC003 - Naviagate to Adoption Module', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.navigateToAdoptionRequests();
    })

    test('TC004 - Accept the Adoption', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.clickAdoptionRequest('Arumugam K', 'Barbie', "Arumugam K");
        await adoptionPage.clickRejectBtn("Natural");
         await page.waitForTimeout(1000);
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationNo();
        await page.waitForTimeout(2000);
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationYes();



    })

    test('TC005 - Reject the Adoption', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickAdoptionRequest('Ear', 'Ear', 'Tamilselvi A');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationYes();

    })

    test('TC006 - Accept the Foster', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickFosterRequest('Blowing', 'Blowing', 'Arunkumar R');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await page.waitForTimeout(2000);
        await adoptionPage.clickConfirmationNo();
          await page.waitForTimeout(2000);
        await adoptionPage.closeIcon.click();
        await page.waitForTimeout(2000);
        await adoptionPage.startDate.scrollIntoViewIfNeeded();
        await adoptionPage.startDate.click();
        await adoptionPage.pickCalenderStartDate('12', 'October', '2025');
        await page.waitForTimeout(2000);
        await adoptionPage.endDate.click();
        await adoptionPage.pickCalenderEndDate('14', 'October', '2025');
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationYes();

    })


    test('TC007 - Reject the Foster', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickFosterRequest('Ribha', 'Leopard', 'Ribhadharshini');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await adoptionPage.backBtn.click();
    })


    test('TC008 - Accept the Trial', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickTrialRequest('Dove', 'Dove', 'Ribhadharshini B');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await page.waitForTimeout(2000);
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await page.waitForTimeout(2000);
        await adoptionPage.startDate.scrollIntoViewIfNeeded();
        await adoptionPage.startDate.click();
        await adoptionPage.pickCalenderStartDate('12', 'October', '2025');
        await page.waitForTimeout(2000);
        await adoptionPage.endDate.click();
        await adoptionPage.pickCalenderEndDate('14', 'October', '2025');
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationYes();

    })
    

    test('TC009 - Reject the Trial', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickTrialRequest('Dory', 'Dory', 'Aisha Begam F');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await adoptionPage.backBtn.click();
    })

    test('TC010 - Accept the Return', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickReturnRequest('Holy', 'Holy', 'Ej Pradeep');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await page.waitForTimeout(2000);
        await adoptionPage.acceptBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.backBtn.click();
    })

    test('TC011 - Reject the Return', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickReturnRequest('Holy', 'Holy', 'Ej Pradeep');
        await adoptionPage.clickRejectBtn("Natural");
        await adoptionPage.submitBtn.click();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.closeIcon.click();
        await adoptionPage.backBtn.click();
    })

    test('TC008 - Select Foster Active', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.clickFosterActive('latin', 'Latin', 'Arun Muthu Sukumar M');
        await adoptionPage.clickCompleteBtn();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.backBtn.click();
    })

    test('TC009 - Select Trial Active', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.clickTrialActive('joy', 'Joy', 'Tamilselvi A');
        await page.waitForTimeout(1000);
        await adoptionPage.clickCompleteBtn();
        await adoptionPage.clickConfirmationNo();
        await adoptionPage.backBtn.click();
    })

    test('TC009 - Select Adoption History Module', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.navigateToAdoptionHistory();
    })

    test('TC009 - Select Adoption History', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.selectAdoptionHistory.click();
        await page.waitForTimeout(1000);
        const getStatusMessage=await adoptionPage.clickAdoptionHistory('Lasseo','Ribhadharshini B','Lasseo');
        console.log("adoption history status is:",getStatusMessage);
    })
    test('TC009 - Select Foster History', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.selectFosterHistory.click();
        await page.waitForTimeout(1000);
        const getStatusMessage=await adoptionPage.clickAdoptionHistory('laliya','Tamilselvi A','Laliya');
        console.log("foster history status is:",getStatusMessage);
    })
    test('TC009 - Select Trial History', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.selectTrialHistory.click();
        await page.waitForTimeout(1000);
        const getStatusMessage=await adoptionPage.clickAdoptionHistory('thing','Arunkumar R','Thing');
        console.log("trial history status is:",getStatusMessage);
    })
    test('TC009 - Select Return History', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.selectReturnHistory.click();
        await page.waitForTimeout(1000);
        const getStatusMessage=await adoptionPage.clickAdoptionHistory('benz','Arun Muthu Sukumar M','Benz');
        console.log("return history status is:",getStatusMessage);
    })











})