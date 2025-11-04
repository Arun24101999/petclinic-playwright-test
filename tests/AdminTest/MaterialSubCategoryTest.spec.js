const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { MaterialSubCategoryPage } = require('../../POM_AdminPages/MaterialSubCategoryPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";

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

    test('TC003 - Navigate to material sub category', async () => {
        const materialSubCategoryPage = new MaterialSubCategoryPage(page);
        await materialSubCategoryPage.navigateToMaterialSubCategory();
    })



    test('TC004 - add sub category with valid data', async () => {
        const materialSubCategoryPage = new MaterialSubCategoryPage(page);
        await page.waitForTimeout(1000);
        await materialSubCategoryPage.clickAddSubCategoryBtn();
        await page.waitForTimeout(2000);

        //from excel
        const excelReader = new ExcelReader();
        const MaterialSubCategorydata = await excelReader.readExcel(pathone, 'MaterialSubCategoryTest');
        const { categoryname, subcategoryname, description, toast } = MaterialSubCategorydata[0];

        await materialSubCategoryPage.addSubCategoryDetails(categoryname, subcategoryname, description);
        // await materialSubCategoryPage.addSubCategoryDetails('Test', 'Pharma', 'test the function');
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickCloseIcon();
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickConfirmationNo();
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialSubCategoryPage.validateToastMessage(toast);
        // await materialSubCategoryPage.validateToastMessage('Material sub category created successfully');
    })


    test('TC005 - edit sub category', async () => {
        const materialSubCategoryPage = new MaterialSubCategoryPage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const MaterialSubCategorydata = await excelReader.readExcel(pathone, 'MaterialSubCategoryTest');
        const { categoryname, subcategoryname } = MaterialSubCategorydata[0];
        const { description, toast } = MaterialSubCategorydata[1];
        const subcat = (MaterialSubCategorydata[1].subcategoryname);

        await materialSubCategoryPage.searchTheValue(subcategoryname)      //pharma
        await page.waitForTimeout(2000);
        await materialSubCategoryPage.clickEditIcon(subcategoryname, categoryname);      //Pharma , Test
        await materialSubCategoryPage.editSubCategoryDetails(subcat, description);     //'Pharmacy', 'New'
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickCloseIcon();
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickConfirmationNo();
        await materialSubCategoryPage.clickSubmitBtn();
        await materialSubCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialSubCategoryPage.validateToastMessage(toast);
        // await materialSubCategoryPage.validateToastMessage('Material sub category updated successfully');

    })

    test('TC006 - view sub material category', async () => {
        const materialSubCategoryPage = new MaterialSubCategoryPage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const MaterialSubCategorydata = await excelReader.readExcel(pathone, 'MaterialSubCategoryTest');
        const { subcategoryname } = MaterialSubCategorydata[1];
        const { categoryname } = MaterialSubCategorydata[0];

        await materialSubCategoryPage.searchTheValue(subcategoryname)        //pharmacy
        await page.waitForTimeout(1000);
        await materialSubCategoryPage.clickViewIcon(subcategoryname, categoryname);        //'Pharmacy', 'Test'
        await page.waitForTimeout(2000);
        await materialSubCategoryPage.backBtn.click();


    })

    test('TC007 - delete sub material category', async () => {
        const materialSubCategoryPage = new MaterialSubCategoryPage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const MaterialSubCategorydata = await excelReader.readExcel(pathone, 'MaterialSubCategoryTest');
        const { subcategoryname } = MaterialSubCategorydata[1];
        const { categoryname } = MaterialSubCategorydata[0];
        const { toast } = MaterialSubCategorydata[2];


        await materialSubCategoryPage.searchTheValue(subcategoryname)        //pharmacy
        await page.waitForTimeout(1000);
        await materialSubCategoryPage.clickDeleteIcon(subcategoryname, categoryname);      //'Pharmacy', 'Test'
        await materialSubCategoryPage.clickCloseIcon();
        await materialSubCategoryPage.clickDeleteIcon(subcategoryname, categoryname);      //'Pharmacy', 'Test'
        await materialSubCategoryPage.clickConfirmationNo();
        await materialSubCategoryPage.clickDeleteIcon(subcategoryname, categoryname);      //'Pharmacy', 'Test'
        await materialSubCategoryPage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await materialSubCategoryPage.validateToastMessage(toast);
        // await materialSubCategoryPage.validateToastMessage('Material sub category deleted successfully');
    })


})