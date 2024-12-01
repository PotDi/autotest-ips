import { ATTACH_PATH } from "../../common/data/image.data"
import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { IssuePage } from "../page-objects/Issue.page"
import { ListIssuesPage } from "../page-objects/ListIssues.page"
import { ReasonType, StateType } from "../types/types"

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
        const listIssuesPage: ListIssuesPage = new ListIssuesPage(browser) //listIssues
        listIssuesPage.createIssue(issue) //перенести createIssue в ListIssuePage 
        issue.url = await browser.getUrl()
        await browser.pause(5000)
        await listIssuesPage.open()
        await browser.pause(2000)
    })

    it('Isssue title should be edited', async () => {
        await listIssuesPage.openIssue(issue.url) //искать issue из списка
        await issuePage.editIssue(issue)

        const getTextEditedTitleIssue: string = await issuePage.getTextTitleIssue()
        expect(getTextEditedTitleIssue).toEqual(issue.title)
    })

    it('Сomment should be added to the issue', async () => {
        await listIssuesPage.openIssue(issue.url)
        await issuePage.addCommentToIssue(issue) //явно указать открытие issue

        const getTextAddedNewComment: string = await issuePage.getTextAddedNewComment()
        expect(getTextAddedNewComment).toEqual(issue.comment) //поправить на toEqual
    })

    it('Issue should be closed', async () => {
        await issuePage.setButtonCloseIssue()

        const getTextNotificationCloseIssue: string = await issuePage.getTextNotificationIssue()
        expect(getTextNotificationCloseIssue).toEqual(`${StateType.completed}`)
    })

    it('Issue should be reopened', async () => {
        await issuePage.setButtonCloseIssue()
        await issuePage.setButtonReopenedIssue()

        const getTextNotificationReopenedIssue: string = await issuePage.getTextNotificationIssue()
        expect(getTextNotificationReopenedIssue).toEqual(`${StateType.reopened}`)
    })

    it('Issue should be deleted', async () => {
        await issuePage.deleteIssue()

        const getTextNotificationDeleteIssue: string = await issuePage.getTextNotificationDeleteIssue()
        //искать по title задачи
        expect(getTextNotificationDeleteIssue).toEqual('deleted') //найти задачу по тексту toEqual(false)
    })

    it('Comment should be locked', async () => {
        await issuePage.setButtonLockComment() //передавать issue
        await issuePage.setPopupReasonList(ReasonType.Offtopic) //ключи с большой буквы
        await issuePage.setPopupButtonLockComment()

        const getTextNotificationLockComment: string = await issuePage.getTextNotificationLockComment()
        expect(getTextNotificationLockComment).toEqual(`locked as ${ReasonType.Offtopic}`)
    })
})