## Requirement
- create account on [Mailosaur](https://mailosaur.com/)
- create api key
- set SERVER_ID , API_kEY, SERVER_DOMAIN while running test or directly in config.js
  - MAILOSAUR_API_KEY = API_kEY
  - MAILOSAUR_SERVER_ID = SERVER_ID
  - MAILOSAUR_SERVER_DOMAIN = SERVER_DOMAIN

## Test Directory Structure
```
        tests
        |----e2e
        |    |----features   
        |    |    |----feature files(cucumber gherkin files)   
        |    |----pageObject(POM)
        |    |    |----page objects for webUI tests (javascript files)  
        |    |----stepDefinitions
        |    |    |----contexts and traits (javascript files)
        |    |----config.js (playwright configuration)
        |    |----hooks.js 
        |----cucumber.js (cucumber configuration)
```

### Run E2E Tests

#### Test Modes
| Environment | Defaults | Description                                                                                             |
|:------------|:---------|:--------------------------------------------------------------------------------------------------------|
| BROWSER     | `chrome` | _browser_ to be used for the tests. Available options are `firefox`, `chromium`, and `safari`.          |
| SLOW_MO     | `0`      | to slow the test execution time by `n` milliseconds                                                     |
| HEADLESS    | `false`  | to run the tests in _headless_ mode                                                                     |

To run a whole test suite, use the following command:
```shell
npm test tests/e2e/features
```
To run a particular test feature, simply add the path to the feature file with the test command as:
```shell
npm test tests/e2e/features/login.feature
```
To run a specific test scenario, we can make use of the line number of the scenario in the feature file.
```shell
npm test tests/e2e/features/login.feature:6
```

### Debugging Tools
Playwright provide us various debugging tool. Visit [playwright official website](https://playwright.dev/docs/debug) for detail information  

#### Environment Variables
| Environment    | Defaults        | Description                                                                              |
|:---------------|:----------------|:-----------------------------------------------------------------------------------------|
| PWDEBUG        | `0`             | open [Playwright Inspector](https://playwright.dev/docs/inspector)                       |
| REPORT_DIR     | `tests/reports` | path to store different test reports                                                     |
| RECORD_VIDEO   | `false`         | if set "true", videos are recorded for the failing tests                                 |
| MONITOR_XHRS   | `false`         | if set "true", browser XHRs are logged during the test run                               |
| REPORT_TRACING | `false`         | if set "true", trace reports are generated for the failing tests                         |

#### Example Scripts
```script
PWDEBUG=1 npm test tests/e2e/features/login.feature:6

HEADLESS=true npm test tests/e2e/features/login.feature:6

MONITOR_XHRS=true npm test tests/e2e/features/login.feature:33

RECORD_VIDEO=true npm test tests/e2e/features/login.feature:33

REPORT_TRACING=true npm test tests/e2e/features/login.feature:33
```

#### Viewing the Trace Reports
When running tests with `REPORT_TRACING` enabled, traces are generated for the failing tests and are saved inside `tracing` folder inside `REPORT_DIR` directory. We can open the saved trace using the Playwright trace viewer system as:

```shell
cd tests/reports/tracing
npx playwright show-trace path/to/file.zip
```

> **Note:** If videos are recorded for the failing tests, they are saved inside `videos` folder inside `REPORT_DIR` directory.

#### Debugging
We have two environment variables available for debugging:
1. **RECORD_VIDEO**: true (to record video)
2. **MONITOR_XHRS**: true (to record response)

## Task Done
1. Developed Playwright UI tests using Gherkin syntax 
2. Set up test lifecycle hooks (e.g., Before, After)
3. Enabled video recording of test sessions
4. Integrated Mailosaur for handling temporary email addresses 
5. Enabled Trace Viewer for debugging test flows 
6. Added clean-up logic after test execution 
7. Implemented XHR request/response logging 
8. Tests run across multiple browsers 
9. Store logic for user credential
10. Supports configuration via environment variables 

### Tests case 
Limited tests cases has been implemented with other playwright features. 
When scenario fails, it will take some time to generate report in "tests/reports"
```script
RECORD_VIDEO=true npm test tests/e2e/features/login.feature:33
```

|feature| scenario                                                                |automated
|-----|-------------------------------------------------------------------------|---
|signUp| signUp with valid ceredential                                           | yes
|signUp| signUp with invalid ceredential                                         | no because automating process is same
|login | user logs in successfully with valid credentials                        |yes
|login | user tries to logs in with invalid valid credentials                    |yes
|login | user tries to logs in with invalid valid credentials (failing scenario) |yes (will fail and generate report)