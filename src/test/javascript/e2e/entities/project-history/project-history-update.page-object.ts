import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProjectHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.projectHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  actionSelect: ElementFinder = element(by.css('select#project-history-action'));
  oldValueInput: ElementFinder = element(by.css('input#project-history-oldValue'));
  newValueInput: ElementFinder = element(by.css('input#project-history-newValue'));
  userSelect: ElementFinder = element(by.css('select#project-history-user'));
  translationKeySelect: ElementFinder = element(by.css('select#project-history-translationKey'));
  translationSelect: ElementFinder = element(by.css('select#project-history-translation'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setActionSelect(action) {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect() {
    return this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption() {
    await this.actionSelect.all(by.tagName('option')).last().click();
  }
  async setOldValueInput(oldValue) {
    await this.oldValueInput.sendKeys(oldValue);
  }

  async getOldValueInput() {
    return this.oldValueInput.getAttribute('value');
  }

  async setNewValueInput(newValue) {
    await this.newValueInput.sendKeys(newValue);
  }

  async getNewValueInput() {
    return this.newValueInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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

  async translationSelectLastOption() {
    await this.translationSelect.all(by.tagName('option')).last().click();
  }

  async translationSelectOption(option) {
    await this.translationSelect.sendKeys(option);
  }

  getTranslationSelect() {
    return this.translationSelect;
  }

  async getTranslationSelectedOption() {
    return this.translationSelect.element(by.css('option:checked')).getText();
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
    await this.actionSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOldValueInput('oldValue');
    expect(await this.getOldValueInput()).to.match(/oldValue/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNewValueInput('newValue');
    expect(await this.getNewValueInput()).to.match(/newValue/);
    await this.userSelectLastOption();
    await this.translationKeySelectLastOption();
    await this.translationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
