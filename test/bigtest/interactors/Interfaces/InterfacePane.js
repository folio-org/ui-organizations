import {
  Interactor,
  interactor,
  text,
} from '@bigtest/interactor';

import Button from '../Button';
import ConfirmationModal from '../ConfirmationModal';

export default interactor(class InterfacePaneInteractor {
  static defaultScope = '#view-interface';

  actions = new Interactor('[data-test-view-interface-actions]');
  orgInterface = new Interactor('[data-test-interface-pane-view]');
  paneHeaderCenterButton = new Button('[data-test-pane-header-actions-button]');
  unassignButton = new Button('[data-test-interface-action-unassign]');
  deleteButton = new Button('[data-test-interface-action-delete]');
  unassignConfirmation = new ConfirmationModal('#unassign-interface-modal');
  deleteConfirmation = new ConfirmationModal('#delete-interface-modal');
  showCredsButton = new Button('[data-test-show-creds]');
  passwordBlockText = text('[data-test-password');
});
