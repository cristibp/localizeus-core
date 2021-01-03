import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ServiceSubscriptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.serviceSubscription.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startInput: ElementFinder = element(by.css('input#service-subscription-start'));
  endInput: ElementFinder = element(by.css('input#service-subscription-end'));
  paymentTypeSelect: ElementFinder = element(by.css('select#service-subscription-paymentType'));
  companySelect: ElementFinder = element(by.css('select#service-subscription-company'));
  planSelect: ElementFinder = element(by.css('select#service-subscription-plan'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return this.endInput.getAttribute('value');
  }

  async setPaymentTypeSelect(paymentType) {
    await this.paymentTypeSelect.sendKeys(paymentType);
  }

  async getPaymentTypeSelect() {
    return this.paymentTypeSelect.element(by.css('option:checked')).getText();
  }

  async paymentTypeSelectLastOption() {
    await this.paymentTypeSelect.all(by.tagName('option')).last().click();
  }
  async companySelectLastOption() {
    await this.companySelect.all(by.tagName('option')).last().click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
  }

  async planSelectLastOption() {
    await this.planSelect.all(by.tagName('option')).last().click();
  }

  async planSelectOption(option) {
    await this.planSelect.sendKeys(option);
  }

  getPlanSelect() {
    return this.planSelect;
  }

  async getPlanSelectedOption() {
    return this.planSelect.element(by.css('option:checked')).getText();
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
    await this.setStartInput('01-01-2001');
    expect(await this.getStartInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setEndInput('01-01-2001');
    expect(await this.getEndInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.paymentTypeSelectLastOption();
    await this.companySelectLastOption();
    await this.planSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
