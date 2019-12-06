import {
  interactor,
  text,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';
import Button from '../Button';

class ContactInformationSection {
  static defaultScope = `#${SECTIONS.contactInformationSection}`;

  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.contactInformationSection}`);
  text = text();
}

export default interactor(ContactInformationSection);
