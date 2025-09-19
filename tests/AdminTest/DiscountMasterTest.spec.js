const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TreatmentMasterPage } = require('../../POM_AdminPages/TreatmentMasterPage');

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

    test('TC003 - Navigate to DiscountMaster ', async () => {
        const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.navigateToDiscountMaster();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add discount Master', async () => {
        const discountMasterPage = new DiscountMasterPage(page);
        await discountMasterPage.clickAddDiscountBtn();
        await discountMasterPage.addDiscountMaster('discountName', 'Amount', '20', 'GST20','Arun','description');
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.closeIcon.click();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationNo();
        await treatmentMasterPage.clickSubmitBtn();
        await treatmentMasterPage.clickConfirmationYes();
        await treatmentMasterPage.validateToastMessage('Treatment details created successfully')
        await page.waitForTimeout(2000);
    })

    // test('TC005 - Cancel the add Treatment Master', async () => {
    //     const treatmentMasterPage = new TreatmentMasterPage(page);
    //     await treatmentMasterPage.clickAddTreatmentBtn();
    //     await treatmentMasterPage.backBtn.click();
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.clickAddTreatmentBtn();
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.addTreatmentMaster('testtwo', 'newtest', 'Testtwo functionality using automation');
    //     await treatmentMasterPage.clickCancelBtn();
    //     await treatmentMasterPage.clickConfirmationNo();
    //     await treatmentMasterPage.clickCancelBtn();
    //     await treatmentMasterPage.closeIcon.click();
    //     await treatmentMasterPage.clickCancelBtn();
    //     await treatmentMasterPage.clickConfirmationYes();
    //     await page.waitForTimeout(2000);
    // })

    // test('TC006 - edit Treatment Master', async () => {
    //    const treatmentMasterPage = new TreatmentMasterPage(page);
    //     await treatmentMasterPage.searchValue('Neotetra');
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.clickEditBtn('Neotetra');
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.editTreatmentMaster('deotetra', 'testvalue', 'Testtwo functionality using automation');
    //     await treatmentMasterPage.clickSubmitBtn();
    //     await treatmentMasterPage.clickConfirmationNo();
    //     await treatmentMasterPage.clickSubmitBtn();
    //     await treatmentMasterPage.closeIcon.click();
    //     await treatmentMasterPage.clickSubmitBtn();
    //     await treatmentMasterPage.clickConfirmationYes();
    //     await treatmentMasterPage.validateToastMessage('Treatment details updated successfully');
    //     await page.waitForTimeout(2000);
    // })

    // test('TC008 - view Treatment Master', async () => {
    //    const treatmentMasterPage = new TreatmentMasterPage(page);
    //     await treatmentMasterPage.searchValue('deotetra');
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.clickViewBtn('deotetra');
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.backBtn.click();
    //     await page.waitForTimeout(1000);
    // })

    // test('TC009 - delete Treatment Master', async () => {
    //    const treatmentMasterPage = new TreatmentMasterPage(page);
    //     await treatmentMasterPage.searchValue('deotetra');
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.clickDeleteBtn('deotetra');
    //     await treatmentMasterPage.clickConfirmationYes();
    //     await page.waitForTimeout(1000);
    //     await treatmentMasterPage.validateToastMessage('Treatment details deleted successfully');
    //     await page.waitForTimeout(2000);
    // })


})