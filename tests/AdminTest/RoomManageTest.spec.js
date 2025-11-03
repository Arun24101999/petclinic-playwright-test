const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { RoomManagePage } = require('../../POM_AdminPages/RoomManagePage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS03 - Room Type', () => {


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

    test('TC003 - Navigate to Material category', async () => {
        const roomManagePage = new RoomManagePage(page);
        await roomManagePage.navigateToRoomManage();
    })



    test('TC004 - add room manage valid data', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        const totalPets = await roomManagePage.getFacilityCount.textContent();
        console.log(totalPets);
        await roomManagePage.clickAddRoomBtn();

        //from excel
        const excelReader = new ExcelReader();
        const RoomManagedata = await excelReader.readExcel(pathone, 'RoomManageTest');
        const { roomname, petspecies, roomtype, wardno, floor, spaces, iftoast, elsetoast } = RoomManagedata[0];

        await roomManagePage.addRoomDetails(roomname, petspecies, roomtype, wardno, floor, spaces);
        // await roomManagePage.addRoomDetails('s123', 'Cow', 'yaan', 'ward1', 'floor1', '2');
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const getToast = await roomManagePage.validatateToastMessage();
        if (getToast === iftoast) {     //Room Created Successfully
            console.log(getToast);
        } else {
            console.log(elsetoast); //room name already exist

        }


    })

    test('TC005 - Cancel room manage valid data', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);
        await roomManagePage.clickAddRoomBtn();

        //from excel
        const excelReader = new ExcelReader();
        const RoomManagedata = await excelReader.readExcel(pathone, 'RoomManageTest');
        const { roomname, petspecies, roomtype, wardno, floor, spaces, iftoast, elsetoast } = RoomManagedata[0];

        await roomManagePage.addRoomDetails(roomname, petspecies, roomtype, wardno, floor, spaces);

        // await roomManagePage.addRoomDetails('newcancel', 'Cow', 'yaan', 'ward1', 'floor1', '2');
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

        //from excel
        const excelReader = new ExcelReader();
        const RoomManagedata = await excelReader.readExcel(pathone, 'RoomManageTest');
        const { roomname, roomtype } = RoomManagedata[0];
        const petspec = (RoomManagedata[1].petspecies);

        await roomManagePage.searchValue(roomname);       //s123
        await roomManagePage.clickEditBtn(roomname, roomtype, petspec);       //'s123', 'yaan', 'cow'

        //from excel
        const { floor, spaces, iftoast, elsetoast } = RoomManagedata[1];

        await roomManagePage.editRoomDetails(floor, spaces);        //'floor2', '4'
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickSubmitBtn();
        await roomManagePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const getToast = await roomManagePage.validatateToastMessage();
        if (getToast === iftoast) {     //Successfully updated room details
            console.log(getToast);
        } else {
            console.log(elsetoast);         //room is not updated

        }

    })

    test('TC007 - view room Type details', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const RoomManagedata = await excelReader.readExcel(pathone, 'RoomManageTest');
        const { roomname, roomtype } = RoomManagedata[0];
        const petspec = (RoomManagedata[1].petspecies);

        await roomManagePage.searchValue(roomname)      //s123
        await roomManagePage.clickViewBtn(roomname, roomtype, petspec);       //'s123', 'yaan', 'cow'
        await roomManagePage.clickCloseBtn();


    })


    test('TC008 - delete room Type details', async () => {
        const roomManagePage = new RoomManagePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const RoomManagedata = await excelReader.readExcel(pathone, 'RoomManageTest');
        const { roomname, roomtype } = RoomManagedata[0];
        const { iftoast, elsetoast } = RoomManagedata[2];
        const petspec = (RoomManagedata[1].petspecies);

        await roomManagePage.searchValue(roomname);   //s123
        await roomManagePage.clickDeleteBtn(roomname, roomtype, petspec);      //'s123', 'yaan', 'cow'
        await roomManagePage.clickCloseIcon();
        await roomManagePage.clickDeleteBtn(roomname, roomtype, petspec);      //'s123', 'yaan', 'cow'
        await roomManagePage.clickConfirmationMessageNo();
        await roomManagePage.clickDeleteBtn(roomname, roomtype, petspec);          //'s123', 'yaan', 'cow'
        await roomManagePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const expectedMessage = await roomManagePage.validatateToastMessage();
        if (expectedMessage === iftoast) {      //Room details deleted successfully
            console.log(expectedMessage);

        } else {
            console.log(elsetoast);     //Room already booked

        }


    })



})