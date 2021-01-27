const elementUtil = require('../generic/web-element-util')

class HomePage{ 

get sigInBtn(){return $('//a[contains(text(),"Sign in")]')} 

clickOnSignInBtn(){
    elementUtil.clickOnElement(this.sigInBtn)
}
}

module.exports =  new HomePage()