import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';

class PersonalPage extends PageObject {
    protected url: string = 'https://github.com/PotDi'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getTextName(): Promise<string> {
        await this.getName().waitForDisplayed({
            timeoutMsg: 'Text name was not displayed'
        })
        return this.getName().getText()
    }

    public async getTextBio(): Promise<string> {
        await this.getBio().waitForDisplayed({
            timeoutMsg: 'Text Bio was not displayed'
        })
        return this.getBio().getText()
    }

    public async getTextPronouns(): Promise<string> {
        await this.getPronouns().waitForDisplayed({
            timeoutMsg: 'Text pronouns was not displayed'
        })
        return this.getPronouns().getText()
    }

    public async getTextEmail(): Promise<string> {
        await this.getEmail().waitForDisplayed({
            timeoutMsg: 'Text pronouns was not displayed'
        })
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