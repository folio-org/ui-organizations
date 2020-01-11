import {
  interactor,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';

class EdiInformationSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.ediInformationSection}`;
}

export default interactor(EdiInformationSection);
