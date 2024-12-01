import { Result } from "wdio-image-comparison-service";
import { ListIssuesPage } from "../page-objects/ListIssues.page";
import { LoginPage } from "../../users/page-objects/Login.page";
import { createUserModel, UserModel } from "../../users/model/user.model";
import { userData } from "../../users/data/user.data";
import { IssueAPIService } from "../api/IssueAPIService";

describe('Compare Image in Issue', () => {
    let loginPage: LoginPage
    let listIssuesPage: ListIssuesPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await IssueAPIService.createIssue('owner', 'repository')
        await listIssuesPage.open() //через API
    })

    it('Compare image in issue', async () => { //browser.pause
        const result: Result = await browser.checkFullPageScreen('/autotest-ips/issues')
        expect(result).toEqual(0)
    })
}) //написать три теста