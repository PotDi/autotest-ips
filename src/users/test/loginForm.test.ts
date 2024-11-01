import { LoginPage } from "../page-objects/Login.page"
import { MainPage } from "../page-objects/Main.page"
import { createUserModel, UserModel } from "../model/user.model"
import { userData } from "../data/user.data"

describe('Login Form', () => {
    let loginPage: LoginPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        await loginPage.open()
    })

    it('login validate data', async () => {
        const loginPage: LoginPage = new LoginPage(browser)
        await loginPage.login(user)

        const mainPage: MainPage = new MainPage(browser)
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()

        expect(isDisplayedElement).toEqual(true)
    })


    it('login validate email', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'login input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(user.email)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(user.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        const inDisplayedElement: boolean = await browser.$('//*[@data-login="PotDi"]').isDisplayed()

        expect(inDisplayedElement).toEqual(true)
    })

    it('open page Forgot password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="forgot-password"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="forgot-password"]').click()

        expect(await browser.$('//*[@id="email_field"]').isDisplayed)
    })

    it('open page Create Account', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[contains(a, "Create")]/child::*').waitForDisplayed({
            timeoutMsg: 'link Create an account was not displayed',
        })
        await browser.$('//*[contains(a, "Create")]/child::*').click()
        await browser.$('//*[@id="email"]').waitForDisplayed()

        expect((await browser.$('//*[@id="email"]')).isDisplayed)
    })
    afterEach(async () => {
        await browser.reloadSession()
    })
})