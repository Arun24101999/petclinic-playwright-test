const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { RoomManagePage } = require('../../POM_AdminPages/RoomManagePage');


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

    test('TC003 - Navigate to Material category', async () => {
        const roomManagePage = new RoomManagePage(page);
        await roomManagePage.navigateToRoomManage();
    })



    // test('TC004 - add room manage valid data', async () => {
    //     const roomManagePage = new RoomManagePage(page);
    //     await page.waitForTimeout(1000);
    //     const totalPets = await roomManagePage.getFacilityCount.textContent();
    //     console.log(totalPets);
    //     await roomManagePage.clickAddRoomBtn();
    //     await roomManagePage.addRoomDetails('s123', 'Cow', 'yaan', 'ward1', 'floor1', '2');
    //     await roomManagePage.clickSubmitBtn();
    //     await roomManagePage.clickCloseIcon();
    //     await roomManagePage.clickSubmitBtn();
    //     await roomManagePage.clickConfirmationMessageNo();
    //     await roomManagePage.clickSubmitBtn();
    //     await roomManagePage.clickConfirmationMessageYes();
    //     await page.waitForTimeout(1000)
    //     const getToast = await roomManagePage.validatateToastMessage();
    //     if (getToast === 'Room Created Successfully') {
    //         console.log(getToast);
    //     } else {
    //         console.log('room name already exist');

    //     }


    // })

    test('TC005 - Cancel room manage valid data', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        await roomManagePage.clickAddRoomBtn();
        await roomManagePage.addRoomDetails('newcancel', 'Cow', 'yaan', 'ward1', 'floor1', '2');
        await roomManagePage.clickCancelBtn();
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickCancelBtn();
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickCancelBtn();
        await roomManagePage.clickConfirmationMessageYes();

    })


    test('TC006 - edit room manage details', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        await roomManagePage.searchValue('s123')
        await roomManagePage.clickEditBtn('s123', 'yaan', 'cow')
        await roomManagePage.editRoomDetails('floor2', '4');
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const getToast=await roomManagePage.validatateToastMessage();
        if (getToast === 'Successfully updated room details') {
            console.log(getToast);
        } else {
            console.log('room is not updated');

        }

    })

    test('TC007 - view room Type details', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        await roomManagePage.searchValue('s123')
        await roomManagePage.clickViewBtn('s123', 'yaan', 'cow');
        await roomManagePage.clickCloseBtn();


    })


    test('TC008 - delete room Type details', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        await roomManagePage.searchValue('s123');
        await roomManagePage.clickDeleteBtn('s123', 'yaan', 'cow');
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickDeleteBtn('s123', 'yaan', 'cow');
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickDeleteBtn('s123', 'yaan', 'cow');
        await roomManagePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const expectedMessage = await roomManagePage.validatateToastMessage();
        if (expectedMessage === 'Room details deleted successfully') {
            console.log(expectedMessage);

        } else {
            console.log('Room already booked');

        }


    })



})