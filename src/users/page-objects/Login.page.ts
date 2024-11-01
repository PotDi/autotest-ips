import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObject'
import { UserModel } from '../model/user.model'

class LoginPage extends PageObject {
    protected url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }

    private getSubmitButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }
    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'login input was not displayed',
        })
        await this.getLoginField().setValue(login)
    }
    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await this.getPasswordField().setValue(password)
    }
    public async submit(): Promise<void> {
        await this.getSubmitButton().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await this.getSubmitButton().click()
    }
    public async waitForDisplayedLoginForm(): Promise<void> {
        await this.getLoginField().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
    }
    public async login(user: UserModel): Promise<void> {
        await this.waitForDisplayedLoginForm()
        await this.setLogin(user.login)
        await this.setPassword(user.password)
        await this.submit()
    }
}

export {
    LoginPage,
}