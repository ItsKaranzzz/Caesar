# Caesar: A Javascript based testing framework

Caesar is a javascript test automation framework solution to cater to various testing needs such as web, apis and mobile.

## Tech stack

nodeJs : open source javascript runtime environment
Mocha : javascript testing framework
webdriverIO for mobile: mobile and web automation framework
chai: TDD and BDD assertion libraries
allure: Reporting
log4js: logging
request: 
request-promise: The simplified HTTP request client 'request' with Promise support

## Framework capabilities:

Reporting
Logging
Api testing
Cross-browser testing
Mobile app & web testing
CI and CD
Slack integration alerts for MR (#caesar-reports slack channel)


## Installation

Taking the first step
You’ll need Node.js installed.
* Install at least v12.16.1 or higher as this is the oldest active LTS version

Install WebdriverIO CLI
Now, install the CLI:
$ npm i --save-dev @wdio/cli

Generate Configuration File
Next, you’ll generate a configuration file to store your WebdriverIO settings.
To do that, just run the configuration utility:
$ npx wdio config -y
That's it! The configurator will install all required packages for you and create a config file called wdio.conf.js.

Clone the repo:
https://gitlab.com/karanc/caesar.git

## Usage & commands

Commands for api test execution : 
npx mocha ./test/api/*.js --reporter mocha-allure-reporter
allure generate allure-results    
allure open 

Commands for web ui test execution:
npx wdio run wdio.conf.js --spec ./test/web/**.js 

Command as per test-tags:
smoke: npx mocha ./test/api/*.js --grep @smoke --reporter mocha-allure-reporter
regression: npx mocha ./test/api/*.js --grep @regression --reporter mocha-allure-reporter

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.