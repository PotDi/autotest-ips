import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'

class MainPage extends PageObject {
    private getUserLOgin(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="ines4348"]')
    }

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getUserLOgin().isDisplayed()
    }
}

export {
    MainPage,
}