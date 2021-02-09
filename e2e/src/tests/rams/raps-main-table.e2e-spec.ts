import { Login } from '../../page-objects/login.po';
import { Current } from '../../page-objects/rams/current.po';
import { MainTable } from '../../page-objects/rams/main-table.po';
import { Welcome } from '../../page-objects/welcome.po';

describe('RAMS RAPS Main Table Test', () => {
    let login: Login;
    let current: Current;
    let welcome: Welcome;
    let mainTable: MainTable;
    const currentIssueDate = '2019-09-24';

    const uploadDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Line Count',
        'Uploaded Date',
        'Import Started',
        'Import Finished',
        'Processing Minutes',
        'File Name',
        'File Type Name',
        'Analyst Name',
        'Comment'
    ];
    const failedUploadDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'File Count',
        'Analyst Name',
        'Comment'
    ];
    const folderDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Duration Hours',
        'Folder Name',
        'File Name',
        'Folder Path',
        'Date Created',
        'Current Date',
        'Analyst Name',
        'Comment'
    ];
    const jobDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Duration Hrs',
        'Analyst Name',
        'Comment'
    ];
    const batchDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Batch Count',
        'Oldest Batch Create Date',
        'Diag Count',
        'Analyst Name',
        'Comment'
    ];
    const processMergeDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Start Date',
        'End Date',
        'Run Time',
        'Analyst Name',
        'Comment'
    ];
    const processRPCDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Current Run Time',
        'Last Run Start Date',
        'Last Run End Date',
        'Analyst Name',
        'Comment'
    ];
    const processCNDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Run Time',
        'Start Date',
        'End Date',
        'Analyst Name',
        'Comment'
    ];
    const processCSDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Failed Count',
        'Last Failed Date',
        'Last Run Date',
        'Enabled',
        'Issue Summary Flag',
        'Analyst Name',
        'Comment'
    ];
    const outboundDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'File Name',
        'Log Date',
        'Analyst Name',
        'Comment'
    ];
    const fileQCDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'File Name',
        'Line Count',
        'Analyst Name',
        'Comment'
    ];
    const returnQCDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Imported Date',
        'Plan Id',
        'File Id',
        'Imported Date',
        'Line Count',
        'Analyst Name',
        'Comment'
    ];
    const batchQCDetailsColumns = [
        'Client',
        'Issue',
        'Issue Status',
        'Issue Date',
        'Issue Description',
        'Plan Id',
        'Exported File Id',
        'Source',
        'Imported Date',
        'Exported Date',
        'Line Count',
        'Analyst Name',
        'Comment'
    ];

    beforeAll(async () => {
        login = new Login();
        welcome = new Welcome();
        current = new Current();
        mainTable = new MainTable();
        await login.login();
        await welcome.viewRAPSCurrentPage();
        await current.waitUntil(current.elements.currentPageWrapper);
    });

    it('should match columns in Upload History page', async () => {
        await current.navigateToPageFromSidePanelRAPS('Upload History');
        await mainTable.checkForColumnNames(uploadDetailsColumns);
    });

    it('should match columns in Failed Upload History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Failed Upload History');
        await mainTable.checkForColumnNames(failedUploadDetailsColumns);
    });

    it('should match columns in Folder History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Folder History');
        await mainTable.checkForColumnNames(folderDetailsColumns);
    });

    it('should match columns in Job History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Job History');
        await mainTable.checkForColumnNames(jobDetailsColumns);
    });

    it('should match columns in Batch History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Batch History');
        await mainTable.checkForColumnNames(batchDetailsColumns);
    });

    it('should match columns in Process Merge History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process Merge History');
        await mainTable.checkForColumnNames(processMergeDetailsColumns);
    });

    it('should match columns in Process RPC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process RPC History');
        await mainTable.checkForColumnNames(processRPCDetailsColumns);
    });

    it('should match columns in Process CN History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process CN History');
        await mainTable.checkForColumnNames(processCNDetailsColumns);
    });

    it('should match columns in Process CS History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process CS History');
        await mainTable.checkForColumnNames(processCSDetailsColumns);
    });

    it('should match columns in Outbound History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Outbound History');
        await mainTable.checkForColumnNames(outboundDetailsColumns);
    });

    it('should match columns in File QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('File QC History');
        await mainTable.checkForColumnNames(fileQCDetailsColumns);
    });

    it('should match columns in RAPS Return QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('RAPS Return QC History');
        await mainTable.checkForColumnNames(returnQCDetailsColumns);
    });

    it('should match columns in Batch QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Batch QC History');
        await mainTable.checkForColumnNames(batchQCDetailsColumns);
    });

    // upload detail page tests
    it('should apply filter in Upload History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Upload History');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue', 'Successfully Uploaded');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Upload History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Upload History');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Client', 'jpt', true);
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Upload History', async () => {
        await mainTable.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Upload History');
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue', 'Successfully Uploaded');
        await mainTable.applyFilterAndVerifyResult(uploadDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // failed upload page tests
    it('should apply filter in Failed Upload History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Failed Upload History');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Client', 'Coventry');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue', 'File Failed Upload');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Failed Upload History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Failed Upload History');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Client', 'Coventryjp', true);
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue', 'File Failed Upload', true);
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Failed Upload History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Failed Upload History');
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Client', 'Coventry');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue', 'File Failed Upload');
        await mainTable.applyFilterAndVerifyResult(failedUploadDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // folder detail page tests
    it('should apply filter in Folder History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Folder History');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Client', 'Anthem');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue', 'Past 1hr Threshold');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Folder History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Folder History');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Folder History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Folder History');
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Client', 'Anthem');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue', 'Past 1hr Threshold');
        await mainTable.applyFilterAndVerifyResult(folderDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // job detail page tests
    it('should apply filter in Job History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Job History');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'Anthem');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'Run Import Enabled');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Job History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Job History');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Job History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Job History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Client', 'Anthem');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue', 'Run Import Enabled');
        await mainTable.applyFilterAndVerifyResult(jobDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // batch detail page tests
    it('should apply filter in Batch History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Batch History');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue', 'Batches Merged');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Batch History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Batch History');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue', 'Batches Merged', true);
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Batch History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Batch History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue', 'Batches Merged');
        await mainTable.applyFilterAndVerifyResult(batchDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // process Merge detail page tests
    it('should apply filter in Process Merge History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process Merge History');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue', 'Batch Status - Merged');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Process Merge History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process Merge History');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue', 'Batch Status - Merged', true);
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Process Merge History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process Merge History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue', 'Batch Status - Merged');
        await mainTable.applyFilterAndVerifyResult(processMergeDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // process rpc detail page tests
    it('should apply filter in Process RPC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process RPC History');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue', 'RPC Completed');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Process RPC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process RPC History');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue', 'Batch Status - Merged', true);
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Process RPC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process RPC History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue', 'RPC Completed');
        await mainTable.applyFilterAndVerifyResult(processRPCDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // process cn detail page tests
    it('should apply filter in Process RPC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process CN History');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue', 'CN SSIS Completed');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Process CN History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process CN History');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue', 'Batch Status - Merged', true);
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Process CN History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process CN History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue', 'CN SSIS Completed');
        await mainTable.applyFilterAndVerifyResult(processCNDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // process CS detail page tests
    it('should apply filter in Process CS History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Process CS History');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue', 'Job Disabled');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue Date', currentIssueDate);
    });

    it('should apply wrong filter in Process CS History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process CS History');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue', 'Job Disabled', true);
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Process CS History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Process CS History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue', 'Job Disabled');
        await mainTable.applyFilterAndVerifyResult(processCSDetailsColumns, 'Issue Date', currentIssueDate);
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Outbound status details page tests
    it('should apply filter in Outbound History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Outbound History');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Client', 'CCHP');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue', 'File Exported');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue Date', '2019-12-06');
    });

    it('should apply wrong filter in Outbound History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Outbound History');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue', 'Job Disabled', true);
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue Date', '2019-10-15', true);
    });

    it('should clear filter in Outbound History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Outbound History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Client', 'CCHP');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue', 'File Exported');
        await mainTable.applyFilterAndVerifyResult(outboundDetailsColumns, 'Issue Date', '2019-12-06');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });
    // File QC status details page tests
    it('should apply filter in File QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('File QC History');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue', '31 Day Rule');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue Date', '2019-10-17');
    });

    it('should apply wrong filter in File QC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('File QC History');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Client', 'JPT', true);
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue', 'Job Disabled', true);
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue Date', '2019-10-16', true);
    });

    it('should clear filter in File QC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('File QC History');
        await mainTable.waitForMilliSeconds(1000);
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue', '31 Day Rule');
        await mainTable.applyFilterAndVerifyResult(fileQCDetailsColumns, 'Issue Date', '2019-10-17');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // return qc detail page tests
    it('should apply filter in RAPS Return QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('RAPS Return QC History');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue', '502');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue Date', '2019-12-17');
    });

    it('should apply wrong filter in RAPS Return QC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('RAPS Return QC History');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Client', 'jpt', true);
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in RAPS Return QC History', async () => {
        await mainTable.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('RAPS Return QC History');
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Client', 'REG');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue', '502');
        await mainTable.applyFilterAndVerifyResult(returnQCDetailsColumns, 'Issue Date', '2019-12-17');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });

    // Batch qc detail page tests
    it('should apply filter in Batch QC History', async () => {
        await current.navigateToPageFromSidePanelRAPS('Batch QC History');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue', '31 Day Rule');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue Date', '2019-10-25');
    });

    it('should apply wrong filter in Batch QC History', async () => {
        await current.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Batch QC History');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Client', 'jpt', true);
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue', 'Successfully Uploadeded', true);
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue Date', currentIssueDate, true);
    });

    it('should clear filter in Batch QC History', async () => {
        await mainTable.reloadPage();
        await current.navigateToPageFromSidePanelRAPS('Batch QC History');
        const beforeDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Client', 'Aetna');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue', '31 Day Rule');
        await mainTable.applyFilterAndVerifyResult(batchQCDetailsColumns, 'Issue Date', '2019-10-25');
        await mainTable.waitUntil(mainTable.elements.clearFilterButton);
        await mainTable.click(mainTable.elements.clearFilterButton);
        await mainTable.clickClearFilterAndVerify();
        const afterDrillValue = await mainTable.elements.allPageTotalCountText.getText();
        expect(afterDrillValue.split(' ')[0]).toEqual(beforeDrillValue.split(' ')[0]);
    });
    afterAll(async () => {
        await current.logout();
    });
});
