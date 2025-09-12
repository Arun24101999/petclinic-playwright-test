const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');

let context;
let page;



test.describe('TS02 - User Management Test', () => {

    //To Launch the Browser and navigate to the URL
    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const url = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'URL');
        await loginPage.gotoLoginPage(url[0].URL);
        await page.waitForTimeout(2000);

    })

    //To login the Application with valid Credentials
    test('TC001 - Login with valid Credentials', async () => {
        const loginPage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const LoginDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'LoginTest');
        const { UserName, Password } = LoginDataset[0];
        await page.waitForTimeout(2000);
        await loginPage.login(UserName, Password);
    })

    //To select User Role from the dropdown
    test('TC002 - Select User Role', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.selectUserRoleBtn();
    })

    //Navigate to Users Module
    test('TC003 - Navigate to Users Module', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.gotoUsersModule();
        await page.waitForTimeout(1000);
    })

    //Click Add User Button
    test('TC004 - Click Add User Button', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.clickAddUserBtn();


    })

    //To pick the date from the calender field
    test('TC005 - date picker', async () => {
        const usersPage = new UsersPage(page);
        const excelReader = new ExcelReader();
        const UsersPageDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'DOB');
        await usersPage.addUserPickCalender(UsersPageDataset[0].date, UsersPageDataset[0].month, UsersPageDataset[0].year);
        console.log(UsersPageDataset[0].date);
        await page.waitForTimeout(3000);
    })

    //Add User with valid data - (Onboarding user)
    test('TC006 - Add User with valid data', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.addUserUploadPhoto();
        const excelReader = new ExcelReader();
        const UsersPageDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'UserTest');
        const { role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[0];
        await usersPage.addUserWithValidData(role, firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
        
        await usersPage.UploadIdProof.scrollIntoViewIfNeeded();
        await usersPage.addUserIdProof();
        await usersPage.addUserOtherDocuments();
        await usersPage.clickSubmitBtn();
        await usersPage.clickConfirmationYes();
        await usersPage.clickCancelBtn();
        await usersPage.clickConfirmationYes();

    })

    //Add User without mandatory fields
    test('TC007 - Add User without mandatory', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.clickAddUserBtn();
        const printErrorMessage = await usersPage.addUserwithoutMandatoryFields();
        console.log(printErrorMessage);
        await usersPage.clickCancelBtn();
        await usersPage.clickConfirmationYes();


    })

    //Add User with Invalid data
    test('TC008 - Add User with InvalidData', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.clickAddUserBtn();
     const excelReader = new ExcelReader();
        const UsersPageDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'UserTest');
        const { role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo } = UsersPageDataset[1];
        await usersPage.addUserWithInvalidData(role, firstName, lastName, mobileNumber, email, emergencyContactNo, emirateId, trnNo);
        await usersPage.clickSubmitBtn();
        await usersPage.backBtn.click();

    })

    //Select the checkbox in Role dropdown 
    test('TC009 - Select the checkbox in Role dropdown', async () => {
        const usersPage = new UsersPage(page);
        const excelReader = new ExcelReader();
        const UsersPageDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'UserTest');
        const role  = UsersPageDataset[0].role;
        await usersPage.selectCheckbox(role);

    })

    //Search the User and click view button to view the details
    test('TC010 - Search the User and view', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.searchTheUserAndView();


    })

    //Search the User and click edit button to edit the details
    test('TC011 - Search the User and edit', async () => {
        const usersPage = new UsersPage(page);
        await usersPage.searchTheUserAndEdit();
        const excelReader = new ExcelReader();
        const UsersPageDataset = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'UserTest');
        const { firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo } = UsersPageDataset[2];
        await usersPage.editUserWithValidData(firstName, lastName, gender, language, mobileNumber, email, maritalStatus, emergencyContactNo, address, emirateValue, emirateId, trnNo);
        await usersPage.clickSubmitBtn();
        await usersPage.clickConfirmationYes();
       
    })  



})