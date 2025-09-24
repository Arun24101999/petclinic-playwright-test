const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { PrivateUserPage } = require('../../POM_AdminPages/PrivateUserPage');

let page;
let context;


test.describe('TS08 - Private User', () => {


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

    test('TC003 - Navigate to private user', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.navigateToPrivateUser();
        await page.waitForTimeout(2000);
    })

    // test('TC004 - add user', async () => {
    //     const privateUserPage = new PrivateUserPage(page);
    //     await privateUserPage.clickAddUserBtn();
    //     await privateUserPage.addProfileImage();
    //     await page.waitForTimeout(2000);
    //     await privateUserPage.addUserWithValidData('Private Admin', 'arumugam', 'AutoFirstName', 'AutoLastName', 'Male', 'English', '9876543210', 'auto@gmail.com', 'Single', '9876543210', 'No 10, Street, City', '123456789012345', 'Ajman', '1234');
    //     await privateUserPage.addUserPickCalender('24', 'Oct', '1999');
    //     await privateUserPage.addIdProof();
    //     await privateUserPage.addOthersImage();
    //     await privateUserPage.clickSubmitBtn();
    //     await privateUserPage.closeIcon.click();
    //     await privateUserPage.clickSubmitBtn();
    //     await privateUserPage.clickConfirmationNo();
    //     await privateUserPage.clickSubmitBtn();
    //     await privateUserPage.clickConfirmationYes();
    //     await privateUserPage.validateToastMessage('Private user added successfully');
    //     await page.waitForTimeout(2000);
    // })

    // test('TC005 - Cancel add user', async () => {
    //     const privateUserPage = new PrivateUserPage(page);
    //     await privateUserPage.clickAddUserBtn();
    //     await privateUserPage.backBtn.click();
    //     await privateUserPage.clickAddUserBtn();
    //      await privateUserPage.addUserPickCalender('24', 'Oct', '1999');
    //     await privateUserPage.addProfileImage();
    //     await privateUserPage.addUserWithValidData('Private Admin', 'arumugam', 'AutoFirstName', 'AutoLastName', 'Male', 'English', '9876543210', 'auto@gmail.com', 'Single', '9876543210', 'No 10, Street, City', '123456789012345', 'Ajman', '1234');
    //     await privateUserPage.addIdProof();
    //     await privateUserPage.addOthersImage();
    //     await privateUserPage.clickCancelBtn();
    //      await privateUserPage.closeIcon.click();
    //      await privateUserPage.clickCancelBtn();
    //     await privateUserPage.clickConfirmationNo();
    //     await privateUserPage.clickCancelBtn();
    //     await privateUserPage.clickConfirmationYes();
    //     await page.waitForTimeout(2000);
    // })

    //Active Tab
    test('TC006 - Select Active Tab', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.selectActiveTab();
        const count = await privateUserPage.getActiveCount.textContent();
        console.log("Active Count is :", count);

    })

    test('TC007 - view the user details', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.searchValue('9500285403');
        await privateUserPage.clickViewBtn('9500285403');
        await privateUserPage.backBtn.click();



    })

    test('TC008 - edit the user details', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.searchValue('9500285403');
        await privateUserPage.clickEditBtn('9500285403');
        //  await privateUserPage.addProfileImage();
        // await page.waitForTimeout(2000);
        // await privateUserPage.addUserWithValidData('Private Admin', 'arumugam', 'AutoFirstName', 'AutoLastName', 'Male', 'English', '9876543210', 'auto@gmail.com', 'Single', '9876543210', 'No 10, Street, City', '123456789012345', 'Ajman', '1234');
        // await privateUserPage.addUserPickCalender('24', 'Oct', '1999');
        // await privateUserPage.addIdProof();
        // await privateUserPage.addOthersImage();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.backBtn.click();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.clickConfirmationNo();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.clickConfirmationYes();
        // await privateUserPage.validateToastMessage('Private user updated successfully');
        // await page.waitForTimeout(2000);
        await privateUserPage.backBtn.click();


    })



    //InActive Tab
    test('TC009 - Select InActive Tab', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.selectInActiveTab();
        const Inactivecount = await privateUserPage.getInActiveCount.textContent();
        console.log("InActive Count is :", Inactivecount);

    })

    test('TC010 - view the user details', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.searchValue('9500285403');
        await privateUserPage.clickViewBtn('9500285403');
        await privateUserPage.backBtn.click();



    })

    // test('TC011 - edit the user details', async () => {
    //     const privateUserPage = new PrivateUserPage(page);
    //     await privateUserPage.searchValue('9500285403');
    //     await privateUserPage.clickEditBtn('9500285403');
        // await privateUserPage.addProfileImage();
        // await page.waitForTimeout(2000);
        // await privateUserPage.addUserWithValidData('Private Admin', 'arumugam', 'AutoFirstName', 'AutoLastName', 'Male', 'English', '9876543210', 'auto@gmail.com', 'Single', '9876543210', 'No 10, Street, City', '123456789012345', 'Ajman', '1234');
        // await privateUserPage.addUserPickCalender('24', 'Oct', '1999');
        // await privateUserPage.addIdProof();
        // await privateUserPage.addOthersImage();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.backBtn.click();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.clickConfirmationNo();
        // await privateUserPage.clickSubmitBtn();
        // await privateUserPage.clickConfirmationYes();
        // await privateUserPage.validateToastMessage('Private user updated successfully');
        // await page.waitForTimeout(2000);



    // })

    test('TC012 - filter the user with Roles', async () => {
        const privateUserPage = new PrivateUserPage(page);
        await privateUserPage.searchValue('9500285403');
        await privateUserPage.clickEditBtn('9500285403');
        const getUserNames = await privateUserPage.selectRolesDropdown('Private Veterinarian');



    })




})