import { PageObject } from "./PageObject";
import { ChainablePromiseElement } from 'webdriverio';

class PersonalPage extends PageObject {
    protected url: string = 'https://github.com/PotDi'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }
    public isDisplayedName(): Promise<boolean> {
        return this.getName().isDisplayed()
    }
    public isDisplayedBio(): Promise<boolean> {
        return this.getBio().isDisplayed()
    }
    public isDisplayedPronouns(): Promise<boolean> {
        return this.getPronouns().isDisplayed()
    }
    private getName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="name"]')
    }
    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-bio-text]')
    }
    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[@itemprop="pronouns"]')
    }

}

export {
    PersonalPage,
}