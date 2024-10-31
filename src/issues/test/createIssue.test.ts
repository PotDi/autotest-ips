import { LoginPage } from "../../users/page-objects/Login.page"
import { PersonalPage } from "../../settings/page-objects/Personal.page"
import { ProfilePage } from "../../settings/page-objects/Profile.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage
    let personalPage: PersonalPage

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await profilePage.open()
    })