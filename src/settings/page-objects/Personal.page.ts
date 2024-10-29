import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';

class PersonalPage extends PageObject {
    protected url: string = 'https://github.com/PotDi'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public getTextName(): Promise<string> {
        return this.getName().getText()
    }

    public getTextBio(): Promise<string> {
        return this.getBio().getText()
    }

    public getTextPronouns(): Promise<string> { //дождаться текста
        return this.getPronouns().getText()
    }

    public getTextEmail(): Promise<string> {
        return this.getEmail().getText()
    }

    public SaveAvatar(): Promise<Buffer> {
        return this.getAvatar().saveScreenshot('../common/')
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
    private getAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[//*[@id="upload-avatar-link"]')
    }

}

export {
    PersonalPage,
}