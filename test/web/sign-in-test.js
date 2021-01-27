const { assert } = require('chai')
const homePage = require('../../src/web/pages/home-page')
const signInPage = require('../../src/web/pages/sign-in-page')
const constants = require('../../src/web/constants/page-titles')

describe("Browser verification page feature", function(){
    
    it('verify user should see browser verification screen before sign in to app @smoke', function(){
        browser.url('/');
        browser.maximizeWindow();
        homePage.clickOnSignInBtn();
        const actualTitle = signInPage.getPageTitle();
        assert.equal(actualTitle, constants.CHECKING_BROWSER_PAGE,'Checking browser title was not expected!');  
    });

});