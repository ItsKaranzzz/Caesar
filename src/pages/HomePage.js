const elementUtil = require('../utils/webElementUtil')
const constants = require('../constants/PageTitles')

class HomePage{ 

get sigInBtn(){return $('//a[contains(text(),"Sign in")]')} 

clickOnSignInBtn(){
    elementUtil.clickOnElement(this.sigInBtn)
}
}

module.exports =  new HomePage()