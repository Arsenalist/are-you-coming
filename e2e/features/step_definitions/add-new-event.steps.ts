import {Given, Then, When} from 'cucumber'
import {AppPage} from '../page_objects/app.po'
import {expect} from 'chai';

module.exports = function() {

  let app: AppPage = new AppPage();

  Given(/^I want to add a new event$/, async () => {
    await app.navigateTo()
  });
  When(/^I create an event by providing a name$/, async() => {
    await app.createEvent('Party at my house');
  });
  Then(/^I am provided a permalink for my event which I can share with friends$/, async() => {
    await app.getPermalink()
      .then((permalink)=> {
        expect(permalink).to.equal('http://somethingunique.example.com');
      }, error => {throw error});
  });
}();
