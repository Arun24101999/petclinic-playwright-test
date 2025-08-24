const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../POM_Admin/LoginPage');
const { UsersPage } = require('../POM_Admin/UsersPage');

const LoginDataset = JSON.parse(JSON.stringify(require('../Utils/LoginPageUtils.json')));
const { Url } = LoginDataset[0];
const UsersPageDataset = JSON.parse(JSON.stringify(require('../Utils/UserPageUtils.json')));
let context;
let page;


test.describe('User Management Test', () => {

    test.beforeAll('Login with valid Credentials', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(Url);
        await page.waitForTimeout(2000);
        const { UserName, Password } = LoginDataset[1];
        await loginPage.login(UserName, Password);
    })


    test('Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
    })


    test('Navigate to Users Module', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.gotoUsersModule();
        await page.waitForTimeout(1000);
    })


    test('Click Add User Button', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.clickAddUserBtn();


    })

    test('date picker', async () => {
        const usersPage = new UsersPage(page);
        const { date, month, year } = UsersPageDataset[2];
        await usersPage.addUserPickCalender(date, month, year );
        await page.waitForTimeout(3000);
    })


    // test('Add User with valid data', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.addUserUploadPhoto();
    //     const { role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[0];
    //     await usersPage.addUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
    //     await usersPage.UploadIdProof.scrollIntoViewIfNeeded();
    //     await usersPage.addUserIdProof();
    //     await usersPage.addUserOtherDocuments();
    //     await usersPage.clickSubmitBtn();
    //     await page.pause();
    //     await usersPage.backBtn.click();
    // })

    // test('Add User without mandatory', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.clickAddUserBtn();
    //     const printErrorMessage = await usersPage.addUserwithoutMandatoryFields();
    //     console.log(printErrorMessage);
    //     await usersPage.clickCancelBtn();


    // })

    // test('Add User with InvalidData', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.clickAddUserBtn();
    //     const { role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo } = UsersPageDataset[1];
    //     await usersPage.addUserWithInvalidData(role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo);
    //     await usersPage.clickSubmitBtn();
    //     await usersPage.backBtn.click();

    // })


    // test('Select the checkbox in Role dropdown', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.selectCheckbox('AWC Admin');



    // })

    // test('Search the User and view', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.searchTheUserAndView();

    // })

    // test('Search the User and edit', async () => {
    //     const usersPage = new UsersPage(page);
    //     await usersPage.searchTheUserAndEdit();
    //     const { role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[0];
    //     await usersPage.editUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
    // })



})