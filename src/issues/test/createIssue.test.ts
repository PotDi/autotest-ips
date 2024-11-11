import { ATTACH_PATH } from "../../common/data/image.data"
import path from 'path'
import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"

describe('Create Issue', () => {
    let loginPage: LoginPage
    let createIssuePage: CreateIssuePage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel()

    before(async () => {
        loginPage = new LoginPage(browser)
        createIssuePage = new CreateIssuePage(browser)
        issuePage = new IssuePage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await createIssuePage.open()
    })

    it('Issue was created with title and description', async () => {
        await createIssuePage.createIssue(issue)

        const getTextTitleIssue: string = await issuePage.getTextTitleIssue()
        const getTextDerscriptionIssue: string = await issuePage.getTextDerscriptionIssue()
        expect(getTextTitleIssue).toHaveText(issue.title)
        expect(getTextDerscriptionIssue).toHaveText(issue.description)
    })

    it("Can't create issue with an empty title", async () => { //Название тест Нельзя создать задачу с пустым заголовком
        const issue: IssueModel = createIssueModel({ title: `` })
        await createIssuePage.setButtonCreateIssue()
        await createIssuePage.setTitleIssue(issue.title)

        expect(createIssuePage.submitIssue).toBeDisabled()
    })

    it.only('Issue should be create with labels', async () => {
        await createIssuePage.createIssueWithLabels(issue)

        const isDisplayedLabelIssue: boolean = await issuePage.isDisplayedLabelIssue()
        expect(isDisplayedLabelIssue).toEqual(true)
    })

    it('Issue should be create with attach ', async () => {
        await createIssuePage.createIssueWithAttach(issue)

        const fileName = path.basename(ATTACH_PATH)
        const getNameAttachComment: string = await issuePage.getNameAttachComment()
        expect(getNameAttachComment).toHaveText(fileName)
    })

})