import { ChainablePromiseElement } from 'webdriverio';
class PageObject {
    protected browser: WebdriverIO.Browser
    protected url: string = 'https://github.com'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }
    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async uploadAttach(filePath: string): Promise<void> {
        await this.getUploadAttachComment().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getUploadAttachComment().setValue(file)
    }

    private getUploadAttachComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        console.log(htmlElement)
    })
}

export {
    PageObject
}