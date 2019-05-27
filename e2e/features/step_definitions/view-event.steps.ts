import {Given, Then, When} from 'cucumber'
import {expect} from 'chai';
import {ViewEventPage} from "../page_objects/view-event.po";

module.exports = function() {

  let app: ViewEventPage = new ViewEventPage();

  Given(/^I have a URL my friend sent to me for an event$/, async () => {
    // purposely empty as a friend having a URL means nothing to me
  });
  When(/^I visit that URL$/, async() => {
    await app.navigateTo('royalrumblehash');
  });

  Then(/^I see the event name$/, async() => {
    await app.getName()
      .then((text)=> {
        expect(text).to.equal('Royal Rumble');
      }, error => {throw error});
  });
}();
