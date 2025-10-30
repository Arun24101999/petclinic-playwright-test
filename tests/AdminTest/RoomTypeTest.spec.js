const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { RoomTypePage } = require('../../POM_AdminPages/RoomTypePage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx";

test.describe('TS03 - Room Type', () => {


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

    test('TC003 - Navigate to Material category', async () => {
        const roomTypePage = new RoomTypePage(page);
        await roomTypePage.navigateToRoomModule();
    })



    test('TC004 - add room type valid data', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);
        await roomTypePage.clickAddRoomTypeBtn();

        //from excel
        const excelReader = new ExcelReader();
        const RoomTypeTestdata = await excelReader.readExcel(pathone, 'RoomTypeTest');
        const { roomtype, petspecies, treatment, description, toast } = RoomTypeTestdata[0]

        await roomTypePage.addRoomTypeDetails(roomtype, petspecies, treatment, description);
        // await roomTypePage.addRoomTypeDetails('sample123', 'Birds', 'No', 'Test the function');
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickCloseIcon();
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickConfirmationMessageNo();
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        await roomTypePage.validatateToastMessage(toast);
        // await roomTypePage.validatateToastMessage('Room Created Successfully');

    })

    test('TC005 - Cancel room type valid data', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);
        await roomTypePage.clickAddRoomTypeBtn();

        //from excel
        const excelReader = new ExcelReader();
        const RoomTypeTestdata = await excelReader.readExcel(pathone, 'RoomTypeTest');
        const { roomtype, petspecies, treatment, description, toast } = RoomTypeTestdata[0]

        await roomTypePage.addRoomTypeDetails(roomtype, petspecies, treatment, description);
        // await roomTypePage.addRoomTypeDetails('sample123', 'Birds', 'No', 'Test the function');
        await roomTypePage.clickCancelBtn();
        await roomTypePage.clickCloseIcon();
        await roomTypePage.clickCancelBtn();
        await roomTypePage.clickConfirmationMessageNo();
        await roomTypePage.clickCancelBtn();
        await roomTypePage.clickConfirmationMessageYes();

    })


    test('TC006 - edit room Type details', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const RoomTypeTestdata = await excelReader.readExcel(pathone, 'RoomTypeTest');
        const room = (RoomTypeTestdata[0].roomtype);
        const { roomtype, petspecies, treatment, description, toast } = RoomTypeTestdata[1]


        await roomTypePage.searchValue(room)     //sample123
        await roomTypePage.clickEditBtn(room)    //sample123
        await roomTypePage.addRoomTypeDetails(roomtype, petspecies, treatment, description);
        // await roomTypePage.addRoomTypeDetails('sample1234', 'Cat', 'No', 'Test the function');
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickCloseIcon();
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickConfirmationMessageNo();
        await roomTypePage.clickSubmitBtn();
        await roomTypePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        await roomTypePage.validatateToastMessage(toast);
        // await roomTypePage.validatateToastMessage('Successfully updated roomtype details');

    })

    test('TC007 - view room Type details', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const RoomTypeTestdata = await excelReader.readExcel(pathone, 'RoomTypeTest');
        const { roomtype } = RoomTypeTestdata[1]

        await roomTypePage.searchValue(roomtype)        //sample1234
        await roomTypePage.clickViewBtn(roomtype)       //sample1234
        await roomTypePage.clickCloseBtn();


    })


    test('TC008 - delete room Type details', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const RoomTypeTestdata = await excelReader.readExcel(pathone, 'RoomTypeTest');
        const { roomtype } = RoomTypeTestdata[1]
        const { toast } = RoomTypeTestdata[2]
        const elsetoast = (RoomTypeTestdata[3].toast)

        await roomTypePage.searchValue(roomtype)      //Testroom
        await roomTypePage.clickDeleteBtn(roomtype)   //Testroom
        await roomTypePage.clickCloseIcon();
        await roomTypePage.clickDeleteBtn(roomtype)   //TestRoom
        await roomTypePage.clickConfirmationMessageNo();
        await roomTypePage.clickDeleteBtn(roomtype)   //TestRoom
        await roomTypePage.clickConfirmationMessageYes();
        await page.waitForTimeout(1000)
        const expectedMessage = await roomTypePage.validatateToastMessage(toast);
        if (expectedMessage === toast) {
            console.log(expectedMessage);

        } else {
            console.log(elsetoast);

        }


    })


    test('TC009 - select species dropdown', async () => {
        const roomTypePage = new RoomTypePage(page);
        await page.waitForTimeout(1000);
        await roomTypePage.searchValue('');
        const getPetList = await roomTypePage.clickPetSpeciesDropDown('cow');
        console.log(getPetList);

    })

})