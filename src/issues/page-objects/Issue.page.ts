import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from "../model/issue.model"

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/8'

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
        await this.getButtonEditTitle().waitForDisplayed({
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

    public async getTextAddedNewComment(): Promise<string> {
        await this.getAddNewComment().waitForDisplayed({
            timeoutMsg: 'Added new comment was not displayed'
        })
        return this.getAddNewComment().getText()
    }

    public async getTextTitleIssue(): Promise<string> {
        await this.getTitleIssue().waitForDisplayed({
            timeoutMsg: 'Text title was not displayed'
        }) //waitForDisplayed(поправлено)
        return this.getTitleIssue().getText()
    }

    public async getTextDerscriptionIssue(): Promise<string> {
        await this.getDescriptionIssue().waitForDisplayed({
            timeoutMsg: 'Text title was not displayed'
        }) //waitForDisplayed (поправлено)
        return await this.getDescriptionIssue().getText()
    }

    public async getTextNotificationCloseIssue(): Promise<string> {
        await this.getNotificationCloseIssue().waitForDisplayed({
            timeoutMsg: 'Text Notitification about closed issue was not displayed'
        })
        return await this.getNotificationCloseIssue().getText()
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

    private getInputEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][@name="issue[title]"]')
    }

    private getButtonEditTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][contains(text(), "Edit")]')
    }

    private getButtonSave() {
        return this.browser.$('//*[@data-disable-with="Updating"]')
    }

    private getTitleIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//bdi')
    }

    private getDescriptionIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]')
    }

    private getAddNewComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(@data-channel-target, "I_kwDOM1ZvWM6cvYJO")]/child::*[last()]')
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

    private getNotificationCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="event-15189427906"]')
    }

}

export {
    IssuePage,
}