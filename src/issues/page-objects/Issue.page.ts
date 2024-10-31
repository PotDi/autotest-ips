import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';
import { IssueModel } from "../model/issue.model";

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async createNewIssue(): Promise<void> {
        await this.getNewIssue().waitForDisplayed({
            timeoutMsg: 'Button new issue was not displayed'
        })
        await this.getNewIssue().click()
    }

    public async setTitleIssue(title: string): Promise<void> {
        await this.getTitleIssue().waitForDisplayed({
            timeoutMsg: 'Input title Issue was not displayed'
        })
        await this.getTitleIssue().setValue(title)
    }

    public async setDescriptionIssue(description: string): Promise<void> {
        await this.getBodyIssue().waitForDisplayed({
            timeoutMsg: 'Input description Issue was not displayed'
        })
        await this.getBodyIssue().setValue(description)
    }

    private getNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="repo-content-turbo-frame"]/div/div/child::div[2]')
    }

    private getTitleIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getBodyIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('id="issue_body"')
    }

    private getSubmitIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "submit")]')
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.createNewIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.getSubmitIssue().click()

    }

}