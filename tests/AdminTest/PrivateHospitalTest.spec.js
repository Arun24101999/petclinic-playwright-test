const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { DiscountMasterPage } = require('../../POM_AdminPages/DiscountMasterPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { PrivateHospitalPage } = require('../../POM_AdminPages/PrivateHospitalPage');

let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";

test.describe('TS08 - Private Hospital', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();       //{ viewport: { width: 1366, height: 580 } }
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

    test('TC003 - Navigate to private hospital', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);
        await privateHospitalPage.navigateToPrivateHospitalPage();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add hospital', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);
        await privateHospitalPage.clickAddHospitalBtn();
        await privateHospitalPage.addProfileImage();

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress, toast } = PrivateHospitaldata[0];

        await privateHospitalPage.addHospitalDetails(hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress);
        // await privateHospitalPage.addHospitalDetails('Arumugam', 'K', '8056221601', 'arumuganainar.k@medyaan.com', '123', 'Sharjah', 'SaudiArabia', "1", "2", "3", "4", 'No 12, Moulna Nagar,Tambaram, Chennai');
        await privateHospitalPage.clickSubmitBtn();
        await privateHospitalPage.clickConfirmationMessageNo();
        await privateHospitalPage.clickSubmitBtn();
        await privateHospitalPage.clickConfirmationYes();
        await privateHospitalPage.validateToastMessage(toast);
        // await privateHospitalPage.validateToastMessage("Hospital Detailes created successfully");
        await page.waitForTimeout(2000);
        await privateHospitalPage.backBtn.click();

    })


    test('TC005 - Cancel Add hospital', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);
        await privateHospitalPage.clickAddHospitalBtn();

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress, toast } = PrivateHospitaldata[0];

        await privateHospitalPage.addHospitalDetails(hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress);

        // await privateHospitalPage.addHospitalDetails('Arumugam', 'K', '8056221601', 'arumuganainar.k@medyaan.com', '123', 'Sharjah', 'SaudiArabia', '1', '2', '3', '4', 'No 12, Moulna Nagar,Tambaram, Chennai');
        await privateHospitalPage.clickCancelBtn();
        await privateHospitalPage.clickConfirmationNo();
        await privateHospitalPage.clickCancelBtn();
        await privateHospitalPage.closeIcon.click();
        await privateHospitalPage.clickCancelBtn();
        await privateHospitalPage.clickConfirmationYes();
        await page.waitForTimeout(2000);

    })


    test('TC005 - select active tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);
        await privateHospitalPage.selectActiveTab();
        const count = await privateHospitalPage.getActiveCount.textContent();
        console.log("Private Hospital Active count is ", count);

    })
    test('TC006 - view Hospital in active tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalname } = PrivateHospitaldata[1];

        await privateHospitalPage.searchValue(hospitalname);  //Medyaans
        await privateHospitalPage.clickViewBtn(hospitalname);    //Medyaans
        await privateHospitalPage.backBtn.click();
        await page.waitForTimeout(2000);
    })

    test('TC007 - edit Hospital in active tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalname } = PrivateHospitaldata[1];
        const { hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress } = PrivateHospitaldata[0];
        const { toast } = PrivateHospitaldata[1];


        await privateHospitalPage.searchValue(hospitalname);  //Medyaans
        await privateHospitalPage.clickEditBtn(hospitalname); //Medyaans
        await privateHospitalPage.addHospitalDetails(hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress);
        // await privateHospitalPage.addHospitalDetails('Arumugam', 'K', '8056221601', 'arumuganainar.k@medyaan.com', '123', 'Sharjah', 'SaudiArabia', '1', '2', '3', '4', 'No 12, Moulna Nagar,Tambaram, Chennai');
        await privateHospitalPage.clickSubmitBtn();
        await privateHospitalPage.clickConfirmationYes();
        await privateHospitalPage.validateToastMessage(toast);
        // await privateHospitalPage.validateToastMessage("Hospital Detailes updated successfully");
        await page.waitForTimeout(2000);

    })


    test('TC008 - select Inactive tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);
        await privateHospitalPage.selectInActiveTab();
        const count = await privateHospitalPage.getInActiveCount.textContent();
        console.log("Private Hospital InActive count is ", count);

    })

    test('TC009 - view Hospital in Inactive tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalname } = PrivateHospitaldata[2];

        await privateHospitalPage.searchValue(hospitalname);       //RAK
        await privateHospitalPage.clickViewBtn(hospitalname);      //RAK
        await privateHospitalPage.backBtn.click();
        await page.waitForTimeout(2000);
    })

    test('TC0010 - edit Hospital in Inactive tab', async () => {
        const privateHospitalPage = new PrivateHospitalPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const PrivateHospitaldata = await excelReader.readExcel(pathone, 'PrivateHospitalTest');
        const { hospitalname } = PrivateHospitaldata[2];
        const { hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress } = PrivateHospitaldata[0];
        const { toast } = PrivateHospitaldata[1];

        await privateHospitalPage.searchValue(hospitalname);   //RAK
        await privateHospitalPage.clickEditBtn(hospitalname);  //RAK
        await privateHospitalPage.addHospitalDetails(hospitalName, prefix, hospitalContactNumber, hospitalEmail, hospitalTNR, emirate, country, privateAdmin, privateVeterinarian, privateNurse, privateFrontdesk, hospitalAddress);
        // await privateHospitalPage.addHospitalDetails('Arumugam', 'K', '8056221601', 'arumuganainar.k@medyaan.com', '123', 'Sharjah', 'SaudiArabia', '1', '2', '3', '4', 'No 12, Moulna Nagar,Tambaram, Chennai');
        await privateHospitalPage.clickSubmitBtn();
        await privateHospitalPage.clickConfirmationYes();
        await privateHospitalPage.validateToastMessage(toast);
        // await privateHospitalPage.validateToastMessage("Hospital Detailes updated successfully");
        await page.waitForTimeout(2000);

    })



})