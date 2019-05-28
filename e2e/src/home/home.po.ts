import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/home');
    }

    // Método para obtener el título
    getTitleText () {
        const selector = 'body > app-root > div > app-footer > div > footer > div:nth-child(1) > div > div > div.col-md-6.col-lg-5.text-center.text-md-left.mb-4.mb-md-0 > h6';
        return element(by.css(selector)).getText();
    }
}
