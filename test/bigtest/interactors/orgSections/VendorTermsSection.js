import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import { ButtonInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

class VendorTermsSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.vendorTermsSection}`;

  headerButton = new ButtonInteractor(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.vendorTermsSection}`);
  agreements = isPresent('[data-test-agreements]');
}

export default interactor(VendorTermsSection);
