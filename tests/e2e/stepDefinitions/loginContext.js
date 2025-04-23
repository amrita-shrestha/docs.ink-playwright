import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pageObject/loginPage.js';

Given('the user has browsed to the login page', async function() {
    const loginPageobj = new LoginPage(this.page);
    await loginPageobj.open();
});

When('the user logs in with valid email and password', async function () {
    const loginPageobj = new LoginPage(this.page);
    await loginPageobj.login();
});
