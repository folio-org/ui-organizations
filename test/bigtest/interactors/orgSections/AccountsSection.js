import {
  interactor,
  Interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

import {
  ButtonInteractor,
  MultiSelectionInteractor,
  TextFieldInteractor,
} from '@folio/stripes-acq-components/test/bigtest/interactors';

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
  name = new TextFieldInteractor('[name="accounts[0].name"]');
  accNumber = new TextFieldInteractor('[name="accounts[0].accountNo"]');
  paymentMethod = new Interactor('[name="accounts[0].paymentMethod"]');
  accountStatus = new Interactor('[name="accounts[0].accountStatus"]');
  libraryCode = new TextFieldInteractor('[name="accounts[0].libraryCode"]');
  libraryEDIcode = new TextFieldInteractor('[name="accounts[0].libraryEdiCode"]');
  acquisitionUnits = new MultiSelectionInteractor('#account-acq-units-0');
  acqUnitsView = text('[data-test-account-acq-units] [data-test-kv-value]');
  firstAcqUnitOption = new Interactor('#account-acq-units-0-main-item-0');
}

export default interactor(AccountsSection);
