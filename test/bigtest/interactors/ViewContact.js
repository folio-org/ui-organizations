import {
  interactor,
  Interactor,
} from '@bigtest/interactor';

import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import ContactPersonInteractor from './ContactPerson';

export default interactor(class ViewContactInteractor {
  static defaultScope = '#view-contact';

  contactPerson = new ContactPersonInteractor();
  actions = new Interactor('[data-test-view-contact-actions]')
  unassignButton = new Button('[data-test-contacts-action-unassign]');
  unassignConfirmation = new ConfirmationModal('#unassign-contact-modal');
});
