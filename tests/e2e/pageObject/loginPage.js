import { emailStorage } from '../utils/emailStorage.js';
class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = 'input[name=email]';
        this.passwordInput = 'input[name=password]';
        this.submitButton = '[type="submit"]';
    }

    async open() {
        await this.page.goto('https://dev.docs.ink/login');
    }

    async login() {
        const password = "amrita@21o3Snt?n\"/m"
        const email = emailStorage.getTestEmail();
        await this.page.fill(this.emailInput, email );
        await this.page.fill(this.passwordInput, password);
        await this.page.locator(this.submitButton).click();
    }
}

export { LoginPage };