/**
 * Created by i82325 on 9/16/2019.
 */
import { Login } from '../page-objects/login.po';
import { Current } from '../page-objects/current.po';
import { by, element } from 'protractor';
import { Welcome } from '../page-objects/welcome.po';


describe('RAMS Write', async () => {
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
        const rowCount = await current.countTotalRows();
        const colCount = await current.countTotalColumns();
        const fs = require('fs');
        let text = '[';
        let outputFilename = './e2e/src/data/RAPS.json';
        if (process.cwd().toString().includes('e2e')) {
            outputFilename = outputFilename.replace('e2e/', '');
        }
        for (let i = 1; i <= rowCount; i++) {
            for (let j = 3; j <= colCount; j++) {
                // tslint:disable-next-line: max-line-length
                const els = await element(by.xpath(current.locators.tableDataPath + '[' + i + ']/td[' + j + ']/a[not(contains(@class,\'disable-link\'))]')).isPresent();
                if (els) {
                    // tslint:disable-next-line: max-line-length
                    text = text + '{"xpath":"' + current.locators.tableDataPath + '[' + i + ']/td[' + j + ']/a[not(contains(@class,\'disable-link\'))]' + '","j":' + j + '},';
                }
            }
        }

        fs.writeFile(outputFilename, text.replace(/.$/, ']'), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('JSON saved to ' + outputFilename);
            }
            // });
            // // await current.switchToEDS();
            // // await current.waitUntil(current.elements.currentPageWrapper);
            // // text = '[';
            // // outputFilename = './e2e/src/data/EDS.json';
            // // if (process.cwd().toString().includes('e2e')) {
            // //     outputFilename = outputFilename.replace('e2e/', '');
            // // }
            // // for (let i = 1; i <= rowCount; i++) {
            // //     for (let j = 3; j <= colCount; j++) {
            // //         // tslint:disable-next-line: max-line-length
            // //         const els = await element(by.xpath(current.locators.tableDataPath +
            // // '[' + i + ']/td[' + j + ']/a[not(contains(@class,\'disable-link\'))]')).isPresent();
            // //         if (els) {
            // //             // tslint:disable-next-line: max-line-length
            // //             text = text + '{"xpath":"' + current.locators.tableDataPath +
            // // '[' + i + ']/td[' + j + ']/a[not(contains(@class,\'disable-link\'))]' + '","j":' + j + '},';
            // //         }
            // //     }
            // // }
            //
            // fs.writeFile(outputFilename, text.replace(/.$/, ']'), function (err) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log('JSON saved to ' + outputFilename);
            //     }
        });
    });

    it('write To file', async () => {
        console.log('Xpath written in json file');
    });

    afterAll(async () => {
        await current.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Welcome to RAMS');
    });
});
