const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { MaterialMasterPage } = require('../../POM_AdminPages/MaterialMasterPage');


let page;
let context;


test.describe('TS03 - Material Category', () => {


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

    test('TC003 - Navigate to Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        await materialMasterPage.navigateToMaterialMaster();
        await page.waitForTimeout(2000);
    })

    test('TC004 - Add Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName, Description, ExceptedDeliveryDays, ProductDescription, ReturnDays, ReturnContent, Toast } = materialMasterData[0];
        await materialMasterPage.clickAddMaterialBtn();
        await materialMasterPage.addMaterialDetails(Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName);
        await materialMasterPage.clickCanBeSoldYes();
        await materialMasterPage.clickCanBeConsumedYes();
        await materialMasterPage.clickCanBeIporOpYes();
        await materialMasterPage.clickIsAppliedShopYes();
        await materialMasterPage.uploadImageFile('C:/Users/ArunkumarRagavan/PetClinic_VScode/Images/download.jpg');
        await materialMasterPage.clickIsReplacementorExchangePolicyYes();
        await materialMasterPage.addIsAppliedshopDetails(Description, ExceptedDeliveryDays, ProductDescription);
        await materialMasterPage.clickIsReturnPolicyYes();
        await materialMasterPage.addIsReturnPolicyDetails(ReturnDays, ReturnContent);
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickCloseIcon();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageNo();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageYes();
        await materialMasterPage.validatateToastMessage(Toast);
    })

    test('TC005 - Add Material Master only sold', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName, } = materialMasterData[1];
        await materialMasterPage.clickAddMaterialBtn();
        await materialMasterPage.addMaterialDetails(Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName,);
        await materialMasterPage.clickCanBeSoldYes();
        await materialMasterPage.clickCanBeConsumedNo();
        await materialMasterPage.clickCanBeIporOpNo();
        await materialMasterPage.clickIsAppliedShopNo();
        await materialMasterPage.uploadImageFile('C:/Users/ArunkumarRagavan/PetClinic_VScode/Images/download.jpg');
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickCloseIcon();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageNo();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageYes();
        await materialMasterPage.validatateToastMessage(materialMasterData[0].Toast);
        await page.waitForTimeout(2000);
    })

    test('TC006 - Add Material Master only consumption', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName } = materialMasterData[2];
        await materialMasterPage.clickAddMaterialBtn();
        await materialMasterPage.addMaterialDetails(Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName);
        await materialMasterPage.clickCanBeSoldYes();
        await materialMasterPage.clickCanBeConsumedNo();
        await materialMasterPage.clickCanBeIporOpNo();
        await materialMasterPage.clickIsAppliedShopNo();
        await materialMasterPage.uploadImageFile('C:/Users/ArunkumarRagavan/PetClinic_VScode/Images/download.jpg');
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickCloseIcon();
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageNo();
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageYes();
        await materialMasterPage.validatateToastMessage(materialMasterData[0].Toast);
        await page.waitForTimeout(2000);
    })


    test('TC007 - Cancel Add Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName } = materialMasterData[3];
        await materialMasterPage.clickAddMaterialBtn();
        await materialMasterPage.addMaterialDetails(Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName);
        await materialMasterPage.clickCanBeSoldYes();
        await materialMasterPage.clickCanBeConsumedNo();
        await materialMasterPage.clickCanBeIporOpNo();
        await materialMasterPage.clickIsAppliedShopNo();
        await materialMasterPage.uploadImageFile('C:/Users/ArunkumarRagavan/PetClinic_VScode/Images/download.jpg');
        await page.waitForTimeout(2000);
        await materialMasterPage.clickCancelBtn();
        await materialMasterPage.clickCloseIcon();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickCancelBtn();
        await materialMasterPage.clickConfirmationMessageNo();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickCancelBtn();
        await materialMasterPage.clickConfirmationMessageYes();
        await page.waitForTimeout(2000);
    })

    //Material Tab

    test('TC008 - edit Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName, Toast } = materialMasterData[3];
        await materialMasterPage.materialTab.click();
        await page.waitForTimeout(1000);
        await materialMasterPage.searchValue(materialMasterData[2].Name);
        await materialMasterPage.clickEditBtn(materialMasterData[2].Name, materialMasterData[2].MaterialCategory);
        await materialMasterPage.addMaterialDetails(Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName);
        await materialMasterPage.clickCanBeSoldYes();
        await materialMasterPage.clickCanBeConsumedNo();
        await materialMasterPage.clickCanBeIporOpNo();
        await materialMasterPage.clickIsAppliedShopNo();
        await page.waitForTimeout(2000)
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickCloseIcon();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageNo();
        await page.waitForTimeout(2000);
        await materialMasterPage.clickSubmitBtn();
        await materialMasterPage.clickConfirmationMessageYes();
        await materialMasterPage.validatateToastMessage(Toast);

    })


    test('TC009 - view Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName, Toast } = materialMasterData[0];

        await page.waitForTimeout(1000);
        await materialMasterPage.searchValue(Name);
        await page.waitForTimeout(2000);
        const materialQty = await materialMasterPage.getAvailableQty.textContent();
        console.log("Available Material Qty:", materialQty);
        await materialMasterPage.clickViewBtn(Name, MaterialCategory);
        await materialMasterPage.clickBackBtn();
        await page.waitForTimeout(2000);
    })

    test('TC010 - delete Material Master', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, Manufacturer, MRP, MaterialCategory, MaterialType, Diagnosis, GenericName, Toast } = materialMasterData[0];

        await page.waitForTimeout(1000);
        await materialMasterPage.searchValue(Name);
        await materialMasterPage.clickDeleteBtn(Name, MaterialCategory);
        await materialMasterPage.clickConfirmationMessageYes();
        await materialMasterPage.clickBackBtn();
        await page.waitForTimeout(2000);
    })

    //Batch Tab
    test('TC010 - view Material Master in Batch Tab', async () => {
        const materialMasterPage = new MaterialMasterPage(page);
        const excelReader = new ExcelReader();
        const materialMasterData = await excelReader.readExcel('C:/Users/ArunkumarRagavan/Desktop/Book1.xlsx', 'MaterialMasterTest');
        const { Name, CategoryDropDown,StorageLocation} = materialMasterData[0];

        await page.waitForTimeout(1000);
        await materialMasterPage.batchTab.click();
        await page.waitForTimeout(1000);
        await materialMasterPage.searchValue(Name);
        await materialMasterPage.clickCategoryDropDown(CategoryDropDown);
        await materialMasterPage.clickStorageLocationDropDown(StorageLocation);
        await materialMasterPage.clickFirstViewBtn.click();
        await materialMasterPage.clickBackBtn();
        await page.waitForTimeout(2000);
    })









})