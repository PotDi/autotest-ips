import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseArray, ChainablePromiseElement, ElementArray } from 'webdriverio';
import { IssueModel } from "../model/issue.model";
import { ATTACH_PATH } from "../../common/data/image.data";
import { LabelModel } from "../model/label.model";

class CreateIssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/new'

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
        await this.getButtonLabels().waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getButtonLabels().click()
    }

    public async setChoiceLabels(label?: LabelModel): Promise<void> {
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

    public async setBody(): Promise<void> {
        await this.getBody().waitForDisplayed({
            timeoutMsg: 'Page was not displayed'
        })
        await this.getBody().click()
    }

    public async submitIssue(): Promise<void> {
        await this.getSubmitIssue().waitForClickable({
            timeoutMsg: 'Button submit was not displayed'
        })
        await this.getSubmitIssue().click()
    }

    public async createIssueWithLabels(issue: IssueModel): Promise<void> {
        await this.setButtonCreateIssue()
        await this.setTitleIssue(issue.title)
        await this.setDescriptionIssue(issue.description)
        await this.setButtonLabels()
        await this.setChoiceLabels(issue.label)
        await this.setBody()
        await this.submitIssue()
    }

    public async createIssueWithAttach(issue: IssueModel): Promise<void> {
        await this.setButtonCreateIssue()
        await this.setTitleIssue(issue.title)
        await this.uploadAttach(ATTACH_PATH) //Attach_path хранить в модели
        await this.submitIssue()
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

    private getButtonLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-cache-name="labels"]/details')
    }

    private getLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="menuitemcheckbox"][1]')
    }

    private getBody(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//body')
    }
}

export {
    CreateIssuePage,
}