import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';

class PersonalPage extends PageObject {
    protected url: string = 'https://github.com/PotDi'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getTextName(): Promise<string> {
        await this.getName().waitForDisplayed({
            timeoutMsg: ''
        })
        return this.getName().getText()
    }

    public async getTextBio(): Promise<string> {
        await this.getBio().isDisplayed()
        return this.getBio().getText()
    }

    public async getTextPronouns(): Promise<string> {
        await this.getPronouns().isDisplayed() //waitForDisplayed
        return this.getPronouns().getText()
    }

    public async getTextEmail(): Promise<string> {
        await this.getEmail().isDisplayed()
        return this.getEmail().getText()
    }

    public isDisplayedName(): Promise<boolean> {
        return this.getName().isDisplayed()
    }

    private getName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="name"]')
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-bio-text]')
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="pronouns"]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="email"]')
    }

}

export {
    PersonalPage,
}