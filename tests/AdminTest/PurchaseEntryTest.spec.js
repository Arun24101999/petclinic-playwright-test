const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { PurchaseEntryPage } = require('../../POM_AdminPages/PurchaseEntryPage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";

test.describe('TS03 - Material Category', () => {


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

    test('TC003 - Navigate to Purchase order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await purchaseEntryPage.navigateToPurchaseEntry();
        await page.waitForTimeout(2000);
    })

    test('TC004 - add Purchase order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await purchaseEntryPage.clickAddPurchaseOrderBtn();
        await page.waitForTimeout(2000);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { suppliername, material, quantity, unitprice, toast } = PurchaseEntrydata[0];


        await purchaseEntryPage.addPODetails(suppliername, material, quantity, unitprice);
        // await purchaseEntryPage.addPODetails('RAK Supplier', 'Simparica', '5', '10');
        await purchaseEntryPage.clickCalender();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickClearBtn();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.cancelSupplierDetail.click();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.addPODetails(suppliername, material, quantity, unitprice);
        // await purchaseEntryPage.addPODetails('RAK Supplier', 'Simparica', '5', '10');
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickAddBtn();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickSaveBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickSaveBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickSaveBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();
        await purchaseEntryPage.validatateToastMessage(toast);
        // await purchaseEntryPage.validatateToastMessage('Purchase Order created successfully');
        await page.waitForTimeout(1000);

    })

    test('TC005 - edit Purchase order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { materialid } = PurchaseEntrydata[0];
        const { toast } = PurchaseEntrydata[1];

        await purchaseEntryPage.searchValue(materialid);        //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickViewBtn(materialid);       //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickEditBtn();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();
        await purchaseEntryPage.validatateToastMessage(toast);
        // await purchaseEntryPage.validatateToastMessage('Purchase order updated successfully');
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickBackBtn();

    })

    test('TC006 - delete Purchase order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { materialid } = PurchaseEntrydata[1];
        const { toast } = PurchaseEntrydata[2];

        await purchaseEntryPage.searchValue(materialid);        //1327
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickDeleteBtn(materialid);      //1327
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickDeleteBtn(materialid);          //1327
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickDeleteBtn(materialid);
        await purchaseEntryPage.clickConfirmationMessageYes();
        await purchaseEntryPage.validatateToastMessage(toast);
        // await purchaseEntryPage.validatateToastMessage('Purchase Order deleted successfully');
        await page.waitForTimeout(1000);

    })



    test('TC007 - Back to Purchase order dashboard', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { materialid } = PurchaseEntrydata[0];

        await purchaseEntryPage.searchValue(materialid);        //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickViewBtn(materialid);       //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickBackBtn();

    })

    test('TC008 - cancel Purchase order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await purchaseEntryPage.clickAddPurchaseOrderBtn();
        await page.waitForTimeout(2000);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { suppliername, material, quantity, unitprice, toast } = PurchaseEntrydata[0];

        await purchaseEntryPage.addPODetails(suppliername, material, quantity, unitprice);
        // await purchaseEntryPage.addPODetails('RAK Supplier', 'Simparica', '5', '10');
        await purchaseEntryPage.clickCalender();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickAddBtn();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickEditMaterialBtn(material);      //Simparica
        await page.waitForTimeout(1000);

        // const { supplier_neame, materialdname, qtdy, unit_psrice, toadst_name } = PurchaseEntrydata[0];
        const supplier_name = (PurchaseEntrydata[1].suppliername);
        const materialname = (PurchaseEntrydata[1].material);
        const qty = (PurchaseEntrydata[1].quantity);
        const unit_price = (PurchaseEntrydata[1].unitprice);
        // const toast_name = (PurchaseEntrydata[1].toast);

        await purchaseEntryPage.addPODetails(supplier_name, materialname, qty, unit_price);
        // await purchaseEntryPage.addPODetails('RAK Supplier', 'Paracetomol', '5', '10');
        await purchaseEntryPage.clickAddBtn();
        await page.waitForTimeout(1000)
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();

    })

    test('TC009 - delete material order', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await purchaseEntryPage.clickAddPurchaseOrderBtn();
        await page.waitForTimeout(2000);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { suppliername, material, quantity, unitprice, toast } = PurchaseEntrydata[0];

        await purchaseEntryPage.addPODetails(suppliername, material, quantity, unitprice);
        // await purchaseEntryPage.addPODetails('RAK Supplier', 'Simparica', '5', '10');
        await purchaseEntryPage.clickCalender();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickAddBtn();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickDeleteMaterialBtn(material);       //Simparica
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickCancelBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000);

    })

    test('TC010 - received goods', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await page.waitForTimeout(1000);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { materialid } = PurchaseEntrydata[0];

        await purchaseEntryPage.searchValue(materialid);        //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickViewBtn(materialid);       //1326
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickReceivedGoodsBtn();
        await page.waitForTimeout(2000);

        //from excel
        const { receivedmaterial, qty, batch, storagelocation } = PurchaseEntrydata[0];

        await purchaseEntryPage.receivedGoodsDetails(receivedmaterial, qty, batch, storagelocation);
        // await purchaseEntryPage.receivedGoodsDetails('1. Simparica', '1', '12345', 'arunstore');
        await purchaseEntryPage.clickExpiryCalender();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickAddBtn();
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();
        const { toast } = PurchaseEntrydata[3];
        await purchaseEntryPage.validatateToastMessage(toast);
        // await purchaseEntryPage.validatateToastMessage('GRN details created successfully');
        await page.waitForTimeout(1000);
    })

    test('TC011 - return goods', async () => {
        const purchaseEntryPage = new PurchaseEntryPage(page);
        await page.waitForTimeout(1000);

        //from excel 
        const excelReader = new ExcelReader();
        const PurchaseEntrydata = await excelReader.readExcel(pathone, 'PurchaseEntryTest');
        const { materialid } = PurchaseEntrydata[2];
        const { material, qty } = PurchaseEntrydata[0];
        const { toast } = PurchaseEntrydata[4];

        await purchaseEntryPage.searchValue(materialid);    //1325
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickViewBtn(materialid);   //1325
        await page.waitForTimeout(1000);
        await purchaseEntryPage.clickReturnBtn(material);    //Simparica
        await page.waitForTimeout(2000);
        await purchaseEntryPage.returnDetails(material, qty);    //'Simparica', '1'
        await page.waitForTimeout(2000);
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickCloseIcon();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageNo();
        await purchaseEntryPage.clickSubmitBtn();
        await purchaseEntryPage.clickConfirmationMessageYes();
        await purchaseEntryPage.validatateToastMessage(toast);
        // await purchaseEntryPage.validatateToastMessage('Material item return successfully');
        await page.waitForTimeout(1000);
    })








})