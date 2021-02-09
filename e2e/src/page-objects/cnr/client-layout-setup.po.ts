import { by, element } from 'protractor';
import { BasePage } from '../base.po';
import { navArrayCNR } from './workflow.po';


const riskLOB = ['MRA', 'CRA'];
const fileType = ['Exclusion', 'Add-on File'];
const projectType = ['Retrieval Only', 'Retrieval & Coding'];
const networkIndicator = ['In Area', 'OOA'];
const fileDelimiter = ['Pipe ( | )', 'Comma ( , )', 'Tilde ( ~ )', 'Excel'];
const layoutFileDelimiter = ['Pipe ( | )', 'Comma ( , )', 'Tilde ( ~ )'];

export class ClientLayoutSetup extends BasePage {
    constructor() {
        super({});
        this.elements = {
            // current page
            userOptionsMenu: element(by.xpath('//i[@class=\'ic-user\']')),
            productOptionsMenu: element(by.xpath('//i[@class=\'ic-app\']')),
            logoutOptionButton: element(by.xpath('//button[@class=\'mat-menu-item\']')),
            hamburgerIcon: element(by.css('.header-ic-link.nav-icon')),
            cnrNavigationElements: element.all(by.xpath('//mat-nav-list[@class=\'mat-nav-list mat-list-base ng-star-inserted\']/a')),
            navigationSliderWrapper: element(by.css('.mat-drawer-inner-container')),
            refreshButton: element(by.buttonText('Refresh')),
            loadingIcon: element(by.xpath('//ngx-loading/div')),
            allCNRPageMainWrapper: element(by.css('.datatable-header-inner')),
            workflowPageLink: element(by.css('.header-brand-logo a')),
            // add layout popup
            clientNameReadyOnlyField: element(by.xpath('//*[@readonly]')),
            selectClientDropdown: element(by.css('.ic-chevron-down')),
            selectClientTextField: element(by.xpath('//input[@id=\'clientSelect\']')),
            addNewLayoutButton: element(by.xpath('//span[contains(text(),\'Add Layout\')]')),
            fileTypeDropdown: element(by.css('#mat-select-1')),
            riskLOBDropdown: element(by.css('#mat-select-2')),
            projectTypeDropdown: element(by.css('#mat-select-3')),
            networkIndicatorDropdown: element(by.css('#mat-select-4')),
            uclStandardCheckbox: element(by.css('.mat-checkbox-inner-container')),
            fileDelimiterDropdown: element(by.css('#mat-select-5')),
            skipHeaderTextField: element(by.xpath('//*[@formcontrolname=\'skipHeaderRow\']')),
            layoutFileDelimiterDropdown: element(by.css('#mat-select-6')),
            submitButton: element(by.xpath('//button[contains(text(),\'Submit\')]')),
            actionIconFirstLayoutRow: element(by.xpath('//datatable-body-cell[9]/div[1]/span')),
            uclMappingButton: element(by.xpath('//span[contains(text(),\'UCL Mapping\')]')),
            editLayoutStructureButton: element(by.xpath('//span[contains(text(),\'Edit Layout Structure\')]')),
            editLayoutColumnsButton: element(by.xpath('//span[contains(text(),\'Edit Layout Columns\')]')),
            dqrConfigurationButton: element(by.xpath('//button/span[contains(text(),\'DQR Configuration\')]')),
            subAccountSubProjectButton: element(by.xpath('//span[contains(text(),\'Sub-Project/Sub-Account Mapping\')]')),

            uclMappingDropdownFirstButton: element(by.xpath('//mat-option[1]/span')),
            uclMappingDropdownSecondButton: element(by.xpath('//mat-option[2]/span')),
            validateUCLMappingButton: element(by.xpath('//button[contains(text(),\'Validate\')]')),
            saveUCLMappingButton: element(by.xpath('//span[contains(text(),\'Save\')]')),
            allYesButton: element(by.xpath('//button[contains(text(),\'Yes\')]')),
            allOkButton: element(by.xpath('//button[contains(text(),\'OK\')]')),
            allPopupTitleText: element(by.xpath('//h1/span')),

            layoutDelimiterTitle: element(by.css('.mat-dialog-title')),
            layoutDelimiterDropdown: element(by.css('.mat-select')),
            layoutDelimiterSkipHeaderText: element(by.xpath('//*[@formcontrolname=\'skipHeaderRow\']')),

            layoutAddColumnButton: element(by.xpath('//button[contains(text(),\'Add Column\')]')),
            layoutContinueButton: element(by.xpath('//button[contains(text(),\'Continue\')]')),
            layoutColumnNameTextBox: element(by.xpath('//*[@formcontrolname=\'columnName\']')),
            layoutColumnNameInTableText: element(by.xpath('//*[contains(text(),\'Test123\')]')),
            layoutColumnNameCheckbox: element(by.xpath('//*[contains(text(),\'Test123\')]/../td[1]/input')),
            layoutColumnDeleteAllButton: element(by.xpath('//button[contains(text(),\'Delete\')]')),
            layoutColumnEditButton: element(by.xpath('//*[contains(text(),\'Test123\')]/../td[4]/a[@class=\'ic-edit editColumn\']')),

            savePopupTitle: element(by.xpath('//h1[@class=\'mat-dialog-title\']')),
            saveDQRConfigurationButton: element(by.xpath('//*[contains(text(),\'Save DQR Configuration\')]')),

            dqrMasterMemberIsNullCheckbox: element(by.xpath('//tbody[5]/tr/td[3]/mat-checkbox')),

            subAccountSubProjectHardCodedTextBox: element(by.xpath('//*[@placeholder=\'Enter hardcoded value or mapping query\']')),
            subAccountSubProjectSaveConfigButton: element(by.xpath('//button[contains(text(),\'Save Config\')]')),
            subAccountMappingTabButton: element(by.xpath('//div[contains(text(),\'Sub Account Mapping\')]')),

            genericOptions: element.all(by.xpath('//*[@class=\'mat-option-text\']'))
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
     * click on side navigation panel and navigate to page specified by index
     * @param index is a numeric value starting from 0
     * @returns Promise
     */
    async navigateToPageFromSidePanelCNR(finder) {
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
    async selectValueFromDropdown(ele, array, value) {
        await this.click(ele);
        if (typeof (value) === 'string') {
            value = array.indexOf(value);
        }
        await this.click(this.elements.genericOptions.get(value));
    }

    /**
     * add new layout for the given client name and its parameter
     * @param clientName the clientName
     * @param fileTypeName the fileTypeName
     * @param riskLOBName the risk lob
     * @param projectTypeName the project type
     * @param networkIndicatorName the network indicator
     * @param isUclStandard the checkbox boolean
     * @param fileDelimiterName the file delimiter name
     * @param skipHeaderValue the skip header value
     * @param layoutFileDelimiterValue the layout file delimiter value
     * @param layoutHeaderFileName te layout header file name
     */
    async addNewLayout(clientName, fileTypeName, riskLOBName, projectTypeName,
        networkIndicatorName, isUclStandard, fileDelimiterName,
        skipHeaderValue, layoutFileDelimiterValue, layoutHeaderFileName) {
        await this.sendValue(this.elements.selectClientTextField, clientName);
        await this.click(element.all(by.xpath('//span[contains(text(),\'' + clientName + '\')]')).last());
        await this.click(this.elements.addNewLayoutButton);
        await this.waitUntilElementIsVisible(this.elements.fileTypeDropdown);
        await this.selectValueFromDropdown(this.elements.fileTypeDropdown, fileType, fileTypeName);
        await this.click(this.elements.clientNameReadyOnlyField);
        await this.selectValueFromDropdown(this.elements.riskLOBDropdown, riskLOB, riskLOBName);
        await this.click(this.elements.clientNameReadyOnlyField);
        await this.selectValueFromDropdown(this.elements.projectTypeDropdown, projectType, projectTypeName);
        await this.click(this.elements.clientNameReadyOnlyField);
        await this.selectValueFromDropdown(this.elements.networkIndicatorDropdown, networkIndicator, networkIndicatorName);
        await this.click(this.elements.clientNameReadyOnlyField);
        if (isUclStandard) {
            await this.click(this.elements.uclStandardCheckbox);
        } else {
            await this.selectValueFromDropdown(this.elements.fileDelimiterDropdown, fileDelimiter, fileDelimiterName);
            await this.click(this.elements.clientNameReadyOnlyField);
            await this.sendValue(this.elements.skipHeaderTextField, skipHeaderValue);
            await this.selectValueFromDropdown(this.elements.layoutFileDelimiterDropdown, layoutFileDelimiter, layoutFileDelimiterValue);
            await this.click(this.elements.clientNameReadyOnlyField);
            await this.uploadFile(element(by.xpath('//input[@type=\'file\']')), layoutHeaderFileName);
        }
        await this.click(this.elements.submitButton);
        await this.waitForSeconds(1);
    }

    /**
     * add UCL Mapping for the layout with given values
     * @param nonUCLColumnValues the nonUCLColumnValues
     * @returns promise
     */
    async addUCLMapping(nonUCLColumnValues) {
        for (const cols in nonUCLColumnValues) {
            if (nonUCLColumnValues.hasOwnProperty(cols)) {
                const elem = await element(by.xpath('//tbody[' + (parseInt(cols, 10) + 1) + ']/tr/td[3]/input'));
                await this.sendValue(elem, nonUCLColumnValues[cols]);
                let val = true;
                val = await this.elements.uclMappingDropdownFirstButton.isPresent().then(async (prom) => {
                    if (prom) {
                        return await this.elements.uclMappingDropdownSecondButton.isPresent().then(async (promi) => {
                            if (promi) {
                                return true;
                            }
                            return false;
                        });
                    }
                    return true;
                });
                if (val === false) {
                    await this.click(this.elements.uclMappingDropdownFirstButton);
                }
                await this.click(await element(by.xpath('//tbody[' + (parseInt(cols, 10) + 1) + ']/tr/td[2]/input')));
            }
        }
        await this.click(this.elements.validateUCLMappingButton);
        await this.waitUntilHide(this.elements.loadingIcon);
        await this.click(this.elements.saveUCLMappingButton);
        await this.waitUntilElementIsVisible(this.elements.allYesButton);
        await this.click(this.elements.allYesButton);
        await this.waitUntilElementIsVisible(this.elements.allPopupTitleText);
        return this.elements.allPopupTitleText.getText();
    }

    /**
     * edit file delimiter for the selected layout
     * @param fileDelimiterName the file delimiter name
     * @param skipHeaderValue the skip header value
     */
    async editFileDelimiterFromPopup(fileDelimiterName, skipHeaderValue) {
        await this.selectValueFromDropdown(this.elements.layoutDelimiterDropdown, fileDelimiter, fileDelimiterName);
        await this.click(this.elements.layoutDelimiterTitle);
        await this.sendValue(this.elements.layoutDelimiterSkipHeaderText, skipHeaderValue);
        await this.click(this.elements.submitButton);
        await this.waitUntilElementIsVisible(this.elements.allOkButton);
        await this.click(this.elements.allOkButton);
    }
}
