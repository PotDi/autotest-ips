import { PageObject } from "../../page-objects/PageObject"

class ListIssuesPage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

}