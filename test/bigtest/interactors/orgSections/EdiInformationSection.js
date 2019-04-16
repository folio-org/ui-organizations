import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class EdiInformationSection {
  static defaultScope = `#${SECTIONS.ediInformationSection}`;
}

export default interactor(EdiInformationSection);
