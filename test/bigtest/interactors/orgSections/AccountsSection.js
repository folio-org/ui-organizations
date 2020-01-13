import {
  interactor,
  text,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

@interactor class PaymentMethod {
  static defaultScope = '[data-test-payment-method]';
  value = text('[class*=kvRoot---]');
}

class AccountsSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.accountsSection}`;

  paymentMethod = new PaymentMethod();
}

export default interactor(AccountsSection);
