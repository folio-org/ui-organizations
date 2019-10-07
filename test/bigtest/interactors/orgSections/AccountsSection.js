import {
  interactor,
  text,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

@interactor class PaymentMethod {
  static defaultScope = '[data-test-payment-method]';
  value = text('[class*=kvRoot---]');
}

class AccountsSection {
  static defaultScope = `#${SECTIONS.accountsSection}`;

  paymentMethod = new PaymentMethod();
}

export default interactor(AccountsSection);
