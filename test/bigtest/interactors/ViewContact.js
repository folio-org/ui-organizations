import {
  interactor,
  Interactor,
} from '@bigtest/interactor';

import ContactPersonInteractor from './ContactPerson';

export default interactor(class ViewContactInteractor {
  static defaultScope = '#view-contact';

  contactPerson = new ContactPersonInteractor();
  actions = new Interactor('[data-test-view-contact-actions]')
});
