import {
  interactor,
  Interactor,
  isVisible,
} from '@bigtest/interactor';

import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import ContactPersonInteractor from './ContactPerson';

export default interactor(class ViewContactInteractor {
  static defaultScope = '#view-contact';

  contactPerson = new ContactPersonInteractor();
  actions = new Interactor('[data-test-view-contact-actions]')
  paneHeaderCenterButton = new Button('[data-test-pane-header-actions-button]');
  unassignButton = new Button('[data-test-contacts-action-unassign]');
  deleteButton = new Button('[data-test-contacts-action-delete]');
  unassignConfirmation = new ConfirmationModal('#unassign-contact-modal');
  deleteConfirmation = new ConfirmationModal('#delete-contact-modal');
  pageIsVisible = isVisible('[data-test-contact-person]');
  closeButton = new Button('[icon=times]');

  whenLoaded() {
    return this.timeout(5000).when(() => this.pageIsVisible);
  }
});
