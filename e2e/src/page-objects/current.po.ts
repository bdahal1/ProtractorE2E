import { by, element } from 'protractor';
import { BasePage } from './base.po';

const navArrayRAPS = [
    'Current Tab',
    'Upload History',
    'Failed Upload History',
    'Folder History',
    'Job History',
    'Batch History',
    'Process Merge History',
    'Process RPC History',
    'Process CN History',
    'Process CS History',
    'Outbound History',
    'File QC History',
    'RAPS Return QC History',
    'Batch QC History'];

const navArrayEDS = [
    'Current Tab',
    'Job History',
    'File Statuses History',
    'Encounter Statuses History',
    'Inbound Folder History',
    'Invalid H Plan History',
    'Missing CMS Responses History',
    'Status Stuck Responses History',
    'Sup Encounter Statuses History',
    'Sup Invalid H Plan History',
    'Sup Missing CMS Resp History',
    'Sup Status Stuck Resp History'];


export class Current extends BasePage {
    constructor() {
        super({});
        this.elements = {
            // current page
            currentPageWrapper: element(by.css('.header')),
            userOptionsMenu: element(by.xpath('//a[@class=\'header-ic-link\']/i[@class=\'ic-user\']')),
            productOptionsMenu: element(by.xpath('//a[@class=\'header-ic-link\']/i[@class=\'ic-folder\']')),
            logoutOptionButton: element(by.buttonText('Logout')),
            rapsOptionButton: element(by.buttonText('RAPS')),
            edsOptionButton: element(by.buttonText('EDS')),
            hamburgerIcon: element(by.css('.header-ic-link.nav-icon')),
            navigationElements: element.all(by.xpath('//mat-nav-list[@class=\'mat-nav-list mat-list-base ng-star-inserted\']/a')),
            navigationSliderWrapper: element(by.css('.mat-drawer-inner-container')),
            reloadButton: element(by.buttonText('Reload')),
            loadingIcon: element(by.xpath('//ngx-loading/div')),
            currentPageLink: element(by.css('.header-brand-logo a')),
            // for all the tables in other page
            allPageTotalCountText: element(by.css('.total-elements')),
            batchCountColumnText: element.all(by.xpath('//datatable-body-cell[6]//div[1]')).first(),
            fileCountColumnText: element.all(by.xpath('//datatable-body-cell[6]//div[1]')).first(),
            allPageMainTableWrapper: element(by.css('.datatable-header-inner')),
        };
        this.locators = {
            tableHeaderPath: '//table[@class=\'datatable\']/tbody[1]/tr[3]/td',
            tableDataPath: '//table[@class=\'datatable\']/tbody[2]/tr',
        };
    }

    /**
     * logout from the application
     * @returns Promise
     */
    async logout() {
        await this.click(this.elements.userOptionsMenu);
        await this.waitForMilliSeconds(500);
        await this.waitUntil(this.elements.logoutOptionButton);
        await this.click(this.elements.logoutOptionButton);
    }

    /**
     * switch to eds
     */
    async switchToEDS() {
        await this.click(this.elements.productOptionsMenu);
        await this.waitForMilliSeconds(500);
        await this.waitUntil(this.elements.edsOptionButton);
        await this.click(this.elements.edsOptionButton);
    }
    /**
     * switch to raps
     */
    async switchToRAPS() {
        await this.click(this.elements.productOptionsMenu);
        await this.waitForMilliSeconds(500);
        await this.waitUntil(this.elements.rapsOptionButton);
        await this.click(this.elements.rapsOptionButton);
    }
    /**
     * navigate all pages from side navigation panel
     * @returns Promise
     */
    async navigateAllRAPSPagesUsingSidePanel() {
        await this.elements.navigationElements.count().then(async (counter) => {
            let count;
            for (count = 1; count < counter; count++) {
                await this.navigateToPageFromSidePanelRAPS(count);
            }
        });
    }

    /**
     * navigate all pages from side navigation panel
     * @returns Promise
     */
    async navigateAllEDSPagesUsingSidePanel() {
        await this.elements.navigationElements.count().then(async (counter) => {
            let count;
            for (count = 1; count < counter; count++) {
                await this.navigateToPageFromSidePanelEDS(count);
            }
        });
    }

    /**
     * click on side navigation panel and navigate to page specified by index
     * @param index is a numeric value starting from 0
     * @returns Promise
     */
    async navigateToPageFromSidePanelRAPS(finder) {
        await this.click(this.elements.hamburgerIcon);
        if (typeof (finder) === 'string') {
            finder = navArrayRAPS.indexOf(finder);
        }
        await this.click(this.elements.navigationElements.get(finder));
        await this.waitUntil(this.elements.allPageMainTableWrapper);
    }

    /**
     * click on side navigation panel and navigate to page specified by index
     * @param index is a numeric value starting from 0
     * @returns Promise
     */
    async navigateToPageFromSidePanelEDS(finder) {
        await this.click(this.elements.hamburgerIcon);
        if (typeof (finder) === 'string') {
            finder = navArrayEDS.indexOf(finder);
        }
        await this.click(this.elements.navigationElements.get(finder));
        await this.waitUntil(this.elements.allPageMainTableWrapper);
    }

    /**
     * find all the rows and counts it for current pages data table xpath
     * @returns Promise count of total row
     */
    async countTotalRows() {
        return element.all(by.xpath(this.locators.tableDataPath)).count().then(async (counter) => {
            return counter;
        });
    }

    /**
     * find all the columns and counts it for current pages data table xpath
     * @returns Promise count of total columns
     */
    async countTotalColumns() {
        return element.all(by.xpath(this.locators.tableDataPath + '[1]/td')).count().then(async (counter) => {
            return counter;
        });
    }

    /**
     * find all the links whose value is greater than 0 and returns the element
     * @param locator is locator
     * @returns Promise
     */
    async getLinkValueFromTable(locator) {
        return element(by.xpath(locator)).isPresent().then((result) => {
            if (result) {
                return element(by.xpath(locator)).getText().then(async (text) => {
                    if (text.match('^[1-9]\\d*$')) {
                        return element(by.xpath(locator));
                    }
                });
            }
        });
    }
}
