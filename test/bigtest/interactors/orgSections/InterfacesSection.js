import {
  interactor,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';
import Button from '../Button';

class InterfacesSection {
  static defaultScope = `#${SECTIONS.interfacesSection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.interfacesSection}`);
}

export default interactor(InterfacesSection);
