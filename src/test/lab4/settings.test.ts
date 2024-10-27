import { LoginPage } from "../../page-objects/Login.page"
import { PersonalPage } from "../../page-objects/Personal.page"
import { ProfilePage } from "../../page-objects/Profile.page"
import { auth, data } from "../../secrets/credential"

describe('Settings', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage

    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser) //перенести сюда login
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
        //переименовать переменную и с маленькой буквой
        const TextName: string = await personalPage.getTextName()
        expect(TextName).toHaveText(data.name)
    })

    it('Validate input bio', async () => {
        await profilePage.setBio(data.summary)
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const getTextBio: string = await personalPage.getTextBio()
        expect(getTextBio).toHaveText(data.summary)
    })


    it('Vaildate select pronous', async () => {
        await profilePage.setProfilePronouns()
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const getTextPronouns: string = await personalPage.getTextPronouns()
        expect(getTextPronouns).toHaveText('he/him')
    })

    it('Validate input email', async () => {
        await profilePage.setEmail()
        await profilePage.submit()

        const personalPage: PersonalPage = new PersonalPage(browser)
        await personalPage.open()
        const getTextPronouns: string = await personalPage.getTextEmail()
        expect(getTextPronouns).toHaveText('dimanit125@gmail.com')
    })

    //
    afterEach(async () => {
        await browser.reloadSession()
    })
})