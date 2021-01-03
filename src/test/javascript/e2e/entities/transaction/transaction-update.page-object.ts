import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TransactionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.transaction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  amountInCentsInput: ElementFinder = element(by.css('input#transaction-amountInCents'));
  dateInput: ElementFinder = element(by.css('input#transaction-date'));
  statusInput: ElementFinder = element(by.css('input#transaction-status'));
  typeSelect: ElementFinder = element(by.css('select#transaction-type'));
  servicesubscriptionSelect: ElementFinder = element(by.css('select#transaction-servicesubscription'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAmountInCentsInput(amountInCents) {
    await this.amountInCentsInput.sendKeys(amountInCents);
  }

  async getAmountInCentsInput() {
    return this.amountInCentsInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async servicesubscriptionSelectLastOption() {
    await this.servicesubscriptionSelect.all(by.tagName('option')).last().click();
  }

  async servicesubscriptionSelectOption(option) {
    await this.servicesubscriptionSelect.sendKeys(option);
  }

  getServicesubscriptionSelect() {
    return this.servicesubscriptionSelect;
  }

  async getServicesubscriptionSelectedOption() {
    return this.servicesubscriptionSelect.element(by.css('option:checked')).getText();
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
    await this.setAmountInCentsInput('5');
    expect(await this.getAmountInCentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01-01-2001');
    expect(await this.getDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await this.servicesubscriptionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
