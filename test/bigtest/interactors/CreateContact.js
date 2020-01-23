import {
  clickable,
  collection,
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

import Button from './Button';

@interactor class AddressForm {
  static defaultScope = '[data-test-address-form]';
  addAddressButton = clickable('[data-test-repeatable-field-add-item-button]');
  removeAddressButton = clickable('[data-test-repeatable-field-remove-item-button]');
  addresses = collection('[data-test-repeatable-field-list-item]');
}

@interactor class PhoneForm {
  static defaultScope = '[data-test-phone-form]';
  addPhoneButton = clickable('[data-test-repeatable-field-add-item-button]');
  removePhoneButton = clickable('[data-test-repeatable-field-remove-item-button]');
  phones = collection('[data-test-repeatable-field-list-item]');
}

@interactor class EmailForm {
  static defaultScope = '[data-test-email-form]';
  addEmailButton = clickable('[data-test-repeatable-field-add-item-button]');
  removeEmailButton = clickable('[data-test-repeatable-field-remove-item-button]');
  emails = collection('[data-test-repeatable-field-list-item]');
}

@interactor class UrlForm {
  static defaultScope = '[data-test-url-form]';
  addUrlButton = clickable('[data-test-repeatable-field-add-item-button]');
  removeUrlButton = clickable('[data-test-repeatable-field-remove-item-button]');
  urls = collection('[data-test-repeatable-field-list-item]');
}

export default interactor(class CreateContactInteractor {
  static defaultScope = '#edit-contact';

  saveButton = new Button('[type="submit"]');
  addressForm = new AddressForm();
  phoneForm = new PhoneForm();
  emailForm = new EmailForm();
  urlForm = new UrlForm();
  paneTitle = text('[class*="paneTitleLabel---"]');
  noteField = text('[name="notes"]');
  isLoaded = isPresent('[data-test-address-form]');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
