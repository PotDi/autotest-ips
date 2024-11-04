import { PageObject } from "../../page-objects/PageObject"

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/PotDi/autotest-ips/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }
}