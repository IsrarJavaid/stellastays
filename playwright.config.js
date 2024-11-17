const { defineConfig } = require('@playwright/test');
const dotenv = require('dotenv');
const fs = require('fs');

const ENV = process.env.ENV || 'dev'; 
const envFile = `.env.${ENV}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  throw new Error(`Environment file ${envFile} does not exist`);
}

module.exports = defineConfig({
  testDir: './tests', 
  timeout: 30000, 
  reporter: [
    ['list'], 
    ['allure-playwright', {outputDir: 'test-results'}], 
  ],
  use: {
    trace: 'on', 
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure', 
    baseURL: process.env.BASE_URL,
  },
});
