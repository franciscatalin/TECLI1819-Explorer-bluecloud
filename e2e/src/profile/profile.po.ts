import { browser, by, element } from 'protractor';

export class ProfilePage {

    navigateTo() {
        return browser.get('/profile');
    }

    logout() {
        const buttonSelector = '#navbarSupportedContent > ul:nth-child(3) > li:nth-child(2) > a';
        // Hacemos click en el botón logout
        element(by.css(buttonSelector)).click();
    }

    // Método para obtener el título
    getTitleText () {
        const selector = 'body > app-root > div > app-profile > legend';
        return element(by.css(selector)).getText();
    }

    getErrorMessage () {
        const selector = 'body > app-root > div > app-message > div';
        return element(by.css(selector)).getText();
    }
}


