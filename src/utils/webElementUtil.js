class WebElementUtils
{
   clickOnElement(element){
        element.waitForDisplayed()
        element.click()
    }
    sendKeysToElement(element,keyValue){
        element.waitForClickable()
        element.clearValue()
        element.setValue(keyValue)
    }
    getTextFromElement(element){
        element.waitForDisplayed()
        return element.getText()
    }
    getPageTitle(pageTitle){
        browser.waitUntil(function(){
            return (browser.getTitle() === pageTitle)
        },10000, 'title was not retreived in give time')
        return browser.getTitle()
    }
    isElementDisplayed(element){
        element.waitForDisplayed()
        return element.isDisplayed()
    }
    isElementEnabled(element){
        element.waitForDisplayed()
        return element.isEnabled()
    }
    isElementSelected(element){
        element.waitForDisplayed()
        return element.isSelected()
    }
    maximizeWindow(){
        browser.maximizeWindow()
    }
    scrollToElement(element){
        element.scrollIntoView()
    }
    saveScreenShotOfTheElement(element, path){
        element.waitForDisplayed()
        element.saveScreenShot(path)
    }
    dragAndDrop(element, targetElement){
        element.waitForDisplayed()
        element.dragAndDrop(targetElement)
    }
}
module.exports = new WebElementUtils()