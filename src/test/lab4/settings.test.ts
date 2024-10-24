import { LoginPage } from "../../page-objects/Login.page"
import { ProfilePage } from "../../page-objects/Profile.page"
import { auth, data } from "../../secrets/credential"

describe('Settings', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage

    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login(auth)
        await profilePage.open()
    })

    it('Validate input name', async () => {
        const profilePage: ProfilePage = new ProfilePage(browser)
        await profilePage.setName(data.name)
        await profilePage.submit()

        const isDisplayedElement: boolean = await profilePage.iSDisplayedNameTitle()
        expect(isDisplayedElement).toHaveText('Dmitr')
    })

    it('Validate')
    // afterEach(async () => {
    //     await browser.reloadSession()
    // })
})