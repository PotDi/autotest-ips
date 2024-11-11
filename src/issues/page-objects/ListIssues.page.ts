import { PageObject } from "../../page-objects/PageObject"
import { ChainablePromiseElement } from 'webdriverio'

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

    public async setFilterLabels(): Promise<void> {
        await this.getFilterLabels().waitForClickable({
            timeoutMsg: 'Filter by labels was not clickable'
        })
        await this.getFilterLabels().click()
    }

    public async getTextIssuesFilterLabel(): Promise<string> {
        await this.getIssuesFilterLabels().waitForDisplayed({
            timeoutMsg: 'Text Issue Label was not displayed'
        })
        return this.getIssuesFilterLabels().getText()
    }

    private getOpenIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "issue_")]')
    }


    private getFilterLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="menuitemcheckbox"][2]')
    }

    private getIssuesFilterLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[@data-name="bug"])[last()]')
    }
}

export {
    ListIssuesPage,
}