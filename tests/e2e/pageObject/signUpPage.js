import Mailosaur from 'mailosaur';
import { emailStorage } from '../utils/emailStorage.js';
import { config } from '../config.js';

class SignUpPage {
    constructor(page) {
        this.page = page;

        this.firstNameInput = 'input[name=first_name]';
        this.lastNameInput = 'input[name=last_name]';
        this.emailInput = 'input[name=email]';
        this.phoneInput = 'input[name=phoneNumber]';
        this.passwordInput = 'input[name=password]';
        this.confirmPasswordInput = 'input[name=confirmPassword]';
        this.companyInput = 'input[name=company_name]';
        this.checkbox = '[role="checkbox"]';
        this.submitButton = '[type="submit"]';
        this.otpInput = 'input[id=otp-input]';
        this.successMessageBox = 'div[data-title]';
    }

    async open() {
        await this.page.goto('https://dev.docs.ink/register');
    }

    async signUp(){
        const testEmail = emailStorage.generateTestEmail();
        const testPassword = emailStorage.generateStrongPassword();

        await this.page.fill(this.firstNameInput, "Test");
        await this.page.fill(this.lastNameInput, "Test");
        await this.page.fill(this.emailInput, testEmail);
        await this.page.fill(this.phoneInput, "+977 9861839333");
        await this.page.fill(this.passwordInput, testPassword);
        await this.page.fill(this.confirmPasswordInput, testPassword);
        await this.page.fill(this.companyInput, "xyz");

        await this.page.locator(this.checkbox).click();
        await this.page.locator(this.submitButton).click();
        const searchCriteria = {
            sentTo: testEmail,
            timeout: 60000
        };
        const mailosaur = new Mailosaur(config.apiKey);
        const email = await mailosaur.messages.get(config.serverId, searchCriteria);
        const code = email.html.codes[0].value;
        await this.page.fill(this.otpInput, code);
        await this.page.locator(this.submitButton).click();
        emailStorage.setTestEmail(testEmail);
    }
    async getSuccessMessage(){
        return  await this.page.textContent(this.successMessageBox)
    }

}

export { SignUpPage };