import {
  clickable,
  collection,
  interactor,
  text,
} from '@bigtest/interactor';

import Button from './Button';

@interactor class AddressForm {
  static defaultScope = '[data-test-address-form]';
  addAddressButton = clickable('[data-test-add-contact-details-block]');
  removeAddressButton = clickable('[data-test-remove-contact-details-block]');
  addresses = collection('li[class*="formListItem---"]');
}

@interactor class PhoneForm {
  static defaultScope = '[data-test-phone-form]';
  addPhoneButton = clickable('[data-test-add-contact-details-block]');
  removePhoneButton = clickable('[data-test-remove-contact-details-block]');
  phones = collection('li[class*="formListItem---"]');
}

@interactor class EmailForm {
  static defaultScope = '[data-test-email-form]';
  addEmailButton = clickable('[data-test-add-contact-details-block]');
  removeEmailButton = clickable('[data-test-remove-contact-details-block]');
  emails = collection('li[class*="formListItem---"]');
}

@interactor class UrlForm {
  static defaultScope = '[data-test-url-form]';
  addUrlButton = clickable('[data-test-add-contact-details-block]');
  removeUrlButton = clickable('[data-test-remove-contact-details-block]');
  urls = collection('li[class*="formListItem---"]');
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
});
