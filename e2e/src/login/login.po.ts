import { browser, by, element } from 'protractor';

export class LoginPage {

    private credentials = {
        email: 'login-e2e-test@gmail.com',
        password: '12345678CCC'
    };

    navigateTo() {
        return browser.get('/login');
    }

    // con este método simulamos el proceso de hacer login
    fillCredentials(credentials: any = this.credentials) {
        const buttonSelector = 'body > app-root > div > app-login > form > div:nth-child(3) > div > button';
        // Con .sendKeys actualizamos los campos email y password
        element(by.css('#email')).sendKeys(credentials.email);
        element(by.css('#pwd')).sendKeys(credentials.password);
        // Hacemos click en el botón de entrar
        element(by.css(buttonSelector)).click();
    }
}
