import { by, element, browser } from 'protractor';
import { BasePage } from '../base.po';

const navArrayCNR = [
    'WorkFlow',
    'Client Setup',
    'Chase File Layout Setup',
    'Extract Configuration'];

export class Workflow extends BasePage {
    constructor () {
        super({});
        this.elements = {
            // current page
            workflowPageWrapper: element(by.css('.header')),
            userOptionsMenu: element(by.xpath('//i[@class=\'ic-user\']')),
            productOptionsMenu: element(by.xpath('//i[@class=\'ic-app\']')),
            logoutOptionButton: element(by.xpath('//button[@class=\'mat-menu-item\']')),
            hamburgerIcon: element(by.css('.header-ic-link.nav-icon')),
            cnrNavigationElements: element.all(by.xpath('//mat-nav-list[@class=\'mat-nav-list mat-list-base ng-star-inserted\']/a')),
            navigationSliderWrapper: element(by.css('.mat-drawer-inner-container')),
            refreshButton: element(by.xpath('//span[contains(text(),\'Refresh\')]')),
            loadingIcon: element(by.xpath('//ngx-loading[1]/div[1]')),
            allCNRPageMainWrapper: element(by.css('.datatable-header-inner')),
            workflowPageLink: element(by.css('.header-brand-logo a')),
            submitButton: element(by.xpath('//button[contains(text(),\'Submit\')]')),
            allPopupTitleText: element(by.xpath('//h1/span')),
            allYesButton: element(by.xpath('//button[contains(text(),\'Yes\')]')),
            allNoButton: element(by.xpath('//button[contains(text(),\'No\')]')),
            allPopupCloseIcon: element(by.xpath('//*[@class=\'modalClose\']/i')),
            allOkButton: element(by.xpath('//button[contains(text(),\'OK\')]')),
            // add client popup
            selectClientDropdown: element(by.css('.ic-chevron-down')),
            selectClientTextField: element(by.xpath('//input[@id=\'clientSelect\']')),

            addRunIdButton: element(by.xpath('//span[contains(text(),\'Add RunID\')]')),
            addRunIdPopupTitle: element(by.xpath('//h1[@class=\'mat-dialog-title\']')),
            addRunIdTicketNumberTextBox: element(by.xpath('//input[@formcontrolname=\'ticketNumber\']')),
            addRunIdLayoutIdDropdown: element(by.xpath('//mat-select[@formcontrolname=\'layoutId\']')),
            addRunIdLayoutOption: element(by.xpath('//*[@class=\'mat-option-text\'][1]')),
            addRunIdFilePathTextBox: element(by.xpath('//*[@formcontrolname=\'filePath\']')),
            addRunIdLMSectionExpandIcon: element(by.xpath('//mat-panel-title[contains(text(),\'LM File\')]')),
            addRunIdLMProjectTypeDropdown: element(by.xpath('//mat-select[@formcontrolname=\'lmProjectType\']')),
            addRunIdLMProjectTypeRetroOption: element(by.xpath('//mat-option/span[contains(text(),\'Retrospective\')]')),

            runDetailRunIdLink: element(by.xpath('//a[contains(text(),\'AutomationClient1\')]')),
            runDetailFileTransferUploadIcon: element(by.xpath('//tbody/tr[1]/td[6]/div[1]/a[1]')),
            runDetailFileTransferFileNameDropdown: element(by.xpath('//mat-select[@formcontrolname=\'fileNames\']')),
            runDetailExecuteButton: element(by.xpath('//button[contains(text(),\'Execute\')]')),
            runDetailLoadFilePopupTitleText: element(by.xpath('//h1[contains(text(),\'Load File\')]')),
            runDetailEnableRerunButton: element(by.xpath('//button/span[contains(text(),\'Enable Re-run\')]')),

            executeChaseFilePopupControlTotalTextBox: element(by.xpath('//input[@placeholder=\'Control Total Value\']')),

            providerAddressYesRadioButton: element(by.xpath('//mat-radio-button[1]/label/div[1]')),
            providerAddressNoRadioButton: element(by.xpath('//mat-radio-button[2]/label/div[1]')),

            genericOptions: element.all(by.xpath('//*[@class=\'mat-option-text\']'))
        }
        ;
        this.locators = {
            tableHeaderPath: '//table[@class=\'datatable\']/tbody[1]/tr[3]/td',
            tableDataPath: '//table[@class=\'datatable\']/tbody[2]/tr',
        };
    }

    /**
     * logout from the application
     * @returns Promise
     */
    async logout () {
        await this.click(this.elements.userOptionsMenu);
        await this.waitForMilliSeconds(500);
        await this.waitUntil(this.elements.logoutOptionButton);
        await this.click(this.elements.logoutOptionButton);
    }

