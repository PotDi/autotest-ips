import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObject'
import { EmailType, PronounsType } from '../types/types'
//убрать неиспользуемый импорт (поправил)
class ProfilePage extends PageObject {
    protected url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async clearInputName(): Promise<void> {
        await this.getProfileName().waitForDisplayed({
            timeoutMsg: 'Input name was not displayed'
        })
        await this.getProfileName().clearValue()
    }

    public async clearInputBio(): Promise<void> {
        await this.getProfileBio().waitForDisplayed({
            timeoutMsg: 'Input Bio was not displayed'
        })
        await this.getProfileBio().clearValue()
    }

    //название метода с маленькой буквы и изменить метод на isDiplayed (поправлено)
    public async waitForDisplayedProfileForm(): Promise<void> {
        await this.getProfileName().isDisplayed()
    }

    public async setName(name: string): Promise<void> {
        await this.getProfileName().waitForDisplayed({
            timeoutMsg: 'Input name was not dislpayed'
        })
        await this.getProfileName().setValue(name)
    }

    public async setBio(summary: string): Promise<void> {
        await this.getProfileBio().waitForDisplayed({
            timeoutMsg: 'Input Bio was not displayed'
        })
        await this.getProfileBio().setValue(summary)
    }

    public async setEmail(email: EmailType): Promise<void> {
        await this.getProfileEmail().waitForDisplayed({
            timeoutMsg: 'Input email was not displayed'
        })
        await this.getProfileEmail().selectByAttribute('value', email)
    }

    // переиспользовать этот метод при очистке(сделано)
    public async setProfilePronouns(pronouns: PronounsType): Promise<void> {
        await this.getProfilePronouns().waitForDisplayed({
            timeoutMsg: 'Pronous was not displayed'
        })
        await this.getProfilePronouns().selectByAttribute('value', pronouns)
    }

    public async submit(): Promise<void> {
        await this.getProfileButtonUpdate().waitForClickable({
            timeoutMsg: 'Button Update was not clickable'
        })
        await this.getProfileButtonUpdate().click()
    }

    public async getTextAlertUpdatePicture(): Promise<string> {
        await this.getAlertUpdatePicture().waitForDisplayed()
        return await this.getAlertUpdatePicture().getText()
    }

    // переименовать метод(поправлено)
    public async setProfileValues(data: { name: string, summary: string, email: string }): Promise<void> {
        await this.waitForDisplayedProfileForm()
        await this.setName(data.name)
        await this.setBio(data.summary)
        await this.setProfilePronouns(PronounsType.he)
        await this.setEmail(EmailType.mainEmail)
        await this.submit()
    }

    public async clearInputs(): Promise<void> {
        await this.clearInputName()
        await this.clearInputBio()
        await this.setProfilePronouns(PronounsType.default)
        await this.setEmail(EmailType.default)
        await this.submit()
    }

    private getProfileName(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_name"]')
    }

    private getProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_bio"]')
    }

    private getProfileEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_email"]')
    }

    private getProfilePronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getProfileButtonUpdate(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[contains(span, "Update profile")]/span/*')
    }

    private getAlertUpdatePicture(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="alert"]')
    }

}
export {
    ProfilePage,
}