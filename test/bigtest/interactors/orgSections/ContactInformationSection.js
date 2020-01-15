import {
  interactor,
  text,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';
import Button from '../Button';

class ContactInformationSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.contactInformationSection}`;

  headerButton = new Button(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.contactInformationSection}`);
  text = text();
}

export default interactor(ContactInformationSection);
