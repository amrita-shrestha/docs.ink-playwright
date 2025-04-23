import {Given, When, Then} from "@cucumber/cucumber";
import {SignUpPage} from "../pageObject/signUpPage.js";
import assert from "node:assert";

Given('the user has browsed to the sign-up page', async function() {
    const signUpPageObj = new SignUpPage(this.page);
    await signUpPageObj.open();
});

When('the user sign-up with valid email and password using webUI', async function (dataTable) {
    const signUpPageObj = new SignUpPage(this.page);
    const data = dataTable.rowsHash();
    await signUpPageObj.signUp(data);
});

Then('the message {string} should pop-up', async function (expectedMessage) {
    const signUpPageObj = new SignUpPage(this.page);
    const actualMessage = await signUpPageObj.getSuccessMessage();
    assert.equal(actualMessage, expectedMessage,`Error message miss-match, Expected: '${expectedMessage}', Found: '${actualMessage}'`)
});

Given('the user had sign-up with valid email and password using webUI', async function (dataTable) {
    const signUpPageObj = new SignUpPage(this.page);
    const data = dataTable.rowsHash();
    await signUpPageObj.signUp(data);
    const actualMessage = await signUpPageObj.getSuccessMessage();
    const expectedMessage= "Registration Successful"
    assert.equal(actualMessage, expectedMessage,`Error message miss-match, Expected: '${expectedMessage}', Found: '${actualMessage}'`)
});


