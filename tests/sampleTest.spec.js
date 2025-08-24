import { test, expect } from '@playwright/test';

test('Launch url', async ({ page }) => {
  await page.goto('https://test-pms-dev.medyaan.com/home/');
  await page.getByRole('button', { type: 'button' }).nth(5).click();
  await page.locator("//input[@name='phone']").fill('7094755145');
  //await page.waitForTimeout(1000);
  await page.locator("//input[@name='password']").fill('Test@123');
  await page.waitForTimeout(1000);
  await page.locator("div.login-button-box>button").click();
  const value = page.locator("//a[@class='nav-link active']");
  console.log(await value.textContent());
  await page.waitForTimeout(2000);
  //add users
  await page.locator("(//div[@class='v-list-item__icon'])[9]").hover();
  await page.waitForTimeout(1000);
  await page.locator("(//div[text()='Users'])/..").click();
  await page.waitForTimeout(1000);
  await page.locator(".room-text-end>button~button").click();

  //select user role
  await page.waitForSelector("#dropzone");
  await page.locator("#dropzone").click();
  await page.waitForTimeout(1000);
  await page.locator("//span[text()='Select User Role']").click();
  await page.waitForTimeout(1000);
  await page.locator("//span[text()='Admin']").click();
  await page.waitForTimeout(1000);
  await page.locator("#dropzone").setInputFiles('tests/Uploadfiles/file1.png');
  await page.locator(".multiselect__tags").click();
  await page.waitForTimeout(1000);
  await page.locator("//span[text()='AWC Admin']/..").click();
  await page.waitForTimeout(1000);

  await page.locator("#firstName").fill('Arun');
  await page.locator("#lastName").fill('R');
  await page.selectOption('#gender', { label: 'Male' });
  await page.selectOption('#language', { label: 'English' });
  await page.locator("#mobileNumber").fill('7094753145');
  await page.locator("#email").fill('arun@medyaan.com');
  await page.selectOption('#maritalStatus', { label: 'Single' });
  await page.locator("#emergencyContactNumber").fill('Arun');
  await page.locator("#address").fill('rjpm');
  await page.selectOption('#emirateValue', { label: 'Abu Dhabi' });
  await page.locator("#emiratesId").fill('7094');
  await page.locator("#trnNo").fill('55145');
  await page.waitForTimeout(3000);
  await page.locator('#dateOfBirth').click();
  await page.locator("//span[contains(text(),'2025')]").click();
  const locator = await page.locator("//button[@aria-label='Previous Year']");

  for (let i = 0; i < 2; i++) {
    await locator.click();
  }
  await page.locator("//td[@class='available']//a[text()='2000']").click();
  await page.locator("//a[text()='Oct']").click();
  await page.locator("//td[@class='available']/div/span[contains(text(), '24')]").click();

  await page.waitForTimeout(3000);



});


