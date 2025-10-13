const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { RoomOccupancyPage } = require('../../POM_AdminPages/RoomOccupancyPage');


let page;
let context;


test.describe('TS03 - Room Type', () => {


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

    test('TC003 - Navigate to room module', async () => {
        const roomOccupancyPage = new RoomOccupancyPage(page);
        await roomOccupancyPage.navigateToRoomOccupancy();
    })

    test('TC004 - print species and room details', async () => {
        const roomOccupancyPage = new RoomOccupancyPage(page);
        const value1=await roomOccupancyPage.getAllSpecies();
        console.log(value1);
        const value2=await roomOccupancyPage.getRoomDetails();
        console.log(value2);
    })




})