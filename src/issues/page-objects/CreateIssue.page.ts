import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';
import { IssueModel } from "../model/issue.model";

class CreateIssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
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

    public async createNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForClickable({ //clickable (поправлено)
            timeoutMsg: 'Button new issue was not displayed'
        })
        await this.getButtonNewIssue().click()
    }

    public async setTitleIssue(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Input title Issue was not displayed'
        })
        await this.getTitleField().setValue(title)
    }

    public async setDescriptionIssue(description: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Input description Issue was not displayed'
        })
        await this.getDescriptionField().setValue(description)
    }

    public async submitIssue(): Promise<void> {
        await this.getSubmitIssue().waitForClickable({
            timeoutMsg: 'Button submit was not displayed'
        }) //waitforClickable (поправлено)
        await this.getSubmitIssue().click()
    }

    public async setSelectedIssue(): Promise<void> {
        await this.getIssue().waitForClickable({
            timeoutMsg: 'Link to issue was not clickable'
        })
        await this.getIssue().click()
    }

    public async setButtonEditIssue(): Promise<void> {
        await this.getButtonEdit().waitForClickable({
            timeoutMsg: 'Button for edit issue was not clickable'
        })
        await this.getButtonEdit().click()
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

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.createNewIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.submitIssue()
    }

    public async editIssue(issue: IssueModel): Promise<void> {
        await this.setSelectedIssue()
        await this.setButtonEditIssue()
        await this.setEditTitle(issue.title)
        await this.setButtonSave()
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//a[contains(@href, "/issues/new")]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> { //переименовать getDescptionField (поправлено)
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Submit new issue")]')
    }

    private getTitleIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//bdi')
    }

    private getDescriptionIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]')
    }

    private getIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="issue_4_link"]')
    }

    private getButtonEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1]/span[contains(text(), "Edit")]')
    }

    private getInputEdit(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[1][@name="issue[title]"]')
    }

    private getButtonSave() {
        return this.browser.$('//*[@data-disable-with="Updating"]')
    }

    private getCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="new_comment_field"]')
    }

    private getButtonSubmitComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Comment")]')
    }

    private getAddNewComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(@data-channel-target, "I_kwDOM1ZvWM6cvYJO")]/child::*[last()]')
    }
}

export {
    CreateIssuePage as IssuePage,
}