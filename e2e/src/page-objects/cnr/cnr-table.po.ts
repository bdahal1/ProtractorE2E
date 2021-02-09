import { BasePage } from '../base.po';
import { element, by } from 'protractor';

export class CNRTable extends BasePage {
    constructor () {
        super({});
        this.elements = {
            // main table page
            cnrTablePageWrapper: element(by.css('.container')),
            cnrTableColumns: element.all(by.xpath('//datatable-header-cell//div[1]//span[1]')),
            cnrExtractColumns: element.all(by.xpath('//table[@class=\'datatable\']/thead/tr/th')),
            loadingIcon: element(by.xpath('//ngx-loading/div')),
            cnrTableTotalCountText: element(by.xpath('//*[@class=\'page-count ng-star-inserted\']')),
            cnrWorkflowTableTotalCountText: element(by.xpath('//*[@class=\'total-elements\']')),
            noDataDisplayMessage: element(by.css('.empty-row.ng-star-inserted')),

            // filter buttons
            applyFilterButton: element(by.xpath('//button[contains(text(),\'Apply Filter\')]')),
            clearFilterButton: element(by.xpath('//button[contains(text(),\'Clear Filter\')]')),
            // logout
            userOptionsMenu: element(by.xpath('//i[@class=\'ic-user\']')),
            logoutOptionButton: element(by.xpath('//button[contains(text(),\'Logout\')]')),
        };
        this.locators = {
            cnrTableColumnsData: '//datatable-body-cell',
            cnrTableColumnName: '//datatable-header-cell',
            cnrTableColumnField_appender: '//div[1]//input[1]',
        };
    }

    /**
     * checks whether the datatable column names match the original names
     * @param orgNames the original array with the real column names
     * @param currentNames the current array with the displayed column names
     */
    async checkForColumnNames (orgNames: string[]) {
        await this.waitUntil(this.elements.cnrTablePageWrapper);
        await this.waitUntil(this.elements.cnrTableColumns);
        await this.waitForMilliSeconds(500);
        await this.browserZoom(40);
        await this.elements.cnrTableColumns.each(async (ele) => {
            const text = await ele.getText();
            expect(orgNames).toContain(text);
        });
        await this.browserZoom(100);
    }

    /**
     * checks whether the datatable column names match the original names only for Extract configuration page
     * @param orgNames the original array with the real column names
     * @param currentNames the current array with the displayed column names
     */
    async checkForExtractConfigurationColumnNames (orgNames: string[]) {
        await this.waitUntil(this.elements.cnrTablePageWrapper);
        await this.waitUntil(this.elements.cnrExtractColumns);
        await this.waitForMilliSeconds(500);
        await this.browserZoom(40);
        await this.elements.cnrExtractColumns.each(async (ele) => {
            const text = await ele.getText();
            expect(orgNames).toContain(text);
        });
        await this.browserZoom(100);
    }

    /**
     * Apply filter and verify filtered data is visible in the table or not
     * @param orgNames the original array with the real column names
     * @param colName the column name where filter needs to be applied
     * @param filterValue the filter value to apply
     */
    async applyFilterAndVerifyResult (orgNames: string[], colName, filterValue, isNoData = false) {
        await this.waitUntil(this.elements.cnrTablePageWrapper);
        await this.waitUntil(this.elements.cnrTableColumns);
        await this.waitForMilliSeconds(500);
        let index = orgNames.indexOf(colName) + 1;
        if (index === 0) {
            throw new Error(colName + ' column not found!!');
        }
        // tslint:disable-next-line: max-line-length
        const filterEle = await element(by.xpath(this.locators.cnrTableColumnName + '[' + index + ']' + this.locators.cnrTableColumnField_appender));
        await this.sendValue(filterEle, filterValue);
        await this.waitUntil(this.elements.applyFilterButton);
        await this.click(this.elements.applyFilterButton);
        await this.waitUntilHide(this.elements.loadingIcon);
        await this.waitForMilliSeconds(500);
        if (isNoData) {
            if (!await this.elements.noDataDisplayMessage.isPresent()) {
                throw new Error('"No data found" message not visible');
            }
            expect(this.elements.noDataDisplayMessage.getText()).toEqual('No data to display');
        } else {
            if (!await element.all(by.xpath(this.locators.cnrTableColumnsData + '[' + index + ']')).get(0).isPresent()) {
                throw new Error('Expected element not visible');
            }
            await element.all(by.xpath(this.locators.cnrTableColumnsData + '[' + index + ']')).each(async (colElement) => {
                if (filterValue.toLowerCase() === 'false') {
                    expect(colElement.getText()).toContain('No');
                } else {
                    expect(colElement.getText()).toContain(filterValue);
                }
            });
            index = await element.all(by.xpath(this.locators.cnrTableColumnsData + '[' + index + ']')).count();
        }
        return index;
    }

    /**
     * Clear filter and verify count before and after
     * @param beforeDrillValue the value before applying filter
     */
    async clickClearFilterAndVerify () {
        await this.waitUntil(this.elements.cnrTablePageWrapper);
        await this.waitUntil(this.elements.cnrTableColumns);
        await this.waitForMilliSeconds(500);
    }
}
