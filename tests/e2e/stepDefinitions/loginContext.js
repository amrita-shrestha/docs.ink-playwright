import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pageObject/loginPage.js';
import assert from "node:assert";

Given('the user has browsed to the login page', async function() {
    const loginPageObj = new LoginPage(this.page);
    await loginPageObj.open();
});

When('the user logs in with email {string} and password {string}', async function (email, password) {
    const loginPageObj = new LoginPage(this.page);
    await loginPageObj.login(email, password);
});

When('the user tries to log in with email {string} and password {string}', async function (email, password) {
    const loginPageObj = new LoginPage(this.page);
    await loginPageObj.login(email, password);
});

Then('the warning message {string} should pop-up', async function (expectedMessage) {
    const loginPageObj = new LoginPage(this.page);
    const actualMessage = await loginPageObj.getWarningMessage();
    assert.equal(actualMessage, expectedMessage,`Error message miss-match, Expected: '${expectedMessage}', Found: '${actualMessage}'`)
});
