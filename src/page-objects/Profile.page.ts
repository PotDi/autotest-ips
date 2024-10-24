import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'
import waitForClickable from 'webdriverio/build/commands/element/waitForClickable'

class ProfilePage extends PageObject {
    protected url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)

    }
    public async WaitForDisplayedProfileForm(): Promise<void> {
        await this.getProfileName().waitForClickable({
            timeoutMsg: 'Profile Form was not clickable'
        })
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
    public async setEmail(email: string): Promise<void> {
        await this.getProfileEmail().waitForDisplayed({
            timeoutMsg: 'Input email was not displayed'
        })
        await this.getProfileEmail().setValue(email)
    }
    public async setProfilePronouns(pronous: string): Promise<void> {
        await this.getProfilePronouns().waitForDisplayed({
            timeoutMsg: 'Pronous was not displayed'
        })
        await this.getProfilePronouns().setValue(pronous)
    }
    public async submit(): Promise<void> {
        await this.getProfileButtonUpdate().waitForClickable({
            timeoutMsg: 'Button Update was not clickable'
        })
        await this.getProfileButtonUpdate().click()
    }

    public async profile(data: { name: string, summary: string, email: string }): Promise<void> {
        await this.WaitForDisplayedProfileForm()
        await this.setName(data.name)
        await this.setBio(data.summary)
        await this.setEmail(data.email)
        await this.submit()
    }
    private getProfileName(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_name"]')
    }
    private getProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="user_profile_bio"]')
    }
    private getProfileEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('[@id="user_profile_email"]')
    }
    private getProfilePronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('[@id="user_profile_pronouns_select"]')
    }
    private getProfileButtonUpdate(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[contains(span, "Update profile")]/span/*')
    }


}
export {
    ProfilePage,
}