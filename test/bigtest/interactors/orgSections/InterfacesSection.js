import {
  interactor,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';
import Button from '../Button';

class InterfacesSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.interfacesSection}`;
  headerButton = new Button(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.interfacesSection}`);
}

export default interactor(InterfacesSection);
