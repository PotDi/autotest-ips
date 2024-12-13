import { PageObject } from "../../page-objects/PageObject";
import { ChainablePromiseArray, ChainablePromiseElement, ElementArray } from 'webdriverio';
import { IssueModel } from "../model/issue.model";
import { LabelModel } from "../model/label.model";
import { Reporter } from "../../common/reporter/Reporter";
import { ATTACH_PATH } from "../../common/data/image.data";

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

    public async setChoiceLabels(label: LabelModel): Promise<void> {
        await this.getLabels(label.name).waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getLabels(label.name).click()
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
        Reporter.addStep('Нажать кнопку создания задачи')
        await this.setButtonCreateIssue()
        Reporter.addStep('Заполнить название задачи')
        await this.setTitleIssue(issue.title)
        Reporter.addStep('Заполнить описание задачи')
        await this.setDescriptionIssue(issue.description!)
        Reporter.addStep('Нажать кнопку выбора лейбла')
        await this.setButtonLabels()
        Reporter.addStep('Выбрать лейбл')
        await this.setChoiceLabels(issue.labels![0])
        await this.setBody()
        Reporter.addStep('Нажать на кнопку Создание задачи')
        await this.submitIssue()
    }

    public async manageIssueLabel(label: LabelModel): Promise<void> {
        await this.setButtonLabels()
        await this.setChoiceLabels(label)
        await this.setBody()
        await this.browser.pause(3000)
    }

    public async createIssueWithAttach(issue: IssueModel): Promise<void> {
        Reporter.addStep('Нажать кнопку создания задачи')
        await this.setButtonCreateIssue()
        Reporter.addStep('Заполнить описание задачи')
        await this.setTitleIssue(issue.title)
        Reporter.addStep('Прикрепить файл к комментарию')
        await this.uploadAttach(ATTACH_PATH)
        Reporter.addStep('Нажать на кнопку Создание задачи')
        await this.submitIssue()
    }

    public async setLabel(label: LabelModel): Promise<void> {
        await this.setButtonLabels()
        await this.setChoiceLabels(label)
        await this.setBody()
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
        return this.browser.$('//*[@id="labels-select-menu"]')
    }

    private getLabels(label: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//label//*[contains(text(), "${label}")]`)
    }

    private getBody(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//body')
    }
}

export {
    CreateIssuePage,
}