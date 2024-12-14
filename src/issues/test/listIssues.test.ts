import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { ListIssuesPage } from "../page-objects/ListIssues.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let listIssuesPage: ListIssuesPage
    const user: UserModel = createUserModel(userData)
    let issue: IssueModel

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    before(async () => {
        listIssuesPage = new ListIssuesPage(browser)
        issue = createIssueModel()
        const createIssuePage: CreateIssuePage = new CreateIssuePage(browser)
        await listIssuesPage.open()
        createIssuePage.createIssueWithLabels(issue)

    })

    it('Sorting by label should work', async () => {
        const getTextIssuesFilterLabel: string = await listIssuesPage.getTextIssuesFilterLabel()
        expect(getTextIssuesFilterLabel).toHaveText('bug')
    })

})