import {
  interactor,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

class VendorInformationSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.vendorInformationSection}`;
}

export default interactor(VendorInformationSection);
