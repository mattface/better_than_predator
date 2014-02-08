'use strict';

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    specs: ['../specs/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true // Use colors in the command line report.
    }
};