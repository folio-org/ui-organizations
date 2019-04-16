import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';

class InterfacesSection {
  static defaultScope = `#${SECTIONS.interfacesSection}`;
}

export default interactor(InterfacesSection);
