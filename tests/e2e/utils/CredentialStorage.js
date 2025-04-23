import {config} from '../config.js';

class CredentialStorage {
    constructor() {
        this._credentials = new Map(); // Using Map to store credentials
    }

    // Set credentials under a dynamic key
    setCredentials(key, { email, password }) {
        if (typeof email !== 'string' || !email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (typeof password !== 'string' || password.length < 6) {
            throw new Error('Invalid password.');
        }

        this._credentials.set(key, { email, password });
    }

    // Get credentials by dynamic key
    getCredentials(key) {
        const credentials = this._credentials.get(key);

        if (!credentials || !credentials.email || !credentials.password) {
            return null;
        }

        return credentials;
    }

    generateTestEmail() {
        const serverDomain = config.serverDomain;
        const randomString = new Date().getTime(); // Using the current timestamp for uniqueness
        return `${randomString}${serverDomain}`;
    }

    clearCredentials() {
        this._credentials.clear();
    }
}

export const credentialStorage = new CredentialStorage();
