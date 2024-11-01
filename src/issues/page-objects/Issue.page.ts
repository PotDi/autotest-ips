import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';
import { IssueModel } from "../model/issue.model";

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getTextTitleIssue(): Promise<string> {
        await this.getTitleIssue().isDisplayed()
        return this.getTitleIssue().getText()
    }
    public async createNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForDisplayed({
            timeoutMsg: 'Button new issue was not displayed'
        })
        await this.getButtonNewIssue().click()
    }

    public async setTitleIssue(title: string): Promise<void> {
        await this.getTitleNewIssue().waitForDisplayed({
            timeoutMsg: 'Input title Issue was not displayed'
        })
        await this.getTitleNewIssue().setValue(title)
    }

    public async setDescriptionIssue(description: string): Promise<void> {
        await this.getBodyNewIssue().waitForDisplayed({
            timeoutMsg: 'Input description Issue was not displayed'
        })
        await this.getBodyNewIssue().setValue(description)
    }

    public async submitIssue(): Promise<void> {
        await this.getSubmitIssue().isClickable()
        await this.getSubmitIssue().click()
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//a[contains(@href, "/issues/new")]')
    }

    private getTitleNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getBodyNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Submit new issue")]')
    }

    private getTitleIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//bdi')
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.createNewIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.submitIssue()

    }

}

export {
    IssuePage,
}