import { Result } from "wdio-image-comparison-service";
import { ListIssuesPage } from "../page-objects/ListIssues.page";
import { LoginPage } from "../../users/page-objects/Login.page";
import { createUserModel, UserModel } from "../../users/model/user.model";
import { userData } from "../../users/data/user.data";

describe('Compare Image in Issue', () => {
    let loginPage: LoginPage
    let listIssuesPage: ListIssuesPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        listIssuesPage = new ListIssuesPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await listIssuesPage.open()
    })

    it('Compare image in issue', async () => {
        const result: Result = await browser.checkFullPageScreen('/autotest-ips/issues')
        expect(result).toEqual(0)
    })
})