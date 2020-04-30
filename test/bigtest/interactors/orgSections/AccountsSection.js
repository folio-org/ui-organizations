import {
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

import { ButtonInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

@interactor class PaymentMethod {
  static defaultScope = '[data-test-payment-method]';
  value = text('[class*=kvRoot---]');
}

class AccountsSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.accountsSection}`;

  headerButton = new ButtonInteractor(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.accountsSection}`);
  paymentMethod = new PaymentMethod();
  accounts = isPresent('[data-test-accounts]');
}

export default interactor(AccountsSection);
