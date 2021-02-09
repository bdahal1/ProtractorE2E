/**
 * Created by i82325 on 9/16/2019.
 */
import { Login } from '../../page-objects/login.po';
import { Welcome } from '../../page-objects/welcome.po';
import { Workflow } from '../../page-objects/cnr/workflow.po';
import { CNRTable } from '../../page-objects/cnr/cnr-table.po';
import { workflowColumns } from './cnr-vars';
import { element, by } from 'protractor';
const filePath = '\\\\hrp.local\\shares\\Departments\\DataOperations\\Share\\DEFT Team\\BibekSource';

describe('CNR workflow Tests', async () => {
    let login: Login;
    let workflow: Workflow;
    let welcome: Welcome;
    let cnrTable: CNRTable;

    beforeAll(async () => {
        login = new Login();
        workflow = new Workflow();
        welcome = new Welcome();
        cnrTable = new CNRTable();
        await login.login();
        await welcome.viewCNRWorkflowPage();
        await workflow.waitUntil(workflow.elements.workflowPageWrapper);
    });

    it('should add new run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await workflow.addNewRunId('AutomationClient1', 'Auto-1', filePath, 'Retrospective');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.waitForSeconds(1);
    });

    it('should perform chase file transfer in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickEnableRerunForProcess('Chase File Transfer');
        await workflow.waitUntilElementIsVisible(workflow.elements.runDetailFileTransferUploadIcon);
        await workflow.click(workflow.elements.runDetailFileTransferUploadIcon);
        await workflow.waitUntilElementIsVisible(workflow.elements.runDetailFileTransferFileNameDropdown);
        const popUpText = await workflow.elements.allPopupTitleText.getText();
        expect(popUpText).toEqual('New File Load');
        await workflow.click(workflow.elements.runDetailFileTransferFileNameDropdown);
        const fileName = 'output.txt';
        await workflow.click(element(by.xpath('//mat-option/span[contains(text(),\'' + fileName + '\')]/../mat-pseudo-checkbox')));
        await workflow.click(workflow.elements.allPopupTitleText);
        await workflow.click(workflow.elements.runDetailExecuteButton);
        await workflow.waitUntilElementIsVisible(workflow.elements.runDetailLoadFilePopupTitleText);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.workflowWaitForStatus('Chase File Transfer', 'Completed');
        await workflow.waitForSeconds(1);
    });

    it('should perform chase file import in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Chase File Import');
        expect(await workflow.verifyH1HeaderValue('Change Iteration')).toEqual(true);
        await workflow.click(workflow.elements.allNoButton);
        await workflow.waitForSeconds(2);
        await workflow.waitUntilElementIsVisible(workflow.elements.executeChaseFilePopupControlTotalTextBox);
        const popUpText = await workflow.elements.allPopupTitleText.getText();
        expect(popUpText).toEqual('Execute Chase File Import');
        await workflow.sendValue(workflow.elements.executeChaseFilePopupControlTotalTextBox, '4000');
        await workflow.click(workflow.elements.runDetailExecuteButton);
        await workflow.waitUntilElementIsVisible(workflow.elements.allYesButton);
        expect(await workflow.verifyH1HeaderValue('Execute Import Process')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);
        expect(await workflow.verifyH1HeaderValue('Chase Control Total Report')).toEqual(true);
        await workflow.waitUntilElementIsVisible(workflow.elements.allPopupCloseIcon);
        await workflow.click(workflow.elements.allPopupCloseIcon);
        await workflow.workflowWaitForStatus('Chase File Import', 'Completed');
        await workflow.waitForSeconds(1);
    });

    it('should perform ucl mapping in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('UCL Mapping');
        expect(await workflow.verifyH1HeaderValue('Run UCL Mapping')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);
        const popUpText = await workflow.elements.allPopupTitleText.getText();
        expect(popUpText).toEqual('Success');

        await workflow.click(workflow.elements.allOkButton);
        await workflow.workflowWaitForStatus('UCL Mapping', 'Completed');
        await workflow.waitForSeconds(1);
    });
    it('should execute npi backfill in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('NPI Backfill');
        expect(await workflow.verifyH1HeaderValue('NPI Backfill Process')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);

        await workflow.workflowWaitForStatus('NPI Backfill', 'Completed');
        await workflow.waitForSeconds(1);
    });

    it('should execute provider address review in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Provider Address Review');
        const popUpText = await workflow.elements.allPopupTitleText.getText();
        expect(popUpText).toEqual('Provider Address Review');

        await workflow.click(workflow.elements.providerAddressNoRadioButton);
        await workflow.click(workflow.elements.runDetailExecuteButton);
        expect(await workflow.verifyH1HeaderValue('Execute Provider Address Review')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);
        await workflow.workflowWaitForStatus('Provider Address Review', 'Generated');
        await workflow.reloadPage();
    });

    it('should execute DQR in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.click(workflow.elements.refreshButton);
        const text = await workflow.clickPlayIconForProcess('DQR Generation', false);
        if (text.length > 0) {
            expect(await workflow.verifyH1HeaderValue('Change Iteration')).toEqual(true);
            await workflow.click(workflow.elements.allNoButton);
        }
        expect(await workflow.verifyH1HeaderValue('Execute DQR Engine')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);
        await workflow.waitForSeconds(360);
        await workflow.workflowWaitForStatus('DQR Generation', 'Completed');
        await workflow.waitForSeconds(1);
    });

    it('should execute Sub-Project Mapping in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Sub-Project Mapping');
        expect(await workflow.verifyH1HeaderValue('Execute Crosswalk Mapping')).toEqual(true);

        await workflow.click(workflow.elements.allYesButton);

        await workflow.waitUntilHide(workflow.elements.loadingIcon);

        await workflow.workflowWaitForStatus('Sub-Project Mapping', 'Completed');
        await workflow.waitForSeconds(1);
    });

    it('should execute Sub-Account Mapping in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Sub-Account Mapping');
        expect(await workflow.verifyH1HeaderValue('Execute Crosswalk Mapping')).toEqual(true);

        await workflow.click(workflow.elements.allYesButton);

        await workflow.waitUntilHide(workflow.elements.loadingIcon);

        await workflow.workflowWaitForStatus('Sub-Account Mapping', 'Completed');
        await workflow.waitForSeconds(1);
    });
    it('should execute Pull RE and CN Data in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Pull RE and CN Data');
        expect(await workflow.verifyH1HeaderValue('Pull RE and CN Data Process')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);

        await workflow.workflowWaitForStatus('Pull RE and CN Data', 'Completed');
        await workflow.waitForSeconds(1);
    });
    it('should execute Pull CN Request ID in the run id', async () => {
        await workflow.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'AutomationClient');
        await workflow.click(workflow.elements.runDetailRunIdLink);
        await workflow.clickPlayIconForProcess('Pull CN Request ID');
        expect(await workflow.verifyH1HeaderValue('Pull CN Request ID Process')).toEqual(true);
        await workflow.click(workflow.elements.allYesButton);
        await workflow.waitUntilHide(workflow.elements.loadingIcon);

        await workflow.workflowWaitForStatus('Pull CN Request ID', 'Completed');
        await workflow.waitForSeconds(1);
    });
    afterAll(async () => {
        await workflow.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Risk Adjustment Metrics and Monitoring System (RAMS)');
    });
});


