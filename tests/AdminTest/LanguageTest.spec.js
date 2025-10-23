const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { LanguagePage } = require('../../POM_AdminPages/LanguagePage');


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

    test('TC003 - Navigate to Language module', async () => {
        const languagePage = new LanguagePage(page);
        await languagePage.navigateToLanguageModule();
    })



    test('TC004 - add language with valid data', async () => {
        const languagePage = new LanguagePage(page);
        const excelReader = new ExcelReader();
        const languageData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LanguageTest');
        await page.waitForTimeout(1000);
        await languagePage.clickAddLanguageBtn();
        await page.waitForTimeout(2000);
        await languagePage.addLanguageDetails(languageData[0].Language);
        await page.waitForTimeout(1000);
        await languagePage.clickSubmitBtn();
        await page.waitForTimeout(1000);
        await languagePage.validateToastMessage(languageData[0].ToastMessage);

    })


    test('TC005 - edit language details', async () => {
        const languagePage = new LanguagePage(page);
        const excelReader = new ExcelReader();
        const languageData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LanguageTest');
        await page.waitForTimeout(1000);
        await languagePage.searchValue(languageData[0].Language);
        await page.waitForTimeout(1000);
        await languagePage.clickEditIcon();
        await page.waitForTimeout(1000);
        await languagePage.editLanguageDetails(languageData[1].Language);
        await page.waitForTimeout(1000);
        await languagePage.clickSubmitBtn();
        await languagePage.clickCloseIcon();
        await page.waitForTimeout(1000)
        await languagePage.clickSubmitBtn();
        await languagePage.clickConfirmationNo();
        await page.waitForTimeout(1000)
        await languagePage.clickSubmitBtn();
        await languagePage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await languagePage.validateToastMessage(languageData[1].Toast);

    })


    test('TC006 - delete langaugae category', async () => {
        const languagePage = new LanguagePage(page);
        const excelReader = new ExcelReader();
        const languageData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LanguageTest');

        await page.waitForTimeout(1000);
        await languagePage.searchValue(languageData[1].Language);
        await page.waitForTimeout(1000);
        await languagePage.clickDeleteIcon();
        await languagePage.closeIcon.click();
        await page.waitForTimeout(1000);
        await languagePage.clickDeleteIcon();
        await languagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await languagePage.clickDeleteIcon();
        await languagePage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await languagePage.validateToastMessage(languageData[2].Toast);
    })

    test('TC007 - add language without data', async () => {
        const languagePage = new LanguagePage(page);
        const excelReader = new ExcelReader();
        const languageData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LanguageTest');

        await page.waitForTimeout(1000);
        await languagePage.clickAddLanguageBtn();
        await page.waitForTimeout(2000);
        await languagePage.clickSubmitBtn();
        const getErrorMessage = await languagePage.getErrorMessage.textContent();
        await expect(getErrorMessage).toContain(languageData[3].Toast);
        await page.waitForTimeout(1000);
        await languagePage.clickCancelBtn();
        await languagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await languagePage.clickCancelBtn();
        await languagePage.clickConfirmationYes();
    })

    test('TC004 - add language using existing data', async () => {
        const languagePage = new LanguagePage(page);
        const excelReader = new ExcelReader();
        const languageData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LanguageTest');

        await page.waitForTimeout(1000);
        await languagePage.clickAddLanguageBtn();
        await page.waitForTimeout(1000);
        await languagePage.addLanguageDetails(languageData[2].Language);
        await page.waitForTimeout(1000);
        const getErrorMessage = await languagePage.getErrorMessage.textContent();
        await expect(getErrorMessage).toContain(languageData[4].Toast);
        await page.waitForTimeout(1000);
        await languagePage.clickCancelBtn();
        await languagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await languagePage.clickCancelBtn();
        await languagePage.clickConfirmationYes();

    })



})