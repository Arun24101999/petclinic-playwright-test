const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { StorageLocation } = require('../../POM_AdminPages/StorageLocationPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS03 - Storage Location', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext({ viewport: { width: 1366, height: 580 } });
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

    test('TC003 - Navigate to StorageLocation Page', async () => {
        const storageLocation = new StorageLocation(page);
        await page.waitForTimeout(1000);
        await storageLocation.navigateToStorageLocation();
    })



    test('TC004 - add storagelocation with valid data', async () => {
        const storageLocation = new StorageLocation(page);
        await page.waitForTimeout(1000);
        await storageLocation.clickAddStorageLocationButton();
        await page.waitForTimeout(2000);

        //from excel
        const excelReader = new ExcelReader();
        const StorageLocationData = await excelReader.readExcel(pathone, 'StorageLocationTest');
        const { storename, inchargeName, description, Toast } = StorageLocationData[0];

        await storageLocation.AddStorageLocationDetails(storename, inchargeName, description);
        // await storageLocation.AddStorageLocationDetails('arunstore', 'Arunkumar R', 'test the function');
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickCloseIcon();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationNo();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await storageLocation.validateToastMessage(Toast);
        // await storageLocation.validateToastMessage('Storage location created successfully');

    })


    test('TC005 - edit storagelocation', async () => {
        const storageLocation = new StorageLocation(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const StorageLocationData = await excelReader.readExcel(pathone, 'StorageLocationTest');
        const { storename } = StorageLocationData[0];

        await storageLocation.searchTheValue(storename)
        // await storageLocation.searchTheValue('arunstore');
        await page.waitForTimeout(2000);
        await storageLocation.clickEditIcon();

        //from excel
        const { inchargeName, description } = StorageLocationData[1];
        const { Toast } = StorageLocationData[1];

        await storageLocation.editStorageLocationDetails(inchargeName, description);
        // await storageLocation.editStorageLocationDetails('Arumugam K', 'New');
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickCloseIcon();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationNo();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationYes();
        await page.waitForTimeout(1000);

        await storageLocation.validateToastMessage(Toast);
        // await storageLocation.validateToastMessage('Storage location updated successfully');

    })

    test('TC006 - view storagelocation', async () => {
        const storageLocation = new StorageLocation(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const StorageLocationData = await excelReader.readExcel(pathone, 'StorageLocationTest');
        const { storename } = StorageLocationData[0];

        await storageLocation.searchTheValue(storename)
        // await storageLocation.searchTheValue('arunstore')
        await page.waitForTimeout(1000);
        await storageLocation.clickViewIcon();
        await page.waitForTimeout(2000);
        await storageLocation.backIcon.click();


    })

    test('TC007 - delete storagelocation', async () => {
        const storageLocation = new StorageLocation(page);
        await page.waitForTimeout(1000);
        await storageLocation.clickAddStorageLocationButton();
        await page.waitForTimeout(2000);
        //from excel
        const excelReader = new ExcelReader();
        const StorageLocationData = await excelReader.readExcel(pathone, 'StorageLocationTest');
        const { inchargeName, description, Toast } = StorageLocationData[0];
        const { storename } = StorageLocationData[1];
        const toastmessage = (StorageLocationData[2].Toast);

        await storageLocation.AddStorageLocationDetails(storename, inchargeName, description);
        // await storageLocation.AddStorageLocationDetails('stores', 'Arunkumar R', 'test the function');
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickCloseIcon();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationNo();
        await storageLocation.clickSubmitBtn();
        await storageLocation.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await storageLocation.validateToastMessage(Toast);
        // await storageLocation.validateToastMessage('Storage location created successfully');
        await page.waitForTimeout(2000);

        await storageLocation.searchTheValue(storename);
        // await storageLocation.searchTheValue('stores');
        await storageLocation.clickDeleteIcon();
        await storageLocation.clickCloseIcon();
        await storageLocation.clickDeleteIcon();
        await storageLocation.clickConfirmationNo();
        await storageLocation.clickDeleteIcon();
        await storageLocation.clickConfirmationYes();

        await storageLocation.validateToastMessage(toastmessage);
        // await storageLocation.validateToastMessage('Storage location deleted successfully');
    })


})