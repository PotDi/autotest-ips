import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { issueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let createIssuePage: CreateIssuePage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = issueModel()

    before(async () => {
        loginPage = new LoginPage(browser)
        createIssuePage = new CreateIssuePage(browser)
        issuePage = new IssuePage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await createIssuePage.open()
    })

    it('Checking issue create with title and description', async () => {
        await createIssuePage.createIssue(issue)

        const getTextTitleIssue: string = await issuePage.getTextTitleIssue()
        const getTextDerscriptionIssue: string = await issuePage.getTextDerscriptionIssue()
        expect(getTextTitleIssue).toHaveText(issue.title)
        expect(getTextDerscriptionIssue).toHaveText(issue.description)
    })

    it('Checking issue create with empty title', async () => {
        const issue: IssueModel = issueModel({ title: `` })
        await createIssuePage.createNewIssue()
        await createIssuePage.setTitleIssue(issue.title)

        expect(createIssuePage.submitIssue).toBeDisabled()
    })

})