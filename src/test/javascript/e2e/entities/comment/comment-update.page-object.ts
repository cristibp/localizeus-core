import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CommentUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.comment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#comment-value'));
  translationkeySelect: ElementFinder = element(by.css('select#comment-translationkey'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async translationkeySelectLastOption() {
    await this.translationkeySelect.all(by.tagName('option')).last().click();
  }

  async translationkeySelectOption(option) {
    await this.translationkeySelect.sendKeys(option);
  }

  getTranslationkeySelect() {
    return this.translationkeySelect;
  }

  async getTranslationkeySelectedOption() {
    return this.translationkeySelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setValueInput('value');
    expect(await this.getValueInput()).to.match(/value/);
    await this.translationkeySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
