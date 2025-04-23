import {credentialStorage} from "../utils/CredentialStorage.js";

class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = 'input[name=email]';
        this.warningMessageBox = '[id=":r0:-form-item-message"]';
        this.passwordInput = 'input[name=password]';
        this.submitButton = '[type="submit"]';
    }

    async open() {
        await this.page.goto('https://dev.docs.ink/login');
    }

    async login(email,password) {
        let credentials = credentialStorage.getCredentials(email);
        if (credentials === null) {
            credentials = { email, password };
        }
        await this.page.fill(this.emailInput, credentials.email );
        await this.page.fill(this.passwordInput, credentials.password);
        await this.page.locator(this.submitButton).click();
    }

    async getWarningMessage(){
        return  await this.page.locator(this.warningMessageBox).textContent();
    }
}

export { LoginPage };