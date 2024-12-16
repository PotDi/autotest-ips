import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from "../model/issue.model"
import { ReasonType } from "../types/types"
import { Reporter } from "../../common/reporter/Reporter"

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async setEditTitle(title: string): Promise<void> {
        await this.getInputEdit().waitForDisplayed({
            timeoutMsg: 'Input title was not displayed'
        })
        await this.getInputEdit().setValue(title)
    }

    public async setButtonEditTitle(): Promise<void> { //переименовать название функции 
        await this.getButtonEditTitle().waitForClickable({
            timeoutMsg: 'Button for edit title issue was not clickable'
        })
        await this.getButtonEditTitle().click()
    }

    public async setButtonSave(): Promise<void> {
        await this.getButtonSave().waitForClickable({
            timeoutMsg: 'Button Save issue was not clickable'
        })
        await this.getButtonSave().click()
    }

    public async setButtonCloseIssue(): Promise<void> {
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button close issue was not displayed' // поправить на clickable
        })
        await this.getButtonCloseIssue().click()
    }

    public async setButtonReopenedIssue(): Promise<void> {
        await this.getButtonReopenedIssue().waitForClickable({
            timeoutMsg: 'Button reopened issue was not displayed'
        })
        await this.getButtonReopenedIssue().click()
    }

    public async setComment(comment: string): Promise<void> {
        await this.getCommentField().waitForDisplayed({
            timeoutMsg: 'Input for add comment was not displayed'
        })
        await this.getCommentField().setValue(comment)
    }

    public async setButtonMenuEdit(): Promise<void> {
        await this.getButtonMenuEdit().waitForClickable({
            timeoutMsg: 'Button menu edit comment was not clickable'
        })
        await this.getButtonMenuEdit().click()
    }

    public async setButtonEditComment(): Promise<void> {
        await this.getButtonEditComment().waitForClickable({
            timeoutMsg: 'Button for edit comment was not displayed'
        })
        await this.getButtonEditComment().click()
    }

    public async setButtonAddComment(): Promise<void> {
        await this.getButtonSubmitComment().waitForClickable({
            timeoutMsg: 'Button Add Comment was not clickable'
        })
        await this.getButtonSubmitComment().click()
    }

    public async setButtonUpdateComment(): Promise<void> {
        await this.getButtonUpdateComment().waitForClickable({
            timeoutMsg: 'Button Update comment was not clickable'
        })
        await this.getButtonUpdateComment().click()
    }

    public async setButtonDeleteIssue(): Promise<void> {
        await this.getButtonDeleteIssue().waitForClickable({
            timeoutMsg: 'Button delete Issue was not clickable'
        })
        await this.getButtonDeleteIssue().click()
    }

    public async setPopupButtonDeleteIssue(): Promise<void> {
        await this.getPopupButtonDeleteIssue().waitForClickable({
            timeoutMsg: 'Button delete issue in popup was not clickable'
        })
        await this.getPopupButtonDeleteIssue().click()
    }

    public async getTextAddedNewComment(): Promise<string> {
        await this.getAddNewComment().waitForDisplayed({
            timeoutMsg: 'Added new comment was not displayed'
        })
        return this.getAddNewComment().getText()
    }

    public async setButtonLockComment(): Promise<void> {
        await this.getButtonLockComment().waitForClickable({
            timeoutMsg: 'Button lock comment was not clickable'
        })
        await this.getButtonLockComment().click()
    }

    public async getTextTitleIssue(): Promise<string> {
        await this.getTitleIssue().waitForDisplayed({
            timeoutMsg: 'Text title was not displayed'
        })
        return this.getTitleIssue().getText()
    }

    public async getTextDerscriptionIssue(): Promise<string> {
        await this.getDescriptionIssue().waitForDisplayed({
            timeoutMsg: 'Text title was not displayed'
        })
        return await this.getDescriptionIssue().getText()
    }

    public async getTextNotificationIssue(): Promise<string> {
        await this.getNotificationCloseIssue().waitForDisplayed({
            timeoutMsg: 'Text Notitification about closed issue was not displayed'
        })
        return await this.getNotificationCloseIssue().getText()
    }

    public async getTextNotificationLockComment(): Promise<string> {
        await this.getNotificationLockComment().waitForDisplayed({
            timeoutMsg: 'Text notification about lock comment was not displayed'
        })
        return this.getNotificationLockComment().getText()
    }
    public async getNameAttachComment(): Promise<string> {
        await this.getAttachComment().waitForDisplayed({
            timeoutMsg: 'Attach was not displayed'
        })
        return this.getAttachComment().getText()
    }

    public async setPopupButtonLockComment(): Promise<void> {
        await this.getButtonLockCommentPopup().waitForClickable({
            timeoutMsg: 'Button lock comment in popup was not clickable'
        })
        await this.getButtonLockCommentPopup().click()
    }

    public async setPopupReasonList(reason: ReasonType): Promise<void> {
        await this.getPopupReasonList().waitForClickable({
            timeoutMsg: 'List with reasons was not clickable'
        })
        await this.getPopupReasonList().selectByAttribute('value', reason)
    }

    public async getTextNotificationDeleteIssue(): Promise<string> {
        await this.getNotificationDeleteIssue().waitForDisplayed({
            timeoutMsg: 'Text Notification deleted issue was not displayed'
        })
        return await this.getNotificationDeleteIssue().getText()
    }

    public async editIssue(issue: IssueModel): Promise<void> {
        Reporter.addStep('Нажать на кнопку редактирования задачи')
        await this.setButtonEditTitle()
        Reporter.addStep('Отредактировать заголовок задачи') //добавить issue.title
        await this.setEditTitle(issue.title)
        Reporter.addStep('Нажать кнопку Сохранить')
        await this.setButtonSave()
    }

    public async addCommentToIssue(issue: IssueModel): Promise<void> {
        Reporter.addStep(`Заполнить поле с комментарием ${issue.comment}`)
        await this.setComment(issue.comment!)
        Reporter.addStep('Нажать на кнопку Добавить комментарий')
        await this.setButtonAddComment()
    }

    public async deleteIssue(): Promise<void> {
        Reporter.addStep('Нажать на кнопку Удалить задачу')
        await this.setButtonDeleteIssue()
        Reporter.addStep('В попапе подтвердить удаление')
        await this.setPopupButtonDeleteIssue()
    }

    public async editComment(): Promise<void> {
        await this.setButtonMenuEdit()
        await this.setButtonEditComment()
    }

    public async uploadFile(image: string): Promise<void> {
        await this.showHiddenFileInput()
        const file: string = await browser.uploadFile(image)
        await this.browser.$('[type="file"]').setValue(file)
        await this.browser.pause(5000)
        await this.setButtonUpdateComment()
        await this.browser.pause(5000)
    }

    private async showHiddenFileInput(): Promise<void> {
        await this.browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }

    private getInputEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][@name="issue[title]"]')
    }

    private getButtonEditTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][contains(text(), "Edit")]')
    }

    private getButtonSave(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-disable-with="Updating"]')
    }

    private getTitleIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//bdi')
    }

    private getDescriptionIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]')
    }

    private getAddNewComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//td[contains(@class, "js-comment")])[last()]')
    }

    private getCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="new_comment_field"]')
    }

    private getButtonSubmitComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Comment")]')
    }

    private getButtonCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[name="comment_and_close"]')
    }

    private getButtonReopenedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[name="comment_and_open"]')
    }

    private getButtonDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//summary[@role="button"]/span)[last()]')
    }

    private getPopupButtonDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[name="verify_delete"]')
    }

    private getNotificationCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//div[contains(@id,"event")])[last()]')
    }

    private getNotificationDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[role="alert"]')
    }

    private getAttachComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]/a')
    }

    private getButtonLockComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//summary[@role="button"]/strong')
    }

    private getPopupReasonList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="unlock-reason"]')
    }

    private getButtonLockCommentPopup(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[contains(text(),"Lock")])[last()]')
    }

    private getNotificationLockComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[class="TimelineItem-body"]')
    }

    private getButtonMenuEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div/details/summary//*[last()][@role="img"]')
    }

    private getButtonEditComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@role, "menuitem") and contains(text(), "Edit")]')
    }
    private getButtonUpdateComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(text(), "Update")]')
    }
}

export {
    IssuePage,
}