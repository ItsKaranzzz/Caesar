const { assert } = require('chai')
const homePage = require('../../src/pages/home-page')
const signInPage = require('../../src/pages/sign-in-page')
const constants = require('../../src/constants/page-titles')

describe("Browser verification page feature", function(){
    
    it('verify user should see browser verification screen before sign in to app @smoke', function(){
        browser.url('/');
        browser.maximizeWindow();
        homePage.clickOnSignInBtn();
        const actualTitle = signInPage.getPageTitle();
        assert.equal(actualTitle, constants.CHECKING_BROWSER_PAGE,'Checking browser title was not expected!');  
    });

});