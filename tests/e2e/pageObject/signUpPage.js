import Mailosaur from 'mailosaur';
import { credentialStorage } from '../utils/CredentialStorage.js';
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

    async signUp(data){
        const { firstName, lastName, email, phone, password, companyName } = data;
        const testEmail = email + credentialStorage.generateTestEmail();

        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.emailInput, testEmail);
        await this.page.fill(this.phoneInput, phone);
        await this.page.fill(this.passwordInput, password);
        await this.page.fill(this.confirmPasswordInput, password);
        await this.page.fill(this.companyInput, companyName);

        await this.page.locator(this.checkbox).click();
        await this.page.locator(this.submitButton).click();
        const searchCriteria = {
            sentTo: testEmail,
            timeout: 60000
        };
        const mailosaur = new Mailosaur(config.apiKey);
        const emailContent = await mailosaur.messages.get(config.serverId, searchCriteria);
        const code = emailContent.html.codes[0].value;
        await this.page.fill(this.otpInput, code);
        await this.page.locator(this.submitButton).click();
        credentialStorage.setCredentials(email,{email:testEmail, password});
    }

    async getSuccessMessage(){
        return  await this.page.textContent(this.successMessageBox)
    }

}

export { SignUpPage };