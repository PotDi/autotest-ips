import { owner, repository } from "../../secrets/credential"
import { userData } from "../../users/data/user.data"
import { createUserModel, UserModel } from "../../users/model/user.model"
import { LoginPage } from "../../users/page-objects/Login.page"
import { IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createLabelModel, LabelModel } from "../model/label.model"
import { CreateIssuePage } from "../page-objects/CreateIssue.page"
import { IssuePage } from "../page-objects/Issue.page"
import { ListIssuesPage } from "../page-objects/ListIssues.page"

describe('Set label to issue', () => {
    let listIssuesPage: ListIssuesPage
    let createIssuePage: CreateIssuePage
    let issuePage: IssuePage
    const label: LabelModel = createLabelModel()
    const issue: IssueModel = createIssueModel()
    let issueWithLabel: IssueModel = createIssueModel({
        labels: [label]
    })
    const user: UserModel = createUserModel(userData)

    before(async () => {
        const loginPage: LoginPage = new LoginPage(browser)

        await loginPage.open()
        await loginPage.login(user)
    })

    before(async () => {
        listIssuesPage = new ListIssuesPage(browser)
        issuePage = new IssuePage(browser)
        createIssuePage = new CreateIssuePage(browser)

        await IssueAPIService.createLabel(label, owner, repository)

        const response = await IssueAPIService.createIssue(issue, owner, repository)
        const responseWithLabel = await IssueAPIService.createIssue(issueWithLabel, owner, repository)
        issue.url = response.html_url
        issueWithLabel.url = responseWithLabel.html_url
    })

    it('Label should be added to issue', async () => {
        await browser.url(issue.url!)
        await createIssuePage.manageIssueLabel(label)

        await listIssuesPage.open()
        const isDisplayedLabelIssue: boolean = await listIssuesPage.isDisplayedLabelIssue(label)
        expect(isDisplayedLabelIssue).toEqual(true)
    })

    it('Label should be deleted to issue', async () => {
        await browser.url(issueWithLabel.url!)
        await createIssuePage.manageIssueLabel(label)

        await listIssuesPage.open()
        const isDisplayedLabelIssue: boolean = await listIssuesPage.isDisplayedLabelIssue(label)
        expect(isDisplayedLabelIssue).toEqual(false)
    })

    after(async () => {
        await IssueAPIService.deleteLabel(label, owner, repository)
    })
})

