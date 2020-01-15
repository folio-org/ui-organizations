import {
  interactor,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

class VendorTermsSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.vendorTermsSection}`;
}

export default interactor(VendorTermsSection);
