const { defineConfig } = require("cypress");
require('dotenv').config();


module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'ddmmyyyy_HHMMss',
  },

  env: {
    username: process.env.CYPRESS_username || 'qa.assessment@asians.cloud',
    password: process.env.CYPRESS_password || 'qaengineer123',
    originUrl: 'https://user.asians.group'

  },

  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    baseUrl: process.env.CYPRESS_baseUrl || 'https://console.asians.group/',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on);
      // return config;
    },
  },
});