const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_Admin/LoginPage');

const LoginDataset = JSON.parse(JSON.stringify(require('../../utils/LoginPageUtils.json')));
const { Url } = LoginDataset[0];


test.describe('TS01 - Login Test', () => {
   // Login with valid Credentials
    test('TC001 - log in with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(2000);

        const { UserName, Password } = LoginDataset[1];

        await loginPage.login(UserName, Password);
        //await expect(page).toHaveURL(Url);

    })

    test('TC002 - log in with Invalid Username ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(2000);
        const { UserName, Password } = LoginDataset[2];  
        await loginPage.login(UserName, Password);
        const value = await loginPage.getErrorMessage();
        await expect(value).toContain("Email or Mobilenumber not found");

    })

    test('TC003 - log in with Invalid Password ', async ({ page }) => {
       const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(2000);
        const { UserName, Password } = LoginDataset[3];  
        await loginPage.login(UserName, Password);
        const value = await loginPage.getErrorMessage();
        await expect(value).toContain("Invalid Credentials");
    })

    test('TC004 - log in with Invalid Credentials ', async ({ page }) => {
       const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(1000);
        const { UserName, Password } = LoginDataset[4];  
        await loginPage.login(UserName, Password);
        await page.waitForTimeout(1000);
        const value = await loginPage.getValidationErrorMessage();
        await expect(value).toContain("Please give valid mobile number or email");

    })
    



})

