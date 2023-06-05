const {defineConfig} = require("cypress");
const {prepareAudit, lighthouse} = require("@cypress-audit/lighthouse");
const fs = require("fs");

// const { pa11y } = require("@cypress-audit/pa11y");
module.exports = {
    e2e: {
        baseUrl: "http://localhost:3000/", // this is your app
        setupNodeEvents(on, config) {
            on("before:browser:launch", (browser = {}, launchOptions) => {
                prepareAudit(launchOptions);
            });
            on("task", {
                lighthouse: lighthouse((lighthouseReport) => {
                    const reportPath = './cypress/reports'
                    fs.writeFileSync(`${reportPath}/report.json`, JSON.stringify(lighthouseReport, null, 2))
                }),
            });
        },
    }
}

