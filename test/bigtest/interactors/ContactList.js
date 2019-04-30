import {
  collection,
  interactor,
} from '@bigtest/interactor';

import Button from './Button';

class ContactList {
  static defaultScope = '#contact-list';
  contacts = collection('[class*=mclRow---]', {
    unassign: new Button('[data-test-unassign-contact]'),
  });
}

export default interactor(ContactList);
