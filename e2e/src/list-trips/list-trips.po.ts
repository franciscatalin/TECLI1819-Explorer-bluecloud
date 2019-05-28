import { browser, by, element } from 'protractor';

export class ListTripsPage {
    navigateTo() {
        return browser.get('/trips');
    }

    // Método para obtener el título
    getTitleText () {
        const selector = 'body > app-root > div > div > div > ' +
        'app-trip-list > div.breadcrump > legend';
        return element(by.css(selector)).getText();
    }

    clickTrip () {
        const buttonSelector = 'body > app-root > div > app-trip-list > div > div:nth-child(1) > div.card-img > h4';
        element(by.css(buttonSelector)).click();
    }
}
