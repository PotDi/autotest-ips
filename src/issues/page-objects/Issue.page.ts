import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from "../model/issue.model"
import { ReasonType } from "../types/types"

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

    public async setButtonEditTitle(): Promise<void> {
        await this.getButtonEditTitle().waitForClickable({
            timeoutMsg: 'Button for edit title issue was not displayed'
        })
        await this.getButtonEditTitle().click()
    }

    public async setButtonSave(): Promise<void> {
        await this.getButtonSave().waitForClickable({
            timeoutMsg: 'Button Save issue was not displayed'
        })
        await this.getButtonSave().click()
    }

    public async setButtonCloseIssue(): Promise<void> {
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button close issue was not displayed'
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

    public async setButtonAddComment(): Promise<void> {
        await this.getButtonSubmitComment().waitForClickable({
            timeoutMsg: 'Button Add Comment was not clickable'
        })
        await this.getButtonSubmitComment().click()
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

    public async isDisplayedLabelIssue(): Promise<boolean> {
        return this.getLabelIssue().isDisplayed()
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
        await this.setButtonEditTitle()
        await this.setEditTitle(issue.title)
        await this.setButtonSave()
    }

    public async addCommentToIssue(issue: IssueModel): Promise<void> {
        await this.setComment(issue.comment)
        await this.setButtonAddComment()
    }

    public async deleteIssue(): Promise<void> {
        await this.setButtonDeleteIssue()
        await this.setPopupButtonDeleteIssue()
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

    private getLabelIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[contains(@id, "label")])[last()]')
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
}

export {
    IssuePage,
}