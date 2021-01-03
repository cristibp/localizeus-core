import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class KeyLabelUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.keyLabel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#key-label-value'));
  translationKeySelect: ElementFinder = element(by.css('select#key-label-translationKey'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async translationKeySelectLastOption() {
    await this.translationKeySelect.all(by.tagName('option')).last().click();
  }

  async translationKeySelectOption(option) {
    await this.translationKeySelect.sendKeys(option);
  }

  getTranslationKeySelect() {
    return this.translationKeySelect;
  }

  async getTranslationKeySelectedOption() {
    return this.translationKeySelect.element(by.css('option:checked')).getText();
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
    await this.translationKeySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
