import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class VendorTermsSection {
  static defaultScope = `#${SECTIONS.vendorTermsSection}`;
}

export default interactor(VendorTermsSection);
