const withHttp = (url) => (/^https?:\/\//i.test(url) ? url : `http://${url}`);

export const config = {
    apiKey : process.env.MAILOSAUR_API_KEY ?? "add-your-own-api-key",
    serverId: process.env.MAILOSAUR_SERVER_ID ?? "add-your-own-server-id",
    serverDomain: process.env.MAILOSAUR_SERVER_DOMAIN ?? "add-your-own-server-domain",
    get baseUrl() {
        return withHttp(process.env.BASE_URL || 'https://dev.docs.ink/');
    },
    // cucumber
    timeout: parseInt(process.env.TIMEOUT) || 60,

    // playwright
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    headless: process.env.HEADLESS === 'true',
    /**
     * @description browser to be used for the tests
     * can be set using the environment variable: BROWSER
     * @type {string} defaults to: `chrome`, but `firefox`, `safari`, `chromium` can be used
     */
    browserToUse: process.env.BROWSER ?? 'chrome',
    /**
     * @description directory to store test-related reports
     * can be set using the environment variable: REPORTS_DIR
     * @type {string} defaults to: `./reports`
     */
    reportDir: process.env.REPORT_DIR ?? './tests/reports',
    /**
     * @description set to true to record video of the test runs
     * can be set using the environment variable: RECORD_VIDEO
     * @type {boolean} defaults to: false
     */
    recordVideo: process.env.RECORD_VIDEO === 'true',
    /**
     * @description set to true to report the whole stack trace of the test runs
     * can be set using the environment variable: REPORT_STACK_TRACE
     * @type {boolean} defaults to: false
     */
    reportTracing: process.env.REPORT_TRACING === 'true',
    /**
     * @description set to true to report the browser network of the test runs
     * can be set using the environment variable: REPORT_BROWSER_LOGS
     * @type {boolean} defaults to: false
     */
    monitorXhrs: process.env.MONITOR_XHRS === 'true',
    /**
     * @description minimum delay timeout to wait for UI interactions
     * @type {number} in milliseconds
     */
    delayTimeOut: 200
};
