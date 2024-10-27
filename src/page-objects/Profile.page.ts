import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'
//убрать неиспользуемый импорт
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
    // использовать универсальный метод. Убрать метод Передавать enum
    public async clearPronouns(): Promise<void> {
        await this.getProfilePronouns().waitForDisplayed({
            timeoutMsg: 'Pronous was not displayed'
        })
        await this.getProfilePronouns().selectByAttribute('value', 'they/them')
    }

    public async clearEmail(): Promise<void> {
        await this.getProfileEmail().waitForDisplayed({
            timeoutMsg: 'Email was not displayed'
        })
        await this.getProfileEmail().selectByAttribute('value', 'Select a verified email to display')
    }

    //название метода с маленькой буквы и изменить метод на isDiplayed
    public async waitForDisplayedProfileForm(): Promise<void> {
        await this.getProfileName().waitForDisplayed({
            timeoutMsg: 'Profile Form was not displayed'
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
    //использовать универсальный метод email: string
    public async setEmail(): Promise<void> {
        await this.getProfileEmail().waitForDisplayed({
            timeoutMsg: 'Input email was not displayed'
        })
        await this.getProfileEmail().selectByAttribute('value', 'dimanit125@gmail.com')
    }

    //оставить переносы строк между методами. Разобраться что делает функция?
    public async setProfilePronouns(): Promise<void> {
        await this.getProfilePronouns().waitForDisplayed({
            timeoutMsg: 'Pronous was not displayed'
        })
        await this.getProfilePronouns().selectByAttribute('value', 'he/him')
    }

    public async submit(): Promise<void> {
        await this.getProfileButtonUpdate().waitForClickable({
            timeoutMsg: 'Button Update was not clickable'
        })
        await this.getProfileButtonUpdate().click()
    }
    // переименовать метод
    public async profile(data: { name: string, summary: string, email: string }): Promise<void> {
        await this.waitForDisplayedProfileForm()
        await this.setName(data.name)
        await this.setBio(data.summary)
        await this.setEmail()
        await this.submit()
    }

    public async clearInputs(): Promise<void> {
        await this.clearInputName()
        await this.clearInputBio()
        await this.clearPronouns()
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

}
export {
    ProfilePage,
}