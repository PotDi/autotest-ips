class PageObject {
    protected browser: WebdriverIO.Browser
    protected url: string = 'https://github.com'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }
    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }
}
export {
    PageObject
}