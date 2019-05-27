import { browser, by, element } from 'protractor';

export class ViewEventPage {
  async navigateTo(hash: string) {
    browser.waitForAngularEnabled(true);
    await browser.get(browser.baseUrl + '/events/' + hash)
      .then(response => console.log(response), error => {throw error});

  }
  async getName() {
    return await element(by.css('.event-name')).getText();
  }
}
