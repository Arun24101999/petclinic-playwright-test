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
        await usersPage.selectUserRoleBtn();
    })

    test('TC003 - Naviagate to Adoption Module', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.navigateToAdoptionRequests();
    })

    // test('TC004 - Accept the Adoption', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickAdoptionRequest('Frontdesk','Hawkman','Frontdesk');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await adoptionPage.acceptBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.acceptBtn.click();
    //     await adoptionPage.clickConfirmationYes();


    // })

    // // test('TC005 - Reject the Adoption', async () => {
    // //     const adoptionPage = new AdoptionPage(page);
    // //     await page.waitForTimeout(2000);
    // //     await adoptionPage.clickAdoptionRequest('Frontdesk','Hawkman','Frontdesk');
    // //     await adoptionPage.clickRejectBtn("Natural");
    // //     await adoptionPage.submitBtn.click();
    // //     await adoptionPage.clickConfirmationYes();



    // // })

    // test('TC006 - Accept the Foster', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickFosterRequest('Ribha', 'Leopard', 'Ribhadharshini B');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.startDate.scrollIntoViewIfNeeded();
    //     await adoptionPage.startDate.click();
    //     await adoptionPage.pickCalenderStartDate('12', 'September', '2025');
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.endDate.click();
    //     await adoptionPage.pickCalenderEndDate('14', 'September', '2025');
    //     await adoptionPage.acceptBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.backBtn.click();
    //     // await adoptionPage.acceptBtn.click();
    //     // await adoptionPage.clickConfirmationYes();


    // })


    // test('TC007 - Reject the Foster', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickFosterRequest('Ribha', 'Leopard', 'Ribhadharshini');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await adoptionPage.backBtn.click();
    // })

    // test('TC008 - Accept the Trial', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickTrialRequest('Ribha', 'Leopard', 'Ribhadharshini B');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.startDate.scrollIntoViewIfNeeded();
    //     await adoptionPage.startDate.click();
    //     await adoptionPage.pickCalenderStartDate('12', 'September', '2025');
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.endDate.click();
    //     await adoptionPage.pickCalenderEndDate('14', 'September', '2025');
    //     await adoptionPage.acceptBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.backBtn.click();
    //     // await adoptionPage.acceptBtn.click();
    //     // await adoptionPage.clickConfirmationYes();

    // })

    // test('TC009 - Reject the Trial', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickTrialRequest('Ribha', 'Leopard', 'Ribhadharshini');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await adoptionPage.backBtn.click();
    // })

    // test('TC010 - Accept the Return', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickReturnRequest('Holy','Holy','Ej Pradeep');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.closeIcon.click();
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.acceptBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //     await adoptionPage.backBtn.click();
    // })

    //  test('TC011 - Reject the Return', async () => {
    //     const adoptionPage = new AdoptionPage(page);
    //     await page.waitForTimeout(2000);
    //     await adoptionPage.clickReturnRequest('Holy','Holy','Ej Pradeep');
    //     await adoptionPage.clickRejectBtn("Natural");
    //     await adoptionPage.submitBtn.click();
    //     await adoptionPage.clickConfirmationNo();
    //      await adoptionPage.closeIcon.click();
    //     await adoptionPage.backBtn.click();
    // })

    test('TC008 - Select Foster Active', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(1000);
        await adoptionPage.clickFosterActive('latin', 'Latin', 'Arun Muthu Sukumar M');
        await adoptionPage.clickCompleteBtn();
        await adoptionPage.confirmationMessageNo();
        await adoptionPage.backBtn.click();
    })

    test('TC009 - Select Trial Active', async () => {
        const adoptionPage = new AdoptionPage(page);
        await page.waitForTimeout(2000);
        await adoptionPage.clickTrialActive('joy', 'Joy', 'Tamilselvi A');
        await adoptionPage.clickCompleteBtn();
        await adoptionPage.confirmationMessageNo();
        await adoptionPage.backBtn.click();
    })











})