import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TranslationUpdatePage from './translation-update.page-object';

const expect = chai.expect;
export class TranslationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusApp.translation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-translation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TranslationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('translation-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('translation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTranslation() {
    await this.createButton.click();
    return new TranslationUpdatePage();
  }

  async deleteTranslation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const translationDeleteDialog = new TranslationDeleteDialog();
    await waitUntilDisplayed(translationDeleteDialog.deleteModal);
    expect(await translationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusApp.translation.delete.question/);
    await translationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(translationDeleteDialog.deleteModal);

    expect(await isVisible(translationDeleteDialog.deleteModal)).to.be.false;
  }
}
