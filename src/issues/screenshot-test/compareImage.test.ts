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
    const issue: IssueModel = createIssueModel()

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
    })


    // for (let i = 0; i < imagesPath.length; i++) {
    //     it(`Compare image ${i + 1} in issue`, async () => { //browser.pause
    //         await createIssuePage.uploadAttach(imagesPath[i])
    //         browser.pause(5000)
    //         const result: Result = await browser.checkFullPageScreen(`${i}`)
    //         expect(result).toEqual(0)
    //     })
    // }

    for (const image of images) {
        it(`Compare image ${image} in issue`, async () => { //browser.pause
            await showHiddenFileInput(browser)

            const file: string = await browser.uploadFile(image)
            await browser.$('#fc-new_comment_field').setValue(file)
            await browser.pause(5000)
            await issuePage.setButtonAddComment()
            await browser.pause(5000)

            const result: Result = await browser.checkFullPageScreen(image)
            expect(result).toEqual(0.2)
        })
    }
})

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('#fc-new_comment_field') as HTMLElement
        htmlElement.removeAttribute('hidden')
    })
}




// it('Compare second image in issue', async () => {
//     await createIssuePage.uploadAttach(issue.attach?.secondImage!)
//     const result: Result = await browser.checkFullPageScreen(issue.url!)
//     expect(result).toEqual(0)
// })

// it('Compare third image in issue', async () => {
//     await createIssuePage.uploadAttach(issue.attach?.thirdImage!)
//     const result: Result = await browser.checkFullPageScreen(issue.url!)
//     expect(result).toEqual(0)
// })
//написать три теста