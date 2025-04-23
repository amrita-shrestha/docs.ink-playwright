
import { Before, BeforeAll, AfterAll, After, setDefaultTimeout} from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import { config } from './config.js';
import path from 'path';
import fs from 'fs';

setDefaultTimeout(config.timeout * 1000);

let browser;
let page;

BeforeAll(async function () {
    const browserConfiguration = {
        slowMo: config.slowMo,
        firefoxUserPrefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true
        },
        headless: config.headless
    };

    browser = await (async () => {
        switch (config.browserToUse) {
            case 'firefox':
                return firefox.launch(browserConfiguration);
            case 'safari':
                return webkit.launch(browserConfiguration);
            case 'chromium':
                return chromium.launch(browserConfiguration);
            default:
                return chromium.launch({ ...browserConfiguration, channel: 'chrome' });
        }
    })();
});

AfterAll(async function () {
    await browser.close();
});

Before(async function () {
    const configs = {};

    if (config.recordVideo) {
        configs['recordVideo'] = {
            dir: path.join(config.reportDir, 'videos'),
            size: { width: 1920, height: 1080 }
        };
    }

    this.context = await browser.newContext(configs);
    if (config.reportTracing) {
        await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    }

    this.page = await this.context.newPage();

    if (config.monitorXhrs) {
        this.page.on('request', (request) => console.debug('>>', request.method(), request.url()));
        this.page.on('response', (response) => console.debug('<<', response.status(), response.url()));
    }
    await this.page.goto(config.baseUrl);

});

After(async function (scenarioResult) {
    if (scenarioResult?.result?.status === 'FAILED') {
        if (config.reportTracing) {
            const currentScenario = scenarioResult.pickle.name.trim().replace(/\s/g, '_');
            const timestamp = new Date().toISOString().replace(/:/g, '-');

            await this.context.tracing.stop({
                path: path.join(config.reportDir, 'tracing', `${currentScenario}_${timestamp}.zip`)
            });
        }
    } else {
        if (config.recordVideo) {
            // delete recorded video for passed scenarios
            const vPath = await this.page.video().path();

            if (vPath) {
                fs.unlinkSync(vPath);
            }
        }
    }
    await this.page.close();
    await this.context.close();
});