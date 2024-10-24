import { auth } from "../../secrets/credential"

describe('Login Form', () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('login validate data', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'login input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.login)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(auth.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        const inDisplayedLogin: boolean = await browser.$('//*[@data-login="dima123445"]').isDisplayed()

        expect(inDisplayedLogin).toEqual(true)
    })


    it('login validate email', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'login input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.email)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(auth.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        const inDisplayedElement: boolean = await browser.$('//*[@data-login="dima123445"]').isDisplayed()

        expect(inDisplayedElement).toEqual(true)
    })

    it('open page Forgot password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'login form was not displayed',
        })
        await browser.$('//*[@id="forgot-password"]').waitForDisplayed({
            timeoutMsg: 'Link forgot password was not displayed',
        })
        await browser.$('//*[@id="forgot-password"]').click()

        expect(await browser.$('//*[@id="email_field"]').isDisplayed()).toEqual(true)
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

        expect(await browser.$('//*[@id="email"]').isDisplayed()).toEqual(true)
    })
    afterEach(async () => {
        await browser.reloadSession()
    })
})