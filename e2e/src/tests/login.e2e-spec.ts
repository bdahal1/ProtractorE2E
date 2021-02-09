import { Login } from '../page-objects/login.po';
import { Current } from '../page-objects/rams/current.po';
import { Welcome } from '../page-objects/welcome.po';

describe('RAMS Login Test', () => {
    let login: Login;
    let current: Current;
    let welcome: Welcome;

    beforeEach(async () => {
        login = new Login();
        current = new Current();
        welcome = new Welcome();
        await login.openPage();
        await login.waitUntil(login.elements.loginPageWrapper);
    });

    it('should show error for invalid credentials', async () => {
        await login.fillLoginForm(login.invalidCredentials.username, login.invalidCredentials.password);
        await login.click(login.elements.loginSubmitButton);
        await login.waitUntil(login.elements.errorMessage);
        expect(login.elements.errorMessage.getText()).toEqual('USER NOT FOUND: INVALID');
    });

    it('should show error for correct username but invalid password', async () => {
        await login.fillLoginForm(login.validCredentials.username, login.invalidCredentials.password);
        await login.click(login.elements.loginSubmitButton);
        await login.waitUntil(login.elements.errorMessage);
        expect(login.elements.errorMessage.getText()).toEqual('INVALID CREDENTIALS');
    });

    it('should show "field is required" message for username and password', async () => {
        await login.click(login.elements.loginUsernameInput);
        await login.click(login.elements.loginPasswordInput);
        expect(login.elements.loginUsernameRequiredText.getText()).toEqual('Username is required!');
        await login.click(login.elements.loginUsernameInput);
        expect(login.elements.loginPasswordRequiredText.getText()).toEqual('Password is required!');
    });

    it('should show current page for valid credentials', async () => {
        await login.fillLoginForm(login.validCredentials.username, login.validCredentials.password);
        await login.click(login.elements.loginSubmitButton);
        await current.waitUntil(welcome.elements.viewRAPSButton);
        await current.logout();
    });

    it('should show welcome page for valid credentials and logout successfully', async () => {
        await login.openPage();
        await login.waitUntil(login.elements.loginPageWrapper);
        await login.fillLoginForm(login.validCredentials.username, login.validCredentials.password);
        await login.click(login.elements.loginSubmitButton);
        await current.waitUntil(welcome.elements.viewRAPSButton);
        await current.logout();
        await login.waitUntil(login.elements.loginPageWrapper);
        expect(login.elements.welcomeHeader.getText()).toEqual('Risk Adjustment Metrics and Monitoring System (RAMS)');
    });
});
