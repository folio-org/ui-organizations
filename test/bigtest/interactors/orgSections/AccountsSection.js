import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class AccountsSection {
  static defaultScope = `#${SECTIONS.accountsSection}`;
}

export default interactor(AccountsSection);
