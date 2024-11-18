export const config: WebdriverIO.Config = {
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },
    specs: ['./src/**/*.test.ts'],
    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['window-size=1366,768'],
        },
        acceptInsecureCerts: true
    }],
    logLevel: 'error',
    waitforTimeout: 20000,
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    services: ['chromedriver',
        ['image-comparison', {
            autoSaveBaseline: true,
            clearRuntimeFolder: true,
            baseline: `./references-screenshots`,
            formatImageName: '{tag}-{browserName}',
            screenshotPath: `./actual-screenshots`,
        }]
    ],
    reporters: ['spec'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
