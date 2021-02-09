import { by, element } from 'protractor';
import { BasePage } from '../base.po';
import { navArrayCNR } from './workflow.po';

const legacyClientId = ['None'];
const riskLOB = ['MRA', 'CRA', 'CCV'];
const fileType = ['ChaseList – Client', 'ChaseList – Suspecting', 'Exclusion', 'Add-on File'];
const projectType = ['Retrieval Only', 'Retrieval & Coding', 'Coding Only'];
const networkIndicator = ['In Area', 'OOA'];
const clientBaseLocation = '\\\\hrp.local\\Shares\\Departments\\DataOperations\\Share\\DEFT Team\\';
export class ClientSetup extends BasePage {
    constructor () {
        super({});
        this.elements = {
            // current page
            workflowPageWrapper: element(by.css('.header')),
            userOptionsMenu: element(by.xpath('//i[@class=\'ic-user\']')),
            productOptionsMenu: element(by.xpath('//i[@class=\'ic-app\']')),
            logoutOptionButton: element(by.xpath('//button[@class=\'mat-menu-item\']')),
            hamburgerIcon: element(by.css('.header-ic-link.nav-icon')),
            closeNavigationIcon: element(by.xpath('//*[@class=\'close-icon\']')),
            cnrNavigationElements: element.all(by.xpath('//mat-nav-list[@class=\'mat-nav-list mat-list-base ng-star-inserted\']/a')),
            navigationSliderWrapper: element(by.css('.mat-drawer-inner-container')),
            refreshButton: element(by.buttonText('Refresh')),
            loadingIcon: element(by.xpath('//ngx-loading[1]/div[1]')),
            allCNRPageMainWrapper: element(by.css('.datatable-header-inner')),
            workflowPageLink: element(by.css('.header-brand-logo a')),
            // add client popup
            addClientButton: element(by.xpath('//button[contains(text(),\'Add Client\')]')),
            addClientConfigText: element(by.xpath('//h1[@id=\'mat-dialog-title-0\']')),
            clientLegacyClientIdSelect: element(by.css('#mat-select-1')),
            clientNameField: element(by.xpath('//*[@placeholder=\'Enter Client Name\']')),
            clientDescriptionField: element(by.xpath('//*[@placeholder=\'Enter Client Description\']')),
            // tslint:disable-next-line: max-line-length
            clientIsActiveCheckbox: element(by.xpath('//*[@class=\'mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin\']')),
            clientRiskLOBSelect: element(by.css('#mat-select-2')),
            clientFileTypeSelect: element(by.css('#mat-select-3')),
            clientProjectTypeSelect: element(by.css('#mat-select-4')),
            clientNetworkIndicatorSelect: element(by.css('#mat-select-5')),
            editClientLegacyClientIdSelect: element(by.css('#mat-select-0')),
            editClientRiskLOBSelect: element(by.css('#mat-select-1')),
            editClientFileTypeSelect: element(by.css('#mat-select-2')),
            editClientProjectTypeSelect: element(by.css('#mat-select-3')),
            editClientNetworkIndicatorSelect: element(by.css('#mat-select-4')),
            // tslint:disable-next-line: max-line-length
            clientBasePathField: element(by.xpath('//*[@placeholder=\'Enter Client Base Location (*Should start with \\\\hrp.local\\Shares\\Departments\\DataOperations\\Share\\DEFT Team\\)\']')),
            addClientSubmitButton: element(by.xpath('//button[contains(text(),\'Submit\')]')),

            // edit client
            actionIconFirstRow: element(by.xpath('//datatable-body-cell[12]/div[1]/span')),
            editClientButton: element(by.xpath('//*[contains(text(),\'Edit Client\')]')),
            uclCustomFieldsButton: element(by.xpath('//*[contains(text(),\'Custom UCL Fields Configuration\')]')),
            uclCustomSaveButton: element(by.xpath('//button[contains(text(),\'Save\')]')),
            uclCustomYesButton: element(by.xpath('//button[contains(text(),\'Yes\')]')),
            uclCustomOkButton: element(by.xpath('//button[contains(text(),\'OK\')]')),
            uclCustomBackToClientButton: element(by.css('.ic-arrow-left')),
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
     * navigate all pages from side navigation panel
     * @returns Promise
     */
    async navigateAllCNRPagesUsingSidePanel () {
        await this.elements.cnrNavigationElements.count().then(async (counter) => {
            let count;
            for (count = 1; count < counter; count++) {
                await this.navigateToPageFromSidePanelCNR(count);
            }
        });
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
        const text = await (this.elements.cnrNavigationElements.get(finder)).getText();
        if (text === 'DQR Configuration') {
            console.log('Not Clicking: ' + text);
            await this.click(this.elements.closeNavigationIcon);
        } else {
            await this.click(this.elements.cnrNavigationElements.get(finder));
        }
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
        await this.click(this.elements.clientBasePathField);
    }

    /**
     * add new client
     * @param legacyClientIdVal, clientName, clientDesc, riskLOBVal, fileTypeVal, projectTypeVal, networkIndicatorVal
     */
    async addNewClient (legacyClientIdVal, clientName, clientDesc, riskLOBVal, fileTypeVal, projectTypeVal, networkIndicatorVal) {
        await this.click(this.elements.addClientButton);
        await this.selectValueFromDropdown(this.elements.clientLegacyClientIdSelect, legacyClientId, legacyClientIdVal);
        await this.sendValue(this.elements.clientNameField, clientName);
        await this.sendValue(this.elements.clientDescriptionField, clientDesc);
        await this.click(this.elements.clientIsActiveCheckbox);
        await this.waitForMilliSeconds(500);
        await this.selectValueFromDropdown(this.elements.clientRiskLOBSelect, riskLOB, riskLOBVal);
        await this.selectValueFromDropdown(this.elements.clientFileTypeSelect, fileType, fileTypeVal);
        await this.selectValueFromDropdown(this.elements.clientProjectTypeSelect, projectType, projectTypeVal);
        await this.selectValueFromDropdown(this.elements.clientNetworkIndicatorSelect, networkIndicator, networkIndicatorVal);
        await this.sendValue(this.elements.clientBasePathField, clientBaseLocation);
        await this.click(this.elements.addClientSubmitButton);
        await this.waitForSeconds(1);
        await this.waitUntil(this.elements.allCNRPageMainWrapper);
    }

    /**
     * edit existing client for given client name
     * @param legacyClientIdVal, clientName, clientDesc, riskLOBVal, fileTypeVal, projectTypeVal, networkIndicatorVal
     */
    async editExistingClient (legacyClientIdVal, clientName, clientDesc, riskLOBVal, fileTypeVal, projectTypeVal, networkIndicatorVal) {
        await this.click(this.elements.actionIconFirstRow);
        await this.click(this.elements.editClientButton);
        if (legacyClientIdVal !== null && legacyClientIdVal !== '') {
            await this.selectValueFromDropdown(this.elements.editClientLegacyClientIdSelect, legacyClientId, legacyClientIdVal);
        }
        if (clientName !== null && clientName !== '') {
            await this.sendValue(this.elements.clientNameField, clientName);
        }
        if (clientDesc !== null && clientDesc !== '') {
            await this.sendValue(this.elements.clientDescriptionField, clientDesc);
        }
        if (riskLOBVal !== null && riskLOBVal !== '') {
            await this.selectValueFromDropdown(this.elements.editClientRiskLOBSelect, riskLOB, riskLOBVal);
        }
        if (fileTypeVal !== null && fileTypeVal !== '') {
            await this.selectValueFromDropdown(this.elements.editClientFileTypeSelect, fileType, fileTypeVal);
        }
        if (projectTypeVal !== null && projectTypeVal !== '') {
            await this.selectValueFromDropdown(this.elements.editClientProjectTypeSelect, projectType, projectTypeVal);
        }
        if (networkIndicatorVal !== null && networkIndicatorVal !== '') {
            await this.selectValueFromDropdown(this.elements.editClientNetworkIndicatorSelect, networkIndicator, networkIndicatorVal);
        }
        await this.click(this.elements.addClientSubmitButton);
        await this.waitForSeconds(1);
        await this.waitUntil(this.elements.allCNRPageMainWrapper);
    }

    async addUCLCustomFields (customFields: string[]) {
        await this.click(this.elements.actionIconFirstRow);
        await this.click(this.elements.uclCustomFieldsButton);
        for (const val in customFields) {
            if (customFields.hasOwnProperty(val)) {
                const ele = element(by.xpath('//tbody[' + (parseInt(val, 10) + 1) + ']/tr/td[3]/input'));
                await this.sendValue(ele, customFields[val]);
            }
        }
        await this.waitForSeconds(1);
        await this.click(this.elements.uclCustomSaveButton);
        await this.waitUntilElementIsVisible(this.elements.uclCustomYesButton);
        await this.click(this.elements.uclCustomYesButton);
        await this.waitUntilElementIsVisible(this.elements.uclCustomOkButton);
        await this.click(this.elements.uclCustomOkButton);
        await this.waitUntilElementIsVisible(this.elements.uclCustomBackToClientButton);
        await this.click(this.elements.uclCustomBackToClientButton);
    }
}

