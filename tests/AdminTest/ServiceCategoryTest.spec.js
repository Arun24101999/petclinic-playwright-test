const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
//const { AdoptionPage } = require('../../POM_AdminPages/AdoptionPage');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ServiceCategoryPage } = require('../../POM_AdminPages/ServiceCategoryPage');

let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS05 - Service Category', () => {


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

    test('TC003 - Navigate to ServiceCategory ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.navigateToServiceCategory();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();

        //from excel
        const excelReader = new ExcelReader();
        const ServiceCategorydata = await excelReader.readExcel(pathone, 'ServiceCategoryTest');
        const { categoryname, description, toast } = ServiceCategorydata[0];

        await serviceCategoryPage.addServiceCategory(categoryname, description);
        // await serviceCategoryPage.addServiceCategory('testone', 'Testone functionality using automation');
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await serviceCategoryPage.validateToastMessage(toast)
        // await serviceCategoryPage.validateToastMessage('Service category created successfully')
        await page.waitForTimeout(2000);
    })

    test('TC005 - Cancel add Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();
        await serviceCategoryPage.backBtn.click();
        await page.waitForTimeout(1000);
        await serviceCategoryPage.ClickAddServiceCategoryBtn();
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceCategorydata = await excelReader.readExcel(pathone, 'ServiceCategoryTest');
        const { categoryname, description } = ServiceCategorydata[1];

        await serviceCategoryPage.addServiceCategory(categoryname, description);
        // await serviceCategoryPage.addServiceCategory('testtwo', 'Testtwo functionality using automation');
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickCancelBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
    })

    test('TC006 - edit Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceCategorydata = await excelReader.readExcel(pathone, 'ServiceCategoryTest');
        const { categoryname } = ServiceCategorydata[0];
        const name1 = (ServiceCategorydata[1].categoryname);
        const { description } = ServiceCategorydata[1];
        const { toast } = ServiceCategorydata[2];


        await serviceCategoryPage.searchValue(categoryname);       //testone
        await page.waitForTimeout(1000);
        await serviceCategoryPage.clickEditBtn(categoryname);      //testone
        await page.waitForTimeout(1000);
        await serviceCategoryPage.editServiceCategory(name1, description);     //'testtwo', 'Testtwo functionality using automation'
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationNo();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.closeIcon.click();
        await serviceCategoryPage.clickSubmitBtn();
        await serviceCategoryPage.clickConfirmationYes();
        await serviceCategoryPage.validateToastMessage(toast);
        // await serviceCategoryPage.validateToastMessage('Service category updated successfully');
        await page.waitForTimeout(2000);
    })

    test('TC008 - view Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceCategorydata = await excelReader.readExcel(pathone, 'ServiceCategoryTest');
        const { categoryname } = ServiceCategorydata[1];


        await serviceCategoryPage.searchValue(categoryname);   //testtwo
        await page.waitForTimeout(1000);
        await serviceCategoryPage.clickViewBtn(categoryname);  //testtwo
        await page.waitForTimeout(1000);
        await serviceCategoryPage.backBtn.click();
        await page.waitForTimeout(1000);
    })

    test('TC009 - delete Service Category ', async () => {
        const serviceCategoryPage = new ServiceCategoryPage(page);

        //from excel
        const excelReader = new ExcelReader();
        const ServiceCategorydata = await excelReader.readExcel(pathone, 'ServiceCategoryTest');
        const { categoryname } = ServiceCategorydata[1];
        const { toast } = ServiceCategorydata[3];

        await serviceCategoryPage.searchValue(categoryname);       //testtwo
        await page.waitForTimeout(1000);
        await serviceCategoryPage.clickDeleteBtn(categoryname);        //testtwo
        await serviceCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        await serviceCategoryPage.validateToastMessage(toast);
        // await serviceCategoryPage.validateToastMessage('Service category deleted successfully');
        await page.waitForTimeout(2000);
    })



})