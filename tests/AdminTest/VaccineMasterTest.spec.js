const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { VaccineMasterPage } = require('../../POM_AdminPages/VaccineMasterPage');

let page;
let context;
let pathone = "C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx";

test.describe('TS05 - VaccineMaster', () => {

    //To Launch the Browser
    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();  //{ viewport: { width: 1366, height: 580 } });
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const url = await excelReader.readExcel(pathone, 'URL');
        await loginPage.gotoLoginPage(url[0].URL);
        await page.waitForTimeout(2000);
    })

    //Login to the Application
    test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const LoginDataset = await excelReader.readExcel(pathone, 'LoginTest');
        const { UserName, Password } = LoginDataset[0];
        await page.waitForTimeout(2000);
        await loginPage.login(UserName, Password);

    })

    //Select User Role- Admin
    test('TC002 - Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
        await page.waitForTimeout(2000);
    })

    //Navigate to the Vaccine master module
    test('TC003 - Navigate to VaccineMaster ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.navigateToVaccineMaster();
        await page.waitForTimeout(2000);
    })

    //Add Vaccine Master with valid data
    test('TC004 - Add Vaccine Master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.clickAddVaccineBtn();

        //from excel
        const excelReader = new ExcelReader();
        const VaccineMasterdata = await excelReader.readExcel(pathone, 'VaccineMasterTest');
        const { vaccineName, targetDisease, description, Toast } = VaccineMasterdata[0];

        await vaccineMasterPage.addVaccineMaster(vaccineName, targetDisease, description);
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await vaccineMasterPage.validateToastMessage(Toast)
        await page.waitForTimeout(2000);
    })


    //Cancel the add vaccine master process 
    test('TC005 - Cancel the add vaccine master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        await vaccineMasterPage.clickAddVaccineBtn();
        await vaccineMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickAddVaccineBtn();
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const VaccineMasterdata = await excelReader.readExcel(pathone, 'VaccineMasterTest');
        const { vaccineName, targetDisease, description, Toast } = VaccineMasterdata[1];

        await vaccineMasterPage.addVaccineMaster(vaccineName, targetDisease, description);
        // await vaccineMasterPage.addVaccineMaster('testtwo', 'newtest', 'Testtwo functionality using automation');
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickCancelBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - Edit Vaccine Master', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const VaccineMasterdata = await excelReader.readExcel(pathone, 'VaccineMasterTest');
        const vaccine = (VaccineMasterdata[0].vaccineName);

        await vaccineMasterPage.searchValue(vaccine);
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickEditBtn(vaccine);
        await page.waitForTimeout(1000);

        //from excel
        const { vaccineName, targetDisease, description, Toast } = VaccineMasterdata[2];

        await vaccineMasterPage.editVaccineMaster(vaccineName, targetDisease, description);
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationNo();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.closeIcon.click();
        await vaccineMasterPage.clickSubmitBtn();
        await vaccineMasterPage.clickConfirmationYes();
        await vaccineMasterPage.validateToastMessage(Toast);
        await page.waitForTimeout(2000);
    })

    test('TC008 - view Vaccine Master ', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const VaccineMasterdata = await excelReader.readExcel(pathone, 'VaccineMasterTest');
        const vaccinename = (VaccineMasterdata[2].vaccineName);

        await vaccineMasterPage.searchValue(vaccinename);
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickViewBtn(vaccinename);
        await page.waitForTimeout(1000);
        await vaccineMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete Vaccine Master', async () => {
        const vaccineMasterPage = new VaccineMasterPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const VaccineMasterdata = await excelReader.readExcel(pathone, 'VaccineMasterTest');

        await vaccineMasterPage.searchValue(VaccineMasterdata[2].vaccineName);
        await page.waitForTimeout(1000);
        await vaccineMasterPage.clickDeleteBtn(VaccineMasterdata[2].vaccineName);
        await vaccineMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const value = await vaccineMasterPage.validateToastMessage(VaccineMasterdata[3].Toast);
        if (value === VaccineMasterdata[3].Toast) {
            console.log("Deleted Vaccine Master Successfully: " + value)
        } else {
            console.log("Toast Message not matched :" + value);
        }
    })


})
