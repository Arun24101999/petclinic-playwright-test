const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ServiceMasterPage } = require('../../POM_AdminPages/ServiceMasterPage');


let page;
let context;


test.describe('TS04 - Service Master', () => {


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
        await usersPage.selectUserRoleOption('AWC Manager');
        await page.waitForTimeout(2000);
    })

    test('TC003 - Navigate to ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.navigateToServiceMaster();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.addServiceMaster('new service','Massage','25','30','Kidney Disease');
        await serviceMasterPage.clickSubmitBtn();
        await serviceMasterPage.closeIcon.click();
        await serviceMasterPage.clickSubmitBtn();
        await serviceMasterPage.clickConfirmationNo();
        await serviceMasterPage.clickSubmitBtn()
        await serviceMasterPage.clickConfirmationYes();
        await serviceMasterPage.validateToastMessage('Service Master created succesfully');
    })


    test('TC005 - edit ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.searchValue('Massage');
        await serviceMasterPage.clickEditBtn('Massage','new service');
        await serviceMasterPage.editServiceMaster('testing','50','40','Bacterial Infections');
        await page.waitForTimeout(2000);
        await serviceMasterPage.clickSubmitBtn()
        await serviceMasterPage.clickConfirmationYes();
        await serviceMasterPage.validateToastMessage('Service Master updated succesfully');
    })

    test('TC006 - cancel ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.addServiceMaster('new service','test','25','30','Kidney Disease');
        await page.waitForTimeout(2000);
        await serviceMasterPage.clickCancelBtn();
        await serviceMasterPage.closeIcon.click();
        await serviceMasterPage.clickCancelBtn();
        await serviceMasterPage.clickConfirmationNo();
        await serviceMasterPage.clickCancelBtn()
        await serviceMasterPage.clickConfirmationYes();
    })

    test('TC007 - delete ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.searchValue('Massage');
        await page.waitForTimeout(2000);
        await serviceMasterPage.clickDeleteBtn('massage','new service');
        await serviceMasterPage.closeIcon.click();
        await serviceMasterPage.clickDeleteBtn('massage','new service');
        await serviceMasterPage.clickConfirmationNo();
        await serviceMasterPage.clickDeleteBtn('massage','new service');
        await serviceMasterPage.clickConfirmationYes();
        await serviceMasterPage.validateToastMessage('Service Master deleted succesfully');
    })

    test('TC008 - Select Category ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.selectCategory('Exotics');
    })





})