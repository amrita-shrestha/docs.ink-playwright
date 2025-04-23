export default {
    require: [
        './tests/e2e/stepDefinitions/**/*.js',  // Path to step definitions
        './tests/e2e/hooks.js',                 // Path to hooks file
    ],
    format: ['@cucumber/pretty-formatter'], // Format the output for readability
};
// Visit official site for docs https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md