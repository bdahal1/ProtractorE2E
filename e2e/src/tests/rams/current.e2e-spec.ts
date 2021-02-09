import { Login } from '../../page-objects/login.po';
import { Current } from '../../page-objects/rams/current.po';
import { by, element } from 'protractor';
import { Welcome } from '../../page-objects/welcome.po';

const xpath = require('../../data/RAPS.json');

describe('RAMS Current page Tests', async () => {
    let login: Login;
    let current: Current;
    let welcome: Welcome;

    beforeAll(async () => {
        login = new Login();
        current = new Current();
        welcome = new Welcome();
        await login.login();
        await welcome.viewRAPSCurrentPage();
        await current.waitUntil(current.elements.currentPageWrapper);
    });

    xpath.forEach(item => {
        it('should click on ' + item.xpath, async () => {
            await current.click(current.elements.currentPageLink);
            await welcome.viewRAPSCurrentPage();
            await current.waitUntil(current.elements.currentPageWrapper);
            const ele = await element(by.xpath(item.xpath));
            const j = item.j;
            await current.waitForMilliSeconds(500);
            const linkText = await ele.getText();
            await current.click(ele);
            await current.waitUntil(current.elements.allPageMainTableWrapper);
            await current.waitForMilliSeconds(500);
            if (j <= 30 && j !== 10 && j !== 14 && j !== 18 && j !== 22 && j !== 27 && j !== 30) {
                const drillValue = await current.elements.allPageTotalCountText.getText();
                expect(linkText).toEqual(drillValue.split(' ')[0]);
            } else if (j === 10 || j === 18 || j === 22 || j === 27 || j === 30) {
                const drillValue = await current.elements.allPageTotalCountText.getText();
                expect('1').toEqual(drillValue.split(' ')[0]);
            } else if (j === 14) {
                const drillValue = await current.elements.fileCountColumnText.getText();
                expect(linkText).toEqual(drillValue);
            } else if (j === 31) {
                const drillValue = await current.elements.allPageTotalCountText.getText();
                expect(linkText).toEqual(drillValue.split(' ')[0]);
            } else if (j > 31 && j <= 64) {
                const drillValue = await current.elements.batchCountColumnText.getText();
                expect(linkText).toEqual(drillValue);
            } else {
                const drillValue = await current.elements.allPageTotalCountText.getText();
                // tslint:disable-next-line
                expect(parseInt(linkText) <= parseInt(drillValue.split(' ')[0])).toEqual(true);
            }

        });
    });

    it('should navigate all links of current pages navigation panel', async () => {
        await current.navigateAllRAPSPagesUsingSidePanel();
        await current.waitForSeconds(1);
        await current.click(current.elements.currentPageLink);
        await welcome.viewRAPSCurrentPage();
        await current.waitUntil(current.elements.currentPageWrapper);
    });

    it('should reload page when Reload button is clicked', async () => {
        await current.click(current.elements.currentPageLink);
        await welcome.viewRAPSCurrentPage();
        await current.click(current.elements.reloadButton);
        await current.waitUntilHide(current.elements.loadingIcon);
    });

    afterAll(async () => {
        await current.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Welcome to RAMS');
    });
});
