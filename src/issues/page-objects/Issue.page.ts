import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from "../model/issue.model"

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }
    public async setEditTitle(title: string): Promise<void> {
        await this.getInputEdit().waitForDisplayed({
            timeoutMsg: 'Input title was not displayed'
        })
        await this.getInputEdit().setValue(title)
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

    public async addComent(): Promise<void> {
        await this.getButtonSubmitComment().waitForClickable({
            timeoutMsg: 'Button Add Comment was not clickable'
        })
        await this.getButtonSubmitComment().click()
    }

    public async isDisplayedAddNewComment(): Promise<string> {
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

    public async editIssue(issue: IssueModel): Promise<void> {
        await this.setEditTitle(issue.title)
        await this.setButtonSave()
    }

    private getInputEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][@name="issue[title]"]')
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
}

export {
    IssuePage,
}