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

    private getOpenIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "issue_")]')
    }
}

export {
    ListIssuesPage,
}