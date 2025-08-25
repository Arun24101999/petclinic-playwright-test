const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_Admin/LoginPage');
const { UsersPage } = require('../../POM_Admin/UsersPage');

// Make sure the path is correct and the file exists
const LoginDataset = JSON.parse(JSON.stringify(require('../../utils/LoginPageUtils.json')));
const { Url } = LoginDataset[0];
const UsersPageDataset = JSON.parse(JSON.stringify(require('../../utils/UserPageUtils.json')));
let context;
let page;


test.describe('TS02 - User Management Test', () => {

    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(2000);
       
    })

     test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const { UserName, Password } = LoginDataset[1];
        await page.waitForTimeout(2000);
        await loginPage.login(UserName, Password);
    })


    test('TC002 - Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
    })


    test('TC003 - Navigate to Users Module', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.gotoUsersModule();
        await page.waitForTimeout(1000);
    })


    test('TC004 - Click Add User Button', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.clickAddUserBtn();


    })

    test('TC005 - date picker', async () => {
        const usersPage = new UsersPage(page);
        const { date, month, year } = UsersPageDataset[2];
        await usersPage.addUserPickCalender(date, month, year );
        await page.waitForTimeout(3000);
    })


    test('TC006 - Add User with valid data', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.addUserUploadPhoto();
        const { role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[0];
        await usersPage.addUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
        await usersPage.UploadIdProof.scrollIntoViewIfNeeded();
        await usersPage.addUserIdProof();
        await usersPage.addUserOtherDocuments();
        await usersPage.clickCancelBtn();
        await usersPage.backBtn.click();
    })
    

    // test('TC007 - Add User without mandatory', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.clickAddUserBtn();
    //     const printErrorMessage = await usersPage.addUserwithoutMandatoryFields();
    //     console.log(printErrorMessage);
    //     await usersPage.clickCancelBtn();


    // })

    // test('TC008 - Add User with InvalidData', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.clickAddUserBtn();
    //     const { role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo } = UsersPageDataset[1];
    //     await usersPage.addUserWithInvalidData(role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo);
    //     await usersPage.clickSubmitBtn();
    //     await usersPage.backBtn.click();

    // })


    // test('TC009 - Select the checkbox in Role dropdown', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.selectCheckbox('AWC Admin');



    // })

    // test('TC010 - Search the User and view', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.searchTheUserAndView();

    // })

    // test('TC011 - Search the User and edit', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.searchTheUserAndEdit();
    //     const { role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[0];
    //     await usersPage.editUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
    // })



})