import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo() {
    browser.waitForAngularEnabled(true);
    await browser.get(browser.baseUrl)
      .then(response => console.log(response), error => {throw error});

  }

  async createEvent(eventName: string) {
    browser.waitForAngularEnabled(true).
      then(response => console.log(response), error => {throw error});
    await element(by.css('.event-name')).sendKeys(eventName)
      .then(response => console.log(response), error => {throw error});
    await element(by.css('.create-event')).click()
      .then(response => console.log(response), error => {throw error});

  }

  async getPermalink() {
   return await element(by.css('.event-permalink')).getAttribute('value');
  }
}
