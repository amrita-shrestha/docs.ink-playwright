import generatePassword from 'generate-password';

class EmailStorage {
    constructor() {
        this._testEmail = ''; // Private property to store the test email
    }

    // Setter method to set the test email
    setTestEmail(email) {
        if (typeof email !== 'string' || !email.includes('@')) {
            throw new Error('Invalid email format');
        }
        this._testEmail = email;
    }

    // Getter method to get the test email
    getTestEmail() {
        if (!this._testEmail) {
            throw new Error('Test email not set. Please generate the email first.');
        }
        return this._testEmail;
    }

    // Method to generate a new test email and store it
    generateTestEmail() {
        const serverDomain = "@hi3yrhsj.mailosaur.net";
        const randomString = new Date().getTime(); // Using the current timestamp for uniqueness
        return `${randomString}${serverDomain}`;
    }

    generateStrongPassword() {
        return generatePassword.generate({
            length: 16,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true
        });
    }
}

// Export the EmailStorage class as a default export for global access
export const emailStorage = new EmailStorage();
