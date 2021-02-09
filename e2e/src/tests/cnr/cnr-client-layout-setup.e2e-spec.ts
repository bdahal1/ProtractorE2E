/**
 * Created by i82325 on 9/16/2019.
 */
import { Login } from '../../page-objects/login.po';
import { Welcome } from '../../page-objects/welcome.po';
import { ClientLayoutSetup } from '../../page-objects/cnr/client-layout-setup.po';
import { ClientSetup } from '../../page-objects/cnr/client-setup.po';
import { CNRTable } from '../../page-objects/cnr/cnr-table.po';
import { chaseFileLayoutSetupColumns, nonUCLColumns, nonUCLMappingValues } from './cnr-vars';
import { by, element } from 'protractor';


describe('CNR Client Layout Setup Tests', async () => {
    let login: Login;
    let clientSetup: ClientSetup;
    let clientLayoutSetup: ClientLayoutSetup;
    let welcome: Welcome;
    let cnrTable: CNRTable;

    beforeAll(async () => {
        login = new Login();
        clientSetup = new ClientSetup();
        clientLayoutSetup = new ClientLayoutSetup();
        welcome = new Welcome();
        cnrTable = new CNRTable();
        await login.login();
        await welcome.viewCNRWorkflowPage();
        await clientSetup.waitUntil(clientSetup.elements.workflowPageWrapper);
    });

    it('should add new layout', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        // tslint:disable-next-line: max-line-length
        await clientLayoutSetup.addNewLayout('AutomationClient', 'Exclusion', 'MRA', 'Retrieval & Coding', 'In Area',
            false, 'Comma(,)', 1, 'Pipe ( | )', 'D:\\CNRDocs\\automation\\automationHeader.txt');
        await clientLayoutSetup.waitForSeconds(1);
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should validate ucl columns including client custom column in ucl mapping page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.uclMappingButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.validateUCLMappingButton);
        // validate values
        for (const cols in nonUCLColumns) {
            if (nonUCLColumns.hasOwnProperty(cols)) {
                const elem = await element(by.xpath('//tbody[' + (parseInt(cols, 10) + 1) + ']/tr/td[2]/input'));
                const text = await elem.getAttribute('value');
                expect(text).toEqual(nonUCLColumns[cols]);
            }
        }
    });

    it('should validate UCL mapping when error data is added', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.uclMappingButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.validateUCLMappingButton);
        const popUpText = await clientLayoutSetup.addUCLMapping(['D', 'RandomValue']);
        await clientLayoutSetup.waitForSeconds(1);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(popUpText).toEqual('Error');
    });

    it('should add ucl mapping to layout', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.uclMappingButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.validateUCLMappingButton);
        const popUpText = await clientLayoutSetup.addUCLMapping(nonUCLMappingValues);
        await clientLayoutSetup.waitForSeconds(1);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(popUpText).toEqual('Success');
    });
    it('should edit layout delimiter', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.editLayoutStructureButton);
        const title = clientLayoutSetup.elements.layoutDelimiterTitle.getText();
        await clientLayoutSetup.editFileDelimiterFromPopup('Pipe ( | )', 1);
        expect(title).toEqual('Edit Client Layout Structure');
    });

    it('should Add new column in edit layout columns page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.editLayoutColumnsButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutAddColumnButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.layoutAddColumnButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutContinueButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.layoutContinueButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutColumnNameTextBox);
        await clientLayoutSetup.sendValue(clientLayoutSetup.elements.layoutColumnNameTextBox, 'Test123');
        await clientLayoutSetup.click(clientLayoutSetup.elements.submitButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        const popUpText = await clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(popUpText).toEqual('Success');
    });
    it('should edit column in edit layout columns page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.editLayoutColumnsButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutAddColumnButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.layoutColumnEditButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutColumnNameTextBox);
        await clientLayoutSetup.sendValue(clientLayoutSetup.elements.layoutColumnNameTextBox, 'Test123456');
        // note: change the path of edit and checkbox if Test123 value is changed to smt else
        await clientLayoutSetup.click(clientLayoutSetup.elements.submitButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        const popUpText = await clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(popUpText).toEqual('Success');
    });
    it('should delete column in edit layout columns page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.editLayoutColumnsButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutColumnNameInTableText);
        await clientLayoutSetup.click(clientLayoutSetup.elements.layoutColumnNameCheckbox);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.layoutColumnDeleteAllButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.layoutColumnDeleteAllButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        const popUpText = await clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(popUpText).toEqual('Success');
    });

    it('should set DQR Standard Configuration in DQR configuration page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.dqrConfigurationButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        let title = clientLayoutSetup.elements.allPopupTitleText.getText();
        expect(title).toEqual('Notification');

        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.saveDQRConfigurationButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.saveDQRConfigurationButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.savePopupTitle);
        title = clientLayoutSetup.elements.savePopupTitle.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allYesButton);
        expect(title).toEqual('Save DQR Configuration');

        await clientLayoutSetup.waitUntilHide(clientLayoutSetup.elements.loadingIcon);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        title = clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allOkButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(title).toEqual('Success');
    });

    it('should edit DQR Standard Configuration in DQR configuration page', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.dqrConfigurationButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        let title = clientLayoutSetup.elements.allPopupTitleText.getText();
        expect(title).toEqual('Notification');

        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        // only clicking master member is null check to edit
        await clientLayoutSetup.click(clientLayoutSetup.elements.dqrMasterMemberIsNullCheckbox);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.saveDQRConfigurationButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.saveDQRConfigurationButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.savePopupTitle);
        title = clientLayoutSetup.elements.savePopupTitle.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allYesButton);
        expect(title).toEqual('Save DQR Configuration');

        await clientLayoutSetup.waitUntilHide(clientLayoutSetup.elements.loadingIcon);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        title = clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allOkButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(title).toEqual('Success');
    });

    it('should add hardcoded sub project value', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.subAccountSubProjectButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.subAccountSubProjectHardCodedTextBox);
        await clientLayoutSetup.sendValue(clientLayoutSetup.elements.subAccountSubProjectHardCodedTextBox, '\'900\'');
        await clientLayoutSetup.click(clientLayoutSetup.elements.subAccountSubProjectSaveConfigButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.savePopupTitle);

        let title = clientLayoutSetup.elements.savePopupTitle.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allYesButton);
        expect(title).toEqual('Save Crosswalk/Non Crosswalk Layout');

        await clientLayoutSetup.waitUntilHide(clientLayoutSetup.elements.loadingIcon);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        title = clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allOkButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(title).toEqual('Success');
    });

    it('should add hardcoded sub account value', async () => {
        await clientLayoutSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'AutomationClient');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False');
        await clientLayoutSetup.click(clientLayoutSetup.elements.actionIconFirstLayoutRow);
        await clientLayoutSetup.click(clientLayoutSetup.elements.subAccountSubProjectButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.subAccountMappingTabButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.subAccountMappingTabButton);

        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.subAccountSubProjectHardCodedTextBox);
        await clientLayoutSetup.sendValue(clientLayoutSetup.elements.subAccountSubProjectHardCodedTextBox, '\'800\'');
        await clientLayoutSetup.click(clientLayoutSetup.elements.subAccountSubProjectSaveConfigButton);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.savePopupTitle);

        let title = clientLayoutSetup.elements.savePopupTitle.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allYesButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allYesButton);
        expect(title).toEqual('Save Crosswalk/Non Crosswalk Layout');

        await clientLayoutSetup.waitUntilHide(clientLayoutSetup.elements.loadingIcon);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allPopupTitleText);
        title = clientLayoutSetup.elements.allPopupTitleText.getText();
        await clientLayoutSetup.waitForMilliSeconds(500);
        await clientLayoutSetup.waitUntilElementIsVisible(clientLayoutSetup.elements.allOkButton);
        await clientLayoutSetup.click(clientLayoutSetup.elements.allOkButton);
        expect(title).toEqual('Success');
    });

    afterAll(async () => {
        await clientLayoutSetup.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Risk Adjustment Metrics and Monitoring System (RAMS)');
    });
});
