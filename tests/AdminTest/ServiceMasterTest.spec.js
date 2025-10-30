const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ServiceMasterPage } = require('../../POM_AdminPages/ServiceMasterPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS04 - Service Master', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext();   //{ viewport: { width: 1366, height: 580 } }
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

    test('TC003 - Navigate to ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);
        await serviceMasterPage.navigateToServiceMaster();
        await page.waitForTimeout(2000);
    })


    test('TC004 - add ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceMasterdata = await excelReader.readExcel(pathone, 'ServiceMasterTest');
        const { dropdown, servicename, mrp, cost, diagonisis, toast } = ServiceMasterdata[0];

        await serviceMasterPage.addServiceMaster(dropdown, servicename, mrp, cost, diagonisis);
        // await serviceMasterPage.addServiceMaster('new service', 'Massage', '25', '30', 'Kidney Disease');
        await serviceMasterPage.clickSubmitBtn();
        await serviceMasterPage.closeIcon.click();
        await serviceMasterPage.clickSubmitBtn();
        await serviceMasterPage.clickConfirmationNo();
        await serviceMasterPage.clickSubmitBtn()
        await serviceMasterPage.clickConfirmationYes();

        await serviceMasterPage.validateToastMessage(toast);
        // await serviceMasterPage.validateToastMessage('Service Master created succesfully');
    })


    test('TC005 - edit ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceMasterdata = await excelReader.readExcel(pathone, 'ServiceMasterTest');
        const { servicename, dropdown } = ServiceMasterdata[0]
        const { mrp, cost, diagonisis, toast } = ServiceMasterdata[1]
        const service1 = (ServiceMasterdata[1].servicename)

        await serviceMasterPage.searchValue(servicename);     //Massage
        await serviceMasterPage.clickEditBtn(servicename, dropdown);     //'Massage', 'new service'

        await serviceMasterPage.editServiceMaster(service1, mrp, cost, diagonisis);
        // await serviceMasterPage.editServiceMaster('testing', '50', '40', 'Bacterial Infections');
        await page.waitForTimeout(2000);
        await serviceMasterPage.clickSubmitBtn()
        await serviceMasterPage.clickConfirmationYes();
        await serviceMasterPage.validateToastMessage(toast);
        // await serviceMasterPage.validateToastMessage('Service Master updated succesfully');
    })

    test('TC006 - cancel ServiceMaster ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceMasterdata = await excelReader.readExcel(pathone, 'ServiceMasterTest');
        const { dropdown, servicename, mrp, cost, diagonisis } = ServiceMasterdata[0];

        await serviceMasterPage.addServiceMaster(dropdown, servicename, mrp, cost, diagonisis);
        // await serviceMasterPage.addServiceMaster('new service', 'test', '25', '30', 'Kidney Disease');
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

        //from excel
        const excelReader = new ExcelReader();
        const ServiceMasterdata = await excelReader.readExcel(pathone, 'ServiceMasterTest');
        const { servicename, dropdown } = ServiceMasterdata[1];
        const { toast } = ServiceMasterdata[2];

        await serviceMasterPage.searchValue(servicename);     //Massage
        await page.waitForTimeout(2000);
        await serviceMasterPage.clickDeleteBtn(servicename, dropdown);       //'massage', 'new service'
        await serviceMasterPage.closeIcon.click();
        await serviceMasterPage.clickDeleteBtn(servicename, dropdown);            //'massage', 'new service'
        await serviceMasterPage.clickConfirmationNo();
        await serviceMasterPage.clickDeleteBtn(servicename, dropdown);            //'massage', 'new service'
        await serviceMasterPage.clickConfirmationYes();
        await serviceMasterPage.validateToastMessage(toast);
        // await serviceMasterPage.validateToastMessage('Service Master deleted succesfully');
    })

    test('TC008 - Select Category ', async () => {
        const serviceMasterPage = new ServiceMasterPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceMasterdata = await excelReader.readExcel(pathone, 'ServiceMasterTest');
        const { category } = ServiceMasterdata[0];

        await serviceMasterPage.selectCategory(category);
        // await serviceMasterPage.selectCategory('Exotics');
    })





})