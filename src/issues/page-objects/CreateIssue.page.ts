import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseArray, ChainablePromiseElement, ElementArray } from 'webdriverio';
import { IssueModel } from "../model/issue.model";
import { ATTACH_PATH } from "../../common/data/image.data";

class CreateIssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
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

    public async setButtonLabels(): Promise<void> {
        await this.getLabels().waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getLabels().click()
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

    public async createIssueWithLabels(issue: IssueModel): Promise<void> {
        await this.setButtonCreateIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.setButtonLabels()
        await this.submitIssue()
    }

    public async createIssueWithAttach(issue: IssueModel): Promise<void> {
        await this.setButtonCreateIssue()
        await this.setTitleIssue(issue.title)
        await this.uploadAttach(ATTACH_PATH)
        await this.submitIssue()
    }

    private getButtonCreateIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(text(), "New issue")]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> { //переименовать в getDescptionField (поправлено)
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Submit new issue")]')
    }

    private getLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//label[@role="menuitemcheckbox"][1]')
    }
}

export {
    CreateIssuePage,
}