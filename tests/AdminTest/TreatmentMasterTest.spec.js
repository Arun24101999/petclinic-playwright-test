const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TreatmentMasterPage } = require('../../POM_AdminPages/TreatmentMasterPage');
 
let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";
 
test.describe('TS05 - Service Category', () => {
 
 
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
 
    test('TC003 - Navigate to TreatmentMaster ', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
        await treatmentMasterPage.navigateToTreatmentMaster();
        await page.waitForTimeout(2000);
    })
 
    test('TC004 - Add Treatment Master', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
        await treatmentMasterPage.clickAddTreatmentBtn();
        //from excel
        const excelReader = new ExcelReader();
        const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const { treatmentName, targetDisease, description, Toast } = TreatmentMasterdata[0];
 
        await treatmentMasterPage.addTreatmentMaster(treatmentName, targetDisease, description);
        // await treatmentMasterPage.addTreatmentMaster('Neotetra', 'All Disease', 'Testone functionality using automation');
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.closeIcon.click();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationNo();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationYes();
        await treatmentMasterPage.validateToastMessage(Toast)
        await page.waitForTimeout(2000);
    })
 
    test('TC005 - Cancel the add Treatment Master', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
        await treatmentMasterPage.clickAddTreatmentBtn();
        await treatmentMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
        await treatmentMasterPage.clickAddTreatmentBtn();
        await page.waitForTimeout(1000);
        //from excel
        const excelReader = new ExcelReader();
        const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const { treatmentName, targetDisease, description, Toast } = TreatmentMasterdata[1];
 
 
        await treatmentMasterPage.addTreatmentMaster(treatmentName, targetDisease, description);
        // await treatmentMasterPage.addTreatmentMaster('testtwo', 'newtest', 'Testtwo functionality using automation');
        await treatmentMasterPage.clickCancelBtn();
        await treatmentMasterPage.clickConfirmationNo();
        await treatmentMasterPage.clickCancelBtn();
        await treatmentMasterPage.closeIcon.click();
        await treatmentMasterPage.clickCancelBtn();
        await treatmentMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })
 
    test('TC006 - edit Treatment Master', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
 
        //from excel
        const excelReader = new ExcelReader();
        const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const treatment = (TreatmentMasterdata[0].treatmentName);
 
        await treatmentMasterPage.searchValue(treatment);
        await page.waitForTimeout(1000);
        await treatmentMasterPage.clickEditBtn(treatment);
        await page.waitForTimeout(1000);
        //from excel
        // const excelReader = new ExcelReader();
        // const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const { treatmentName, targetDisease, description, Toast } = TreatmentMasterdata[2];
 
        await treatmentMasterPage.editTreatmentMaster(treatmentName, targetDisease, description);
        // await treatmentMasterPage.editTreatmentMaster('deotetra', 'testvalue', 'Testtwo functionality using automation');
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationNo();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.closeIcon.click();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationYes();
        await treatmentMasterPage.validateToastMessage(Toast);
        // await treatmentMasterPage.validateToastMessage('Treatment details updated successfully');
        await page.waitForTimeout(2000);
    })
 
    test('TC007 - view Treatment Master', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const { treatmentName } = TreatmentMasterdata[2];
 
        await treatmentMasterPage.searchValue(treatmentName);
        // await treatmentMasterPage.searchValue('deotetra');
        await page.waitForTimeout(1000);
        await treatmentMasterPage.clickViewBtn(treatmentName);
        //  await treatmentMasterPage.clickViewBtn('deotetra');
        await page.waitForTimeout(1000);
        await treatmentMasterPage.backBtn.click();
        await page.waitForTimeout(1000);
    })
 
    test('TC008 - delete Treatment Master', async () => {
        const treatmentMasterPage = new TreatmentMasterPage(page);
        //from excel
        const excelReader = new ExcelReader();
        const TreatmentMasterdata = await excelReader.readExcel(pathone, 'TreatmentMasterTest');
        const { treatmentName } = TreatmentMasterdata[2];
        const { Toast } = TreatmentMasterdata[3];
 
        await treatmentMasterPage.searchValue(treatmentName);
        await page.waitForTimeout(1000);
        await treatmentMasterPage.clickDeleteBtn(treatmentName);
        await treatmentMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        //  await treatmentMasterPage.validateToastMessage('Treatment details deleted successfully');
        await treatmentMasterPage.validateToastMessage(Toast);
        await page.waitForTimeout(2000);
    })
 
 
})
 