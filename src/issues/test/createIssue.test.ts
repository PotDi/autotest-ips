import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { IssuePage } from "../page-objects/Issue.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel({ title: 'Новая задача' })

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await issuePage.open()
    })

    // beforeEach(async () => {

    // })

    it('Create issue with title and description', async () => {
        await issuePage.createIssue(issue)

        const getTextTitleIssue: string = await issuePage.getTextTitleIssue()
        expect(getTextTitleIssue).toHaveText(issue.title)
    })

})