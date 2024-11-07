import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { issueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"

describe('Edit Issue', () => {
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
        await issuePage.open()
    })

    it('Check edit issue', async () => {
        await issuePage.editIssue(issue)

        const getTextEditedTitleIssue: string = await issuePage.getTextTitleIssue()
        expect(getTextEditedTitleIssue).toHaveText(issue.title)
    })

    it('Check add comment', async () => {
        await issuePage.addCommentToIssue(issue)

        const getTextAddedNewComment: string = await issuePage.getTextAddedNewComment()
        expect(getTextAddedNewComment).toHaveText(issue.comment)
    })
})