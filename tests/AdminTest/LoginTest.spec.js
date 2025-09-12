const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');



test.describe('TS01 - Login Test', () => {

    // Login with valid Credentials
    test('TC001 - log in with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const urlData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(urlData[0].URL);
        await page.waitForTimeout(2000);
       

        const loginData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = loginData[0];
        await loginPage.login(UserName, Password);
        await page.waitForTimeout(2000);

        const ExpectedUrl  = urlData[0].ExpectedURL;
        await expect(page).toHaveURL(ExpectedUrl);

    })

    // Login with Invalid Username
    test('TC002 - log in with Invalid Username ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const urlData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(urlData[0].URL);
        await page.waitForTimeout(2000);
       

        const loginData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = loginData[1];
        await loginPage.login(UserName, Password);
        await page.waitForTimeout(2000);

        const value = await loginPage.getErrorMessage();
        await expect(value).toContain("Email or Mobilenumber not found");

    })

    // Login with Invalid Password
    test('TC003 - log in with Invalid Password ', async ({ page }) => {
       const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const urlData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(urlData[0].URL);
        await page.waitForTimeout(2000);
       

        const loginData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = loginData[2];
        await loginPage.login(UserName, Password);
        await page.waitForTimeout(2000);

        const value = await loginPage.getErrorMessage();
        await expect(value).toContain("Invalid Credentials");
    })

    // Login with Invalid Credentials
    test('TC004 - log in with Invalid Credentials ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const urlData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(urlData[0].URL);
        await page.waitForTimeout(2000);
       

        const loginData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = loginData[3];
        await loginPage.login(UserName, Password);
        await page.waitForTimeout(2000);
        
        const value = await loginPage.getValidationErrorMessage();
        await expect(value).toContain("Please give valid mobile number or email");

    })

})

