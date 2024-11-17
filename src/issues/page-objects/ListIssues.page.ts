import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from "../model/issue.model"

class ListIssuesPage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async openIssue(): Promise<void> {
        await this.getOpenIssue().waitForClickable({
            timeoutMsg: 'Issue was not clickable'
        })
        await this.getOpenIssue().click()
    }

    public async getTextIssuesFilterLabel(): Promise<string> {
        await this.getIssuesFilterLabels().waitForDisplayed({
            timeoutMsg: 'Text Issue Label was not displayed'
        })
        return this.getIssuesFilterLabels().getText()
    }

    public async setButtonCreateIssue(): Promise<void> {
        await this.getButtonCreateIssue().waitForClickable({
            timeoutMsg: 'Button for Create new issue was not clickable'
        })
        await this.getButtonCreateIssue().click()
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
        })
        await this.getSubmitIssue().click()
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.setButtonCreateIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.submitIssue()
    }

    private getOpenIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "issue_")]') //xpath переделать на issue.title
    }

    private getIssuesFilterLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[@data-name="bug"])[last()]') // передавать переменную с названием лейбла.
    }

    private getButtonCreateIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(text(), "New issue")]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "flex")]/button[contains(text(), "Submit new issue")]')
    }
}

export {
    ListIssuesPage,
}