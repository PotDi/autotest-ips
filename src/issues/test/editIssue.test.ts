import { ATTACH_PATH } from "../../common/data/image.data"
import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"
import { ListIssuesPage } from "../page-objects/ListIssues.page"
import { ReasonType } from "../types/types"

describe('Edit Issue', () => {
    let loginPage: LoginPage
    let listIssuesPage: ListIssuesPage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    let issue: IssueModel

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    before(async () => {
        listIssuesPage = new ListIssuesPage(browser)
        issuePage = new IssuePage(browser)
    })

    beforeEach(async () => {
        issue = createIssueModel()
        const createIssuePage: CreateIssuePage = new CreateIssuePage(browser)
        createIssuePage.createIssue(issue)
        await listIssuesPage.open()
    })

    it('Isssue title should be edited', async () => { //Заголовок отредактирован
        await listIssuesPage.openIssue()
        await issuePage.editIssue(issue)

        const getTextEditedTitleIssue: string = await issuePage.getTextTitleIssue()
        expect(getTextEditedTitleIssue).toHaveText(issue.title)
    })

    it('Сomment should be added to the issue', async () => { //поправить название теста
        await issuePage.addCommentToIssue(issue)

        const getTextAddedNewComment: string = await issuePage.getTextAddedNewComment()
        expect(getTextAddedNewComment).toHaveText(issue.comment)
    })

    it('Issue should be closed', async () => { //поправить название теста
        await issuePage.setButtonCloseIssue()

        const getTextNotificationCloseIssue: string = await issuePage.getTextNotificationIssue()
        expect(getTextNotificationCloseIssue).toHaveText('completed')
    })

    it('Issue should be reopened', async () => { //поправить название теста
        await issuePage.setButtonCloseIssue()
        await issuePage.setButtonReopenedIssue()

        const getTextNotificationReopenedIssue: string = await issuePage.getTextNotificationIssue()
        expect(getTextNotificationReopenedIssue).toHaveText('reopened')
    })

    it('Issue should be deleted', async () => { //поправить название теста
        await issuePage.deleteIssue()

        const getTextNotificationDeleteIssue: string = await issuePage.getTextNotificationDeleteIssue()
        expect(getTextNotificationDeleteIssue).toHaveText('deleted')
    })

    it('Comment should be locked', async () => {
        await issuePage.setButtonLockComment()
        await issuePage.setPopupReasonList(ReasonType.Offtopic)
        await issuePage.setPopupButtonLockComment()

        const getTextNotificationLockComment: string = await issuePage.getTextNotificationLockComment()
        expect(getTextNotificationLockComment).toHaveText(`locked as ${ReasonType.Offtopic}`)
    })
})