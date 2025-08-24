const { expect } = require('@playwright/test');



class LoginPage {

  
  constructor(page) {
    this.page = page;
    this.SignInButton = page.locator("//button[contains(text(),'Login')]").nth(2);
    this.phoneNoField = page.locator("//input[@name='phone']"); 
    this.passwordField = page.locator("//input[@name='password']");
    this.loginButton = page.locator(".login-button-box button");
    this.errorMessage = page.locator("//div[@role='alert']/p");
    this.forgotPassword= page.locator(".singup-content a");
    this.loginWithOtp = page.locator("//span[contains(text(),'Login with OTP')]/..");
    this.loginWithUAE = page.locator("//span[contains(text(),'Login with UAE Pass')]/..");
    this.createAccount = page.locator(".create-account a");
    this.validationErrorMessage = page.locator("div.error").nth(0);
   
  }

  async gotoLoginPage(Url) {
    await this.page.goto(Url);
    await this.SignInButton.click();
    
  }

  async login(UserName, Password) {
    await this.phoneNoField.fill(UserName);
    await this.passwordField.fill(Password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getValidationErrorMessage() {
    return await this.validationErrorMessage.textContent();
  }

  async clickForgotPassword() {
    await this.forgotPassword.click();
  }
  

}

module.exports = { LoginPage };
