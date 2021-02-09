/**
 * Created by i82325 on 9/16/2019.
 */
import { Login } from '../../page-objects/login.po';
import { Welcome } from '../../page-objects/welcome.po';
import { ClientSetup } from '../../page-objects/cnr/client-setup.po';
import { CNRTable } from '../../page-objects/cnr/cnr-table.po';
import {
    clientSetupColumns,
    chaseFileLayoutSetupColumns,
    createdDate,
    extractConfigurationColumns,
    workflowColumns
} from './cnr-vars';

describe('CNR Generic Tests for all Pages', async () => {
    let login: Login;
    let clientSetup: ClientSetup;
    let welcome: Welcome;
    let cnrTable: CNRTable;

    beforeAll(async () => {
        login = new Login();
        clientSetup = new ClientSetup();
        welcome = new Welcome();
        cnrTable = new CNRTable();
        await login.login();
        await welcome.viewCNRWorkflowPage();
        await clientSetup.waitForSeconds(5);
        await clientSetup.waitUntil(clientSetup.elements.workflowPageWrapper);
    });

    it('should navigate all links of cnr navigation panel', async () => {
        await clientSetup.navigateAllCNRPagesUsingSidePanel();
        await clientSetup.waitForSeconds(1);
        await clientSetup.click(clientSetup.elements.workflowPageLink);
        await clientSetup.waitForSeconds(1);
        await welcome.viewCNRWorkflowPage();
        await clientSetup.waitUntil(clientSetup.elements.workflowPageWrapper);
    });

    it('should match columns in WorkFlow page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.checkForColumnNames(workflowColumns);
    });

    it('should match columns in Client Setup page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await cnrTable.checkForColumnNames(clientSetupColumns);
    });

    it('should match columns in Chase File Layout Setup page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.checkForColumnNames(chaseFileLayoutSetupColumns);
    });

    it('should match columns in Extract Configuration page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Extract Configuration');
        await cnrTable.checkForExtractConfigurationColumnNames(extractConfigurationColumns);
    });

    it('should apply filter in Workflow Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Run ID', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Created Date', createdDate);
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should apply wrong filter in Workflow Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('WorkFlow');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'jpt', true);
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Run ID', 'Aetna', true);
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Created Date', createdDate, true);
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should clear filter in Workflow Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('WorkFlow');
        const beforeDrillValue = await cnrTable.elements.cnrWorkflowTableTotalCountText.getText();
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Run ID', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(workflowColumns, 'Created Date', createdDate);
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
        const afterDrillValue = await cnrTable.elements.cnrWorkflowTableTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    it('should apply filter in Client Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Description', 'Duals');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'File Type Details', 'Suspecting');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Created Date', '2020-02-24');
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should apply wrong filter in Client Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'jpt', true);
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Description', 'Duals', true);
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'File Type Details', 'Suspecting', true);
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Created Date', '2020-02-25', true);
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should clear filter in Client Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        const beforeDrillValue = await cnrTable.elements.cnrTableTotalCountText.getText();
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Description', 'Duals');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'File Type Details', 'Suspecting');
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Created Date', '2020-02-24');
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
        const afterDrillValue = await cnrTable.elements.cnrTableTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    it('should apply filter in Chase File Layout Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'File Type Detail', 'Suspecting');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Risk Adjustment LOB', 'MRA');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Network Indicator', 'In Area');
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should apply wrong filter in Chase File Layout Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'jpt', true);
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'File Type Detail', 'Suspecting', true);
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Risk Adjustment LOB', 'MRA', true);
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'UCL Standard Layout', 'False', true);
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });

    it('should clear filter in Chase File Layout Setup Page', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Chase File Layout Setup');
        const beforeDrillValue = await cnrTable.elements.cnrTableTotalCountText.getText();
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Client Name', 'Aetna');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'File Type Detail', 'Suspecting');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Risk Adjustment LOB', 'MRA');
        await cnrTable.applyFilterAndVerifyResult(chaseFileLayoutSetupColumns, 'Network Indicator', 'In Area');
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
        const afterDrillValue = await cnrTable.elements.cnrTableTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    afterAll(async () => {
        await clientSetup.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Risk Adjustment Metrics and Monitoring System (RAMS)');
    });
});

