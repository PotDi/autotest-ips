import { ATTACH_PATH } from "../../common/data/image.data"
import path from 'path'
import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"
import { ListIssuesPage } from "../page-objects/ListIssues.page"
import { labelData } from "../model/label.model"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let createIssuePage: CreateIssuePage
    let listIssuesPage: ListIssuesPage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel()
    const issueWithAttach: IssueModel = createIssueModel({
        title: 'заголовок',
    })

    before(async () => {
        loginPage = new LoginPage(browser)
        createIssuePage = new CreateIssuePage(browser)
        issuePage = new IssuePage(browser)
        listIssuesPage = new ListIssuesPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await listIssuesPage.open()
    })

    it('Issue was created with title and description', async () => {
        await listIssuesPage.createIssue(issue)

        const getTextTitleIssue: string = await issuePage.getTextTitleIssue()
        const getTextDerscriptionIssue: string = await issuePage.getTextDerscriptionIssue()
        expect(getTextTitleIssue).toHaveText(issue.title)
        expect(getTextDerscriptionIssue).toHaveText(issue.description!)
    })

    it("Can't create issue with an empty title", async () => {
        const issue: IssueModel = createIssueModel({ title: `` })
        await createIssuePage.setButtonCreateIssue()
        await createIssuePage.setTitleIssue(issue.title)

        expect(createIssuePage.submitIssue).toBeDisabled() //переделать что кнопка задизаблена
    })

    it('Issue should be create with labels', async () => {
        await createIssuePage.createIssueWithLabels(issue)

        const isDisplayedLabelIssue: boolean = await listIssuesPage.isDisplayedLabelIssue(labelData)
        expect(isDisplayedLabelIssue).toEqual(true)
    })

    it('Issue should be create with attach ', async () => {
        await createIssuePage.createIssueWithAttach(issueWithAttach)

        const fileName = path.basename(ATTACH_PATH)
        const getNameAttachComment: string = await issuePage.getNameAttachComment()
        expect(getNameAttachComment).toHaveText(fileName)
    })

})