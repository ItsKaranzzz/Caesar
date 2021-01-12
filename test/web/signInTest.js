const { assert } = require('chai')
const homePage = require('../../src/pages/HomePage')
const signInPage = require('../../src/pages/signInPage')
const constants = require('../../src/constants/PageTitles')

describe("Sign in page feature", function(){
    
    it('verify sign in page title', function(){
        browser.url('/');
        browser.maximizeWindow();
        homePage.clickOnSignInBtn();
        const actualTitle = signInPage.getPageTitle(constants.SIGN_IN_PAGE_TITLE);
        console.log(actualTitle)
        assert.equal(actualTitle, constants.SIGN_IN_PAGE_TITLE,'Sign page title was not expected!');  
    });

    it('verify sign in to the app', function(){
        browser.url('/')
        browser.maximizeWindow()
        homePage.clickOnSignInBtn()
        signInPage.signIn('asda','asdas')
        assert.isTrue(signInPage.isInvalidLogin,'Invalid login message did not appear')
        assert.equal(signInPage.getInvalidLoginMessage, constants.INVALID_SIGN_IN_MESSAGE, 'invalid sign in message was incorrect!')
      });

    
});