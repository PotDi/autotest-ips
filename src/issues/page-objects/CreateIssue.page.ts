import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseElement } from 'webdriverio';
import { IssueModel } from "../model/issue.model";

class CreateIssuePage extends PageObject {
    editIssue(issue: IssueModel) {
        throw new Error("Method not implemented.");
    }
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
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

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.createNewIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.submitIssue()
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

}

export {
    CreateIssuePage,
}