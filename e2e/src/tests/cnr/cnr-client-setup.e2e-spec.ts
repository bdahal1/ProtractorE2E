/**
 * Created by i82325 on 9/16/2019.
 */
import { Login } from '../../page-objects/login.po';
import { Welcome } from '../../page-objects/welcome.po';
import { ClientSetup } from '../../page-objects/cnr/client-setup.po';
import { CNRTable } from '../../page-objects/cnr/cnr-table.po';
import { clientSetupColumns } from './cnr-vars';

describe('CNR Client Setup Tests', async () => {
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
        await clientSetup.waitUntil(clientSetup.elements.workflowPageWrapper);
    });

    it('should add new client', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await clientSetup.waitForSeconds(1);
        let count;
        try {
            count = await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient');
        } catch (e) {
            count = 0;
        }
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        // tslint:disable-next-line:  max-line-length
        await clientSetup.addNewClient('None', 'AutomationClient' + (count + 1), 'Automation Client desc', 'MRA', 'Exclusion', 'Retrieval & Coding', 'In Area');
        await clientSetup.waitForSeconds(1);
        await clientSetup.waitUntil(clientSetup.elements.workflowPageWrapper);
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient' + (count + 1));
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
        await clientSetup.reloadPage();
    });

    it('should edit existing client', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await clientSetup.waitForSeconds(1);
        let count;
        try {
            count = await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient');
        } catch (e) {
            count = 0;
        }
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient' + count);
        await clientSetup.editExistingClient('', '', 'Automation Client desc1', 'CRA', 'ChaseList- Client', 'Retrieval Only', 'OOA');
        await clientSetup.waitForSeconds(1);
        await clientSetup.reloadPage();
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient' + count);
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Network Indicators', 'OOA');
        await cnrTable.waitUntil(cnrTable.elements.clearFilterButton);
        await cnrTable.click(cnrTable.elements.clearFilterButton);
        await cnrTable.clickClearFilterAndVerify();
    });
    it('should add custom fields', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await clientSetup.waitForSeconds(1);
        let count;
        try {
            count = await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient');
        } catch (e) {
            count = 0;
        }
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient' + count);
        await clientSetup.addUCLCustomFields(['PBG_NUMBER', 'PBG_STATUS', 'ProviderTerritory', '', '', 'Custom1', 'Custom2']);
    });

    it('should edit custom fields', async () => {
        await clientSetup.navigateToPageFromSidePanelCNR('Client Setup');
        await clientSetup.waitForSeconds(1);
        let count;
        try {
            count = await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient');
        } catch (e) {
            count = 0;
        }
        await cnrTable.applyFilterAndVerifyResult(clientSetupColumns, 'Client Name', 'AutomationClient' + count);
        await clientSetup.addUCLCustomFields(['PBG_NUMBER', 'PBG_STATUS', 'ProviderTerritory', '', '', '', '']);
    });


    afterAll(async () => {
        await clientSetup.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Risk Adjustment Metrics and Monitoring System (RAMS)');
    });
});
