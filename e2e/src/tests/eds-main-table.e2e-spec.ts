import {Login} from '../page-objects/login.po';
import {Current} from '../page-objects/current.po';
import {MainTable} from '../page-objects/main-table.po';
import {Welcome} from '../page-objects/welcome.po';

describe('RAMS EDS Main Table Test', () => {
    let login: Login;
    let current: Current;
    let welcome: Welcome;
    let mainTable: MainTable;
    const currentIssueDate = '2019-03-07';

    const jobDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Failed Count',
        'Last Failed Date',
        'Enabled',
        'Issue Summary Flag',
        'Analyst Name',
        'Comment'
    ];

    const fileStatusesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Submit Count',
        'Create Date Time',
        'Final Import Id',
        'Final Import Status Description',
        'Final Import Status Id',
        'Archive Path',
        'Analyst Name',
        'Comment'
    ];

    const encounterStatusesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Status Count',
        'Analyst Name',
        'Comment'
    ];

    const invalidHPlanDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'File Date',
        'Encounter Count',
        'Analyst Name',
        'Comment'
    ];

    const missingCMSResponsesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Count',
        'File Submission Date',
        'Isa013',
        'Transmission Type',
        'Analyst Name',
        'Comment'
    ];

    const supEncounterStatusesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Status Count',
        'Analyst Name',
        'Comment'
    ];

    const supMissingCMSResponsesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Count',
        'File Submission Date',
        'Isa013',
        'Transmission Type',
        'Analyst Name',
        'Comment'
    ];

    const statusStuckResponsesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Count',
        'File Submission Date',
        'Isa013',
        'Transmission Type',
        'Analyst Name',
        'Comment'
    ];

    const inboundFolderDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Duration Hours',
        'Folder Name',
        'Name',
        'Folder Path',
        'Current Date',
        'Analyst Name',
        'Comment'
    ];

    const supInvalidHPlanDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Count',
        'File Date',
        'Analyst Name',
        'Comment'
    ];

    const supStatusStuckResponsesDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Encounter Count',
        'File Submission Date',
        'Isa013',
        'Transmission Type',
        'Analyst Name',
        'Comment'
    ];

    beforeAll(async() => {
        login = new Login();
        welcome = new Welcome();
        current = new Current();
        mainTable = new MainTable();
        await login.login();
        await welcome.viewEDSCurrentPage();
        await current.waitUntil(current.elements.currentPageWrapper);
    });

    it('should match columns in Job History', async() => {
        await current.navigateToPageFromSidePanelEDS('Job History');
        await mainTable.checkForColumnNames(jobDetailsColumns);
    });

    it('should match columns in File Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('File Statuses History');
        await mainTable.checkForColumnNames(fileStatusesDetailsColumns);
    });

    it('should match columns in Encounter Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Encounter Statuses History');
        await mainTable.checkForColumnNames(encounterStatusesDetailsColumns);
    });

    it('should match columns in Invalid H Plan History', async() => {
        await current.navigateToPageFromSidePanelEDS('Invalid H Plan History');
        await mainTable.checkForColumnNames(invalidHPlanDetailsColumns);
    });

    it('should match columns in Missing CMS Responses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Missing CMS Responses History');
        await mainTable.checkForColumnNames(missingCMSResponsesDetailsColumns);
    });

    it('should match columns in Sup Encounter Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Encounter Statuses History');
        await mainTable.checkForColumnNames(supEncounterStatusesDetailsColumns);
    });

    it('should match columns in Sup Missing CMS Resp History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Missing CMS Resp History');
        await mainTable.checkForColumnNames(supMissingCMSResponsesDetailsColumns);
    });

    it('should match columns in Status Stuck Responses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Status Stuck Responses History');
        await mainTable.checkForColumnNames(statusStuckResponsesDetailsColumns);
    });

    it('should match columns in Inbound Folder History', async() => {
        await current.navigateToPageFromSidePanelEDS('Inbound Folder History');
        await mainTable.checkForColumnNames(inboundFolderDetailsColumns);
    });

    it('should match columns in Sup Invalid H Plan History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Invalid H Plan History');
        await mainTable.checkForColumnNames(supInvalidHPlanDetailsColumns);
    });

    it('should match columns in Sup Status Stuck Resp History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Status Stuck Resp History');
        await mainTable.checkForColumnNames(supStatusStuckResponsesDetailsColumns);
    });

    // job detail page tests
    it('should apply filter in Job History', async() => {
        await current.navigateToPageFromSidePanelEDS('Job History');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'AETIH');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'None');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Job History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Job History');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Job History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Job History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'AETIH');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'None');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // file status detail page tests
    it('should apply filter in File Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('File Statuses History');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Client', 'AETIH');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue', 'Failed Structure');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue Date', '2019-03-05');
    });

    it('should apply wrong filter in File Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('File Statuses History');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in File Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('File Statuses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Client', 'AETIH');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue', 'Failed Structure');
        await mainTable.applyFilterAndVerifyResult(fileStatusesDetailsColumns, 'Issue Date', '2019-03-05');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Encounter status detail page tests
    it('should apply filter in Encounter Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Encounter Statuses History');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Encounter Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Encounter Statuses History');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Encounter Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Encounter Statuses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(encounterStatusesDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // invalid H Plan detail page tests
    it('should apply filter in Invalid H Plan History', async() => {
        await current.navigateToPageFromSidePanelEDS('Invalid H Plan History');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue', 'Invalid H-Plans');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Invalid H Plan History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Invalid H Plan History');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Invalid H Plan History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Invalid H Plan History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue', 'Invalid H-Plans');
        await mainTable.applyFilterAndVerifyResult(invalidHPlanDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // missing cms responses detail page tests
    it('should apply filter in Missing CMS Responses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Missing CMS Responses History');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue', 'Missing 999');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue Date', '2019-03-06');
    });

    it('should apply wrong filter in Missing CMS Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Missing CMS Responses History');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Missing CMS Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Missing CMS Responses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue', 'Missing 999');
        await mainTable.applyFilterAndVerifyResult(missingCMSResponsesDetailsColumns, 'Issue Date', '2019-03-06');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Sup Encounter Statuses  detail page tests
    it('should apply filter in Sup Encounter Statuses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Encounter Statuses History');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Sup Encounter Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Encounter Statuses History');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Sup Encounter Statuses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Encounter Statuses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(supEncounterStatusesDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Sup Missing CMS Responses detail page tests
    it('should apply filter in Sup Missing CMS Resp History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Missing CMS Resp History');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue', 'Missing 999');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue Date', '2019-03-06');
    });

    it('should apply wrong filter in Sup Missing CMS Resp History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Missing CMS Resp History');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Sup Missing CMS Resp History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Missing CMS Resp History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue', 'Missing 999');
        await mainTable.applyFilterAndVerifyResult(supMissingCMSResponsesDetailsColumns, 'Issue Date', '2019-03-06');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Status Stuck Responses History page tests
    it('should apply filter in Status Stuck Responses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Status Stuck Responses History');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue', '277 Status Stuck');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Status Stuck Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Status Stuck Responses History');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Status Stuck Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Status Stuck Responses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue', '277 Status Stuck');
        await mainTable.applyFilterAndVerifyResult(statusStuckResponsesDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // inbound folder detail page tests
    it('should apply filter in Inbound Folder History', async() => {
        await current.navigateToPageFromSidePanelEDS('Inbound Folder History');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue', 'Past 1hr Threshold');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue Date', '2019-03-06');
    });

    it('should apply wrong filter in Inbound Folder History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Inbound Folder History');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Inbound Folder History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Inbound Folder History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue', 'Past 1hr Threshold');
        await mainTable.applyFilterAndVerifyResult(inboundFolderDetailsColumns, 'Issue Date', '2019-03-06');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // sup invalid H Plan detail page tests
    it('should apply filter in Sup Invalid H Plan History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Invalid H Plan History');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Sup Invalid H Plan History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Invalid H Plan History');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Sup Invalid H Plan History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Invalid H Plan History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue', 'Exceeds time threshold >24hrs');
        await mainTable.applyFilterAndVerifyResult(supInvalidHPlanDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Sup Status Stuck Responses History page tests
    it('should apply filter in Sup Status Stuck Responses History', async() => {
        await current.navigateToPageFromSidePanelEDS('Sup Status Stuck Responses History');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue', '277 Status Stuck');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue Date', '2019-03-07');
    });

    it('should apply wrong filter in Sup Status Stuck Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Status Stuck Responses History');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Sup Status Stuck Responses History', async() => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelEDS('Sup Status Stuck Responses History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue', '277 Status Stuck');
        await mainTable.applyFilterAndVerifyResult(supStatusStuckResponsesDetailsColumns, 'Issue Date', '2019-03-07');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    afterAll(async() => {
        await current.logout();
    });
});
