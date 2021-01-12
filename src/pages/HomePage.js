const elementUtil = require('../utils/webElementUtil')
const constants = require('../constants/PageTitles')

class SignInPage{ 

get sigInBtn(){return $('//a[contains(text(),"Sign in")]')} 

clickOnSignInBtn(){
    elementUtil.clickOnElement(this.sigInBtn)
}

}

module.exports =  new SignInPage()