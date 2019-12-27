import { by, element } from 'protractor';
import { BasePage } from './base.po';

export class Login extends BasePage {
    constructor() {
        super({});
        this.elements = {
            // login page
            loginPageWrapper: element(by.css('.login-wrapper')),
            loginUsernameInput: element(by.css('.login-wrapper input[name=usernamee]')),
            loginUsernameRequiredText: element(by.xpath('//span[contains(text(),\'Username is required!\')]')),
            loginPasswordInput: element(by.css('.login-wrapper input[name=passwordd]')),
            loginPasswordRequiredText: element(by.xpath('//span[contains(text(),\'Password is required!\')]')),
            loginSubmitButton: element(by.css('.login-wrapper .btn.btn-success')),
            errorMessage: element(by.xpath('//div[@class=\'ng-star-inserted\']')),
            welcomeHeader: element(by.xpath('//h1[contains(text(),\'Welcome to RAMS\')]')),
            signInHeader: element.all(by.css('app-root h1')).last(),
        };
    }

    /**
     * fill login form
     * @param username the username
     * @param password the password
     */
    async fillLoginForm(username, password) {
        await this.sendValue(this.elements.loginUsernameInput, username);
        await this.sendValue(this.elements.loginPasswordInput, password);
    }

    /**
     * Login to rams application with correct username and password
     * @returns Promise
     */
    async login() {
        await this.openPage();
        await this.waitUntil(this.elements.loginPageWrapper);
        await this.fillLoginForm(this.validCredentials.username, this.validCredentials.password);
        await this.click(this.elements.loginSubmitButton);
    }
}
