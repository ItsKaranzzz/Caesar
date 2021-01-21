const { assert } = require('chai')
const homePage = require('../../src/pages/HomePage')
const signInPage = require('../../src/pages/signInPage')
const constants = require('../../src/constants/PageTitles')

describe("Browser verification page feature", function(){
    
    it('verify user should see browser verification screen before sign in to app', function(){
        browser.url('/');
        browser.maximizeWindow();
        homePage.clickOnSignInBtn();
        const actualTitle = signInPage.getPageTitle();
        assert.equal(actualTitle, constants.CHECKING_BROWSER_PAGE,'Checking browser title was not expected!');  
    });

});