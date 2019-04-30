import {
  interactor,
} from '@bigtest/interactor';

import Button from './Button';

export default interactor(class ConfirmationModal {
  cancelButton = new Button('[data-test-confirmation-modal-cancel-button]');
  confirmButton = new Button('[data-test-confirmation-modal-confirm-button]');
});
