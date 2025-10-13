const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const {AllEventsPage } = require('../../POM_ExternalManagerPages/AllEventsPage');


test.describe('TS02 - All Blogs', async () => {

    let page;
    let context;

    // Login with valid credentials
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
        await usersPage.selectUserRoleOption('External Manager');
        await page.waitForTimeout(2000);
    })

    test('TC001 - Navigate to the All Blog', async () => {

        const allEventsPage = new AllEventsPage(page);
        await allEventsPage.aggridTable();
        await allEventsPage.clickBlogManagement();
        await allEventsPage.clickAllBlogTab();
    })

    test('TC002 - Search and view the data', async () => {

        const search = new AllEventsPage(page);
        await search.searchData("Rain Event");
        await search.clickDownload();
    })

    test('TC003 - View the Unpublished Blog', async () => {

        const unpublish =new AllEventsPage(page);
        await unpublish.clickUnpublishTab();
        await unpublish.viewTheAds("Rat event");
        await unpublish.clickBackIcon();
    })

    test('TC004 - View the Published Blog', async () => {

        const publish = new AllEventsPage(page);
        await publish.clickPublishTab();
        await publish.viewTheAds("Rain Event");
        await publish.clickBackIcon();
    })
})