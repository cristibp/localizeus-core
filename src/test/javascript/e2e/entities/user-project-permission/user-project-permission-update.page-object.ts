import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserProjectPermissionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusApp.userProjectPermission.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userSelect: ElementFinder = element(by.css('select#user-project-permission-user'));
  projectSelect: ElementFinder = element(by.css('select#user-project-permission-project'));
  userPermissionSelect: ElementFinder = element(by.css('select#user-project-permission-userPermission'));

  getPageTitle() {
    return this.pageTitle;
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

  async projectSelectLastOption() {
    await this.projectSelect.all(by.tagName('option')).last().click();
  }

  async projectSelectOption(option) {
    await this.projectSelect.sendKeys(option);
  }

  getProjectSelect() {
    return this.projectSelect;
  }

  async getProjectSelectedOption() {
    return this.projectSelect.element(by.css('option:checked')).getText();
  }

  async userPermissionSelectLastOption() {
    await this.userPermissionSelect.all(by.tagName('option')).last().click();
  }

  async userPermissionSelectOption(option) {
    await this.userPermissionSelect.sendKeys(option);
  }

  getUserPermissionSelect() {
    return this.userPermissionSelect;
  }

  async getUserPermissionSelectedOption() {
    return this.userPermissionSelect.element(by.css('option:checked')).getText();
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
    await this.userSelectLastOption();
    await this.projectSelectLastOption();
    await this.userPermissionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
