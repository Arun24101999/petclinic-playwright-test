const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { VaccineMasterPage } = require('../../POM_AdminPages/VaccineMasterPage');

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

    test('TC003 - Navigate to VaccineMaster ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.navigateToVaccineMaster();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add Vaccine Master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.clickAddVaccineBtn();
        await vaccineMasterPage.addVaccineMaster('Neotetra', 'All Disease', 'Testone functionality using automation');
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await vaccineMasterPage.validateToastMessage('Vaccine details created successfully')
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel the add vaccine master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.clickAddVaccineBtn();
        await vaccineMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickAddVaccineBtn();
        await page.waitForTimeout(1000);
        await vaccineMasterPage.addVaccineMaster('testtwo', 'newtest', 'Testtwo functionality using automation');
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit Vaccine Master', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.searchValue('Neotetra');
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickEditBtn('Neotetra');
        await page.waitForTimeout(1000);
        await vaccineMasterPage.editVaccineMaster('deotetra', 'testvalue', 'Testtwo functionality using automation');
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await vaccineMasterPage.validateToastMessage('Vaccine details updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view Vaccine Master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.searchValue('deotetra');
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickViewBtn('deotetra');
        await page.waitForTimeout(1000);
        await vaccineMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC007 - delete Vaccine Master', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.searchValue('deotetra');
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickDeleteBtn('deotetra');
        await vaccineMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await vaccineMasterPage.validateToastMessage('Vaccine details deleted successfully');
        await page.waitForTimeout(2000);
    })


})