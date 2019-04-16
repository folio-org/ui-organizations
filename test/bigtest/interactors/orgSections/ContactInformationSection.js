import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class ContactInformationSection {
  static defaultScope = `#${SECTIONS.contactInformationSection}`;
}

export default interactor(ContactInformationSection);
