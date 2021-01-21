const elementUtil = require('../utils/web-element-util')

class SignInPage{ 

get username(){return $('#user_login')} 
get password(){return $('#user_password')} 
get signInBtn(){return $('input[name="commit"]')}
get rememberMe(){return $('#user_remember_me')}
get invalidLoginMessage(){return $('div[class="flash-alert mb-2"]')}

getPageTitle(){
    return elementUtil.getPageTitle()
}

signIn(email, pwd){
    elementUtil.sendKeysToElement(this.username,email)
    elementUtil.sendKeysToElement(this.password,pwd)
    elementUtil.clickOnElement(this.signInBtn)
}

isSignInBtnPresent(){
    return elementUtil.isElementEnabled(this.signInBtn)
}

enableRememberMe(){
    elementUtil.clickOnElement(this.rememberMe)
}

isRememberMeBtnChecked(){
    elementUtil.isElementSelected(this.rememberMe)
}

isInvalidLogin(){
    elementUtil.isElementDisplayed(this.invalidLoginMessage)
}

getInvalidLoginMessage(){
    elementUtil.getTextFromElement(this.invalidLoginMessage)
}
}

module.exports =  new SignInPage()