const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../POM_AdminPages/LoginPage');
const { ExcelReader } = require('../../utils/AdminUtils/ExcelReader');
const { UsersPage } = require('../../POM_AdminPages/UsersPage');
const { TaskStagePage } = require('../../POM_AdminPages/TaskStagePage');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

test.describe('TS03 - Task Stage', () => {


    test.beforeAll('Launch Browser', async ({ browser }) => {
        context = await browser.newContext(); //{ viewport: { width: 1366, height: 580 } }
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

    test('TC003 - Navigate to Task Management', async () => {
        const taskStagePage = new TaskStagePage(page);
        await taskStagePage.navigateToTaskStage();
    })



    test('TC004 - Add task stage with valid data', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);
        await taskStagePage.clickAddTaskStageBtn();

          //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { stageName, Status, description } = TaskStagedata[2];
        const{Toast} = TaskStagedata[4];

        await page.waitForTimeout(1000);
        await taskStagePage.addTaskSatgeDetails(stageName, Status, description);
        // await taskStagePage.addTaskSatgeDetails('new', 'No', 'test the function');
        await taskStagePage.clickNeonColor();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskStagePage.validateToastMessage(Toast);
        // await taskStagePage.validateToastMessage('Task stage created successfully');

    })


    test('TC005 - Cancel task stage with valid data', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);
        await taskStagePage.clickAddTaskStageBtn();
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { stageName, Status, description } = TaskStagedata[0];

        await taskStagePage.addTaskSatgeDetails(stageName, Status, description);
        // await taskStagePage.addTaskSatgeDetails('sample', 'No', 'test the function');
        await taskStagePage.clickGreenColor();
        await page.waitForTimeout(1000);
        await taskStagePage.clickCancelBtn();
        await taskStagePage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskStagePage.clickCancelBtn();
        await taskStagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskStagePage.clickCancelBtn();
        await taskStagePage.clickConfirmationYes();


    })


    test('TC006 - edit task stage details', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { search } = TaskStagedata[2];

        await taskStagePage.searchTheValue(search);
        await taskStagePage.clickEditIcon(search);

        // await taskStagePage.searchTheValue('new');
        // await taskStagePage.clickEditIcon('new');
        await page.waitForTimeout(1000);

        //from excel
        const excelReader1 = new ExcelReader();
        const TaskStagedata1 = await excelReader1.readExcel(pathone, 'TaskStageTest');
        const { stageName, Status, description, Toast } = TaskStagedata1[1];

        await taskStagePage.addTaskSatgeDetails(stageName, Status, description);
        // await taskStagePage.addTaskSatgeDetails('NewStage', 'No', 'test the function');
        await taskStagePage.clickNeonColor();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickCloseIcon();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickConfirmationNo();
        await page.waitForTimeout(1000);
        await taskStagePage.clickSubmitBtn();
        await taskStagePage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskStagePage.validateToastMessage(Toast);
        // await taskStagePage.validateToastMessage('Task stage updated successfully');
                
    })

    test('TC007 - view task stage', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { stage } = (TaskStagedata[1].stageName);

        await taskStagePage.searchTheValue(stage)
        await page.waitForTimeout(1000);
        await taskStagePage.clickViewIcon(stage);
        // await taskStagePage.searchTheValue('NewStage')
        // await page.waitForTimeout(1000);
        // await taskStagePage.clickViewIcon('NewStage');
        await page.waitForTimeout(1000);
        await taskStagePage.backBtn.click();


    })

    test('TC008 - delete task stage details', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);

        //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { stage } = (TaskStagedata[1].stageName);
        const { Toast } = TaskStagedata[2];

        await taskStagePage.searchTheValue(stage)      //New stage
        await page.waitForTimeout(1000);
        await taskStagePage.clickDeleteIcon(stage);    //New stage
        await taskStagePage.closeIcon.click();
        await page.waitForTimeout(1000);
        await taskStagePage.clickDeleteIcon(stage);    //New stage
        await taskStagePage.clickConfirmationNo();
        await taskStagePage.clickDeleteIcon(stage);    //New stage
        await taskStagePage.clickConfirmationYes();
        await page.waitForTimeout(1000)
        await taskStagePage.validateToastMessage(Toast);
        // await taskStagePage.validateToastMessage('Task stage deleted successfully');
    })

    test('TC009 - Add task stage with Invalid data', async () => {
        const taskStagePage = new TaskStagePage(page);
        await page.waitForTimeout(1000);
        await taskStagePage.clickAddTaskStageBtn();
        await page.waitForTimeout(2000);
        await taskStagePage.clickSubmitBtn();
        await page.waitForTimeout(1000)

        //from excel
        const excelReader = new ExcelReader();
        const TaskStagedata = await excelReader.readExcel(pathone, 'TaskStageTest');
        const { Toast } = TaskStagedata[3];

        await taskStagePage.validateErrorMessage(Toast);
        // await taskStagePage.validateErrorMessage('Stage name is required');
        await page.waitForTimeout(1000)
        await taskStagePage.backBtn.click();


    })


})