import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  createEvent(partyAtMyHouse: string) {
    element(by.css('.event-name')).sendKeys(partyAtMyHouse);
    element(by.css('.create-event')).click();
  }

  getPermalink() {
    return element(by.css('.event-permalink')).getAttribute('value') as Promise<string>;
  }
}
