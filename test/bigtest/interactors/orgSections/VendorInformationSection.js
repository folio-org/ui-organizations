import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class VendorInformationSection {
  static defaultScope = `#${SECTIONS.vendorInformationSection}`;
}

export default interactor(VendorInformationSection);
