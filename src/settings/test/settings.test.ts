import { LoginPage } from "../../users/page-objects/Login.page"
import { PersonalPage } from "../page-objects/Personal.page"
import { ProfilePage } from "../page-objects/Profile.page"
import { UploadFile } from "../page-objects/UploadFile"
import { auth, data } from '../../secrets/credential'
import { IMAGE_PATH } from "../../common/data/image.data"

describe('Settings', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage
    let personalPage: PersonalPage
    let uploadFile: UploadFile

    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser)
        personalPage = new PersonalPage(browser)
        uploadFile = new UploadFile(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    beforeEach(async () => {
        await profilePage.open()
    })

    it('Validate input name', async () => {
        await profilePage.setName(data.name)
        await profilePage.submit()

        await personalPage.open()
        const getTextName: string = await personalPage.getTextName()
        expect(getTextName).toHaveText(data.name)
    })

    it('Validate input empty name', async () => {
        await profilePage.clearInputName()
        await profilePage.submit()

        await personalPage.open()
        const inDisplayedNametoText: boolean = await personalPage.isDisplayedName()
        expect(inDisplayedNametoText).toEqual(false)
    })

    it('Validate input bio', async () => {
        await profilePage.setBio(data.summary)
        await profilePage.submit()

        await personalPage.open()
        const getTextBio: string = await personalPage.getTextBio()
        expect(getTextBio).toHaveText(data.summary)
    })


    it('Selecting a pronous from the list', async () => { //перефразировать название (поправлено)
        await profilePage.setProfilePronouns()
        await profilePage.submit()

        await personalPage.open()
        const getTextPronouns: string = await personalPage.getTextPronouns()
        expect(getTextPronouns).toHaveText('he/him')
    })

    it('Selecting a email from the list', async () => { //перефразировать название (поправлено)
        await profilePage.setEmail()
        await profilePage.submit()

        await personalPage.open()
        const getTextPronouns: string = await personalPage.getTextEmail()
        expect(getTextPronouns).toHaveText('dimanit125@gmail.com')
    })

    it.only('Checking file upload', async () => {
        await uploadFile.uploadFile(IMAGE_PATH)
        await profilePage.submit()
        await personalPage.open()
        const TextAlertUpdatePicture: string = await personalPage.getTextAlertUpdatePicture()
        expect(TextAlertUpdatePicture).toHaveText('Your profile picture has been updated')

    })
})