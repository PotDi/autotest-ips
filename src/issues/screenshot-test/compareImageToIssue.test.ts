import { Result } from "wdio-image-comparison-service";
import { LoginPage } from "../../users/page-objects/Login.page";
import { createUserModel, UserModel } from "../../users/model/user.model";
import { userData } from "../../users/data/user.data";
import { IssueAPIService } from "../api/IssueAPIService";
import { createIssueModel, IssueModel } from "../model/issue.model";
import { CreateIssuePage } from "../page-objects/CreateIssue.page";
import { images } from "../../common/data/image.data";
import { owner, repository } from "../../secrets/credential";
import { IssuePage } from "../page-objects/Issue.page";

describe('Compare Image in Issue', () => {
    let loginPage: LoginPage
    let createIssuePage: CreateIssuePage
    let issuePage: IssuePage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel({
        description: '',
    })

    before(async () => {
        loginPage = new LoginPage(browser)
        createIssuePage = new CreateIssuePage(browser)
        issuePage = new IssuePage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        const response = await IssueAPIService.createIssue(issue, owner, repository)
        issue.url = response.html_url
        await browser.url(issue.url!)
        await issuePage.editComment()
    })

    for (const image of images) {
        it(`Compare image ${image} in issue`, async () => {
            await showHiddenFileInput(browser)

            const file: string = await browser.uploadFile(image)
            await browser.$('[type="file"]').setValue(file)
            await browser.pause(5000)
            await issuePage.setButtonUpdateComment()
            await browser.pause(5000)

            const result: Result = await browser.checkFullPageScreen(image)
            expect(result).toEqual(0.3)
        })
    }
})

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}