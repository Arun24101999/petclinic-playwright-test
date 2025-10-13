const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { ShopMasterPage } = require('../../POM_AdminPages/ShopMasterPage');


let page;
let context;


test.describe('TS03 - shop master', () => {


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

    test('TC003 - Navigate to shopmaster module', async () => {
        const shopMasterPage = new ShopMasterPage(page);
        await shopMasterPage.navigateToShopMaster();
        
    })


    test('TC004 - add shop master', async () => {

        const shopMasterPage = new ShopMasterPage(page);
        await shopMasterPage.clickAddShopBtn();
        await shopMasterPage.clickBackIcon();
        await page.waitForTimeout(2000);
        await shopMasterPage.clickAddShopBtn();
        await shopMasterPage.addShopDetails('MedicalShop', 'Pharamacy', 'Chennai 600001', '8056221601', 'med@gmail.com', 'Yes', 'New Branch at Chennai', 'Ej Pradeep', 'Tamilselvi', 'TestCategory', 'Allergy Testing', 'Clinic Store');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast = await shopMasterPage.getToastMessage.textContent();
        await expect(toast).toBe("Shop created successfully");
    })

    test('TC005 - edit shop details', async () => {

        const shopMasterPage = new ShopMasterPage(page);
        await shopMasterPage.searchValue('MedicalShop');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickEditIcon('MedicalShop');
        await page.waitForTimeout(2000);
        await shopMasterPage.addShopDetails('MedicalTestShop', 'Pharamacy', 'Madurai 625001', '8056221601', 'med@gmail.com', 'Yes', 'New Branch at Chennai', 'Frontdesk', 'Arun Muthu Sukumar M ', 'Cleaning', 'Dog Park', 'arunstore');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickCloseIcon();
            await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickConfirmationNo();
            await page.waitForTimeout(1000);
        await shopMasterPage.clickSubmitBtn();
        await shopMasterPage.clickConfirmationYes();
        await page.waitForTimeout(1000);
        const toast = await shopMasterPage.getToastMessage.textContent();
        await expect(toast).toBe("Shop updated successfully");
    })

    test('TC006 - cancel shop details', async () => {
        
        const shopMasterPage = new ShopMasterPage(page);
        await shopMasterPage.clickAddShopBtn();
        await shopMasterPage.clickBackIcon();
        await page.waitForTimeout(2000);
        await shopMasterPage.clickAddShopBtn();
        await shopMasterPage.addShopDetails('AKShop', 'Pharamacy', 'Chennai 600001', '8056221601', 'med@gmail.com', 'Yes', 'New Branch at Chennai', 'Ej Pradeep', 'Tamilselvi', 'TestCategory', 'Allergy Testing', 'Clinic Store');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickCancelBtn();
        await shopMasterPage.clickCloseIcon();
        await shopMasterPage.clickCancelBtn();
        await shopMasterPage.clickConfirmationNo();
        await shopMasterPage.clickCancelBtn();
        await shopMasterPage.clickConfirmationYes();
       
    })

    test('TC007 - view shop details ', async () => {
         const shopMasterPage = new ShopMasterPage(page);
        await shopMasterPage.searchValue('MedicalTestShop');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickViewIcon('MedicalTestShop');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickBackIcon();
    })

    test('TC008 - delete shop details ', async () => {
    const shopMasterPage = new ShopMasterPage(page);;
        await shopMasterPage.searchValue('MedicalTestShop');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickDeleteIcon('MedicalTestShop');
        await page.waitForTimeout(1000);
        await shopMasterPage.clickCloseIcon();
        await page.waitForTimeout(1000);
         await shopMasterPage.clickDeleteIcon('MedicalTestShop');
         await page.waitForTimeout(1000);
        await shopMasterPage.clickConfirmationNo();
         await shopMasterPage.clickDeleteIcon('MedicalTestShop');
         await page.waitForTimeout(1000);
        await shopMasterPage.clickConfirmationYes();
        await page.waitForTimeout(2000);
        const toast = await shopMasterPage.getToastMessage.textContent();
        await expect(toast).toBe("Shop deleted successfully");
    })
     
   






})