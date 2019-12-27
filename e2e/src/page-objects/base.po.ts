import {browser, protractor} from 'protractor';

export class BasePage {

    // timeout options
    timeout = {
        xl: 120000,
    };

    // selectors
    elements: any;
    locators: any;

    validCredentials = {
        username: 'bibdahal',
        password: 'nepal123'
    };

    invalidCredentials = {
        username: 'invalid',
        password: 'invalid'
    };

    constructor(options: any) {
        this.elements = options.elements;
        this.locators = options.locators;
    }

    /**
     * check whether the locator is present in dom or not
     * @param locator the element locator
     */
    inDom(locator) {
        try {
            return protractor.ExpectedConditions.visibilityOf(locator);
        } catch (err) {
            return protractor.ExpectedConditions.presenceOf(locator);
        }
    }

    /**
     * check whether the locator is absent in dom or not
     * @param locator the element locator
     */
    notInDom(locator) {
        return protractor.ExpectedConditions.stalenessOf(locator);
    }

    /**
     * waits until locator is available on dom
     * @param locator the element locator
     */
    async waitUntil(locator) {
        await browser.wait(() => {
            return this.inDom(locator);
        }, this.timeout.xl, 'timeout: waiting for element to load.');
    }

    /**
     * waits Until Element's style has Visibility:visible
     * @param locator the element locator
     */
    async waitUntilElementIsVisible(locator) {
        await browser.wait(() => {
            return locator.isDisplayed();
        }, this.timeout.xl, 'timeout: waiting for element to load.');
    }

    /**
     * sleeps browser for given miliseconds
     * @param miliseconds the time miliseconds
     */
    async waitForMilliSeconds(ms) {
        await browser.sleep(ms);
    }

    /**
     * sleeps browser for given seconds
     * @param seconds the time seconds
     */
    async waitForSeconds(seconds) {
        await this.waitForMilliSeconds(seconds * 1000);
    }

    /**
     * waits until locator is hidden from dom
     * @param locator the element locator
     */
    async waitUntilHide(locator) {
        await browser.wait(() => {
            return this.notInDom(locator);
        }, this.timeout.xl, 'timeout: waiting for element to hide.');
    }

    /**
     * Click an element
     */
    async click(element) {
        await this.waitUntil(element);
        // await browser.wait(protractor.ExpectedConditions.elementToBeClickable(locator), this.timeout.xl);
        await browser.actions().mouseMove(element).click().perform();
        await this.waitForMilliSeconds(500);
    }

    /**
     * refresh the page
     */
    async reloadPage() {
        await browser.refresh(500);
    }

    /**
     * opens the page
     */
    openPage() {
        browser.manage().window().maximize();
        return browser.get(browser.baseUrl);
    }

    /**
     * close the existing browser
     * @returns promise
     */

    closeBrowser() {
        return browser.close();
    }
    /**
     * wait for element and then clears it and again puts the value
     * @param element the element
     * @param value the value
     * @returns Promise
     */
    async sendValue(element, value) {
        await this.waitUntil(element);
        await element.clear().sendKeys(value);
    }

    /**
     * set the zoom of the browser
     * @param value the zoom value in percentage
     */
    browserZoom(value) {
        browser.executeScript(`document.body.style.zoom='${value}%'`);
    }
}