    /**
     * click on side navigation panel and navigate to page specified by index
     * @param index is a numeric value starting from 0
     * @returns Promise
     */
    async navigateToPageFromSidePanelCNR (finder) {
        await this.click(this.elements.hamburgerIcon);
        if (typeof (finder) === 'string') {
            finder = navArrayCNR.indexOf(finder);
        }
        await this.click(this.elements.cnrNavigationElements.get(finder));
        await this.waitUntil(this.elements.allCNRPageMainWrapper);
    }

    /**
     * select single value from the dropdown in add client popup
     * @param ele is element
     * @param array is array
     * @param value is value
     */
    async selectValueFromDropdown (ele, array, value) {
        await this.click(ele);
        if (typeof (value) === 'string') {
            value = array.indexOf(value);
        }
        await this.waitForMilliSeconds(500);
        await this.click(this.elements.genericOptions.get(value));
        await this.click(this.elements.addRunIdFilePathTextBox);
    }

    /**
     * creates a new runid
     * @param clientName is clientName
     * @param ticketNumber is ticketNumber
     * @param filePath is filepath
     * @param lmProjectType is project type
     */
    async addNewRunId (clientName, ticketNumber, filePath, lmProjectType) {
        await this.sendValue(this.elements.selectClientTextField, clientName);
        await this.click(element.all(by.xpath('//span[contains(text(),\'' + clientName + '\')]')).last());
        await this.click(this.elements.addRunIdButton);
        await this.sendValue(this.elements.addRunIdTicketNumberTextBox, ticketNumber);
        await this.click(this.elements.addRunIdLayoutIdDropdown);
        await this.click(this.elements.addRunIdLayoutOption);
        //        await this.selectValueFromDropdown(this.elements.addRunIdLayoutIdDropdown,['1860'],'1860');
        await this.sendValue(this.elements.addRunIdFilePathTextBox, filePath);
        await this.click(this.elements.addRunIdLMSectionExpandIcon);
        await this.waitUntilElementIsVisible(this.elements.addRunIdLMProjectTypeDropdown);
        await this.selectValueFromDropdown(this.elements.addRunIdLMProjectTypeDropdown, ['Prospective', 'Retrospective'], lmProjectType);
        await this.click(this.elements.submitButton);
        await this.waitForSeconds(1);
    }

    /**
     * wait until process provided is displayed in rund detail page
     * @param processName is processName
     * @param processStatus is processStatus
     */

    async workflowWaitForStatus (processName, processStatus) {
        const ele = element(by.xpath('//tbody/tr/td[contains(text(),\'' + processName + '\')]/../td[5]/span'));
        let pageStatus = 'In Progress';
        await this.click(this.elements.refreshButton);
        await this.waitUntilHide(this.elements.loadingIcon);

        while (pageStatus !== processStatus) {
            if (pageStatus === 'Failed') {
                expect(pageStatus).toEqual(processStatus);
                break;
            }
            await this.click(this.elements.refreshButton);
            await this.waitUntilHide(this.elements.loadingIcon);
            pageStatus = await ele.getText();
        }
    }

    /**
     * Click enable rerun button if disabled else do nothing
     * @param processName is processName
     */
    async clickEnableRerunForProcess (processName) {
        // tslint:disable-next-line: max-line-length
        const elem = element(by.xpath('//tbody/tr/td[contains(text(),\'' + processName + '\')]/../td[6]/a[@class=\'ic-more-vertical mat-menu-trigger\']'));
        await this.click(elem);
        if (await this.elements.runDetailEnableRerunButton.isPresent()) {
            await this.click(this.elements.runDetailEnableRerunButton);
        } else {
            await this.click(elem);
        }
    }

    /**
     * Click on Play icon by making icon visible first
     * @param processName is processName
     */
    async clickPlayIconForProcess (processName, rerun = true) {
        const elem = element(by.xpath('//tbody/tr/td[contains(text(),\'' + processName + '\')]/../td[6]/a/i[@class=\'ic-play\']'));
        const text = await element(by.xpath('//tbody/tr/td[contains(text(),\'' + processName + '\')]/../td[5]')).getText();
        if (rerun) {
            await this.clickEnableRerunForProcess(processName);
        }
        await this.click(elem);
        return text;
    }

    /**
     * verify h1 header value. Different from h1/span header
     * @param header is header value
     */
    async verifyH1HeaderValue (header) {
        const elem = element(by.xpath('//h1[contains(text(),\'' + header + '\')]'));
        await this.waitUntilElementIsVisible(elem);
        const title = await elem.getText();
        if (title === header) {
            return true;
        }
        return false;
    }
}
export { navArrayCNR };
