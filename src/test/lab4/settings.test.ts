import { LoginPage } from "../../page-objects/Login.page"
import { PersonalPage } from "../../page-objects/Personal.page"
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
        await profilePage.setName(data.name)
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const isDisplayedName: boolean = await personalPage.isDisplayedName()
        expect(isDisplayedName).toHaveText(data.name)
    })
    it('Validate input bio', async () => {
        await profilePage.setBio(data.summary)
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const isDisplayedBio: boolean = await personalPage.isDisplayedBio()
        expect(isDisplayedBio).toHaveText(data.summary)

    })
    it('Vaildate select pronous', async () => {
        await profilePage.setProfilePronouns('he/him')
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const isDisplayedPronouns: boolean = await personalPage.isDisplayedPronouns()
        expect(isDisplayedPronouns).toHaveText('he/him')
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})