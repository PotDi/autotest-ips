import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { IssuePage as CreateIssuePage } from "../page-objects/CreateIssue.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let createIssuePage: CreateIssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel()

    before(async () => {
        loginPage = new LoginPage(browser)
        createIssuePage = new CreateIssuePage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await createIssuePage.open()
    })

    it('Checking issue create with title and description', async () => {
        await createIssuePage.createIssue(issue)

        const getTextTitleIssue: string = await createIssuePage.getTextTitleIssue()
        const getTextDerscriptionIssue: string = await createIssuePage.getTextDerscriptionIssue()
        expect(getTextTitleIssue).toHaveText(issue.title)
        expect(getTextDerscriptionIssue).toHaveText(issue.description)
    })

    it('Checking issue create with empty title', async () => {
        const issue: IssueModel = createIssueModel({ title: `` })
        await createIssuePage.createNewIssue()
        await createIssuePage.setTitleIssue(issue.title)

        expect(createIssuePage.submitIssue).toBeDisabled()
    })

    it('Check edit issue', async () => {
        await createIssuePage.open()
        await createIssuePage.editIssue(issue)

        const getTextEditedTitleIssue: string = await createIssuePage.getTextTitleIssue()
        expect(getTextEditedTitleIssue).toHaveText(issue.title)
    })

})