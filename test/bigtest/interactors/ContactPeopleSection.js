import {
  interactor,
  isVisible,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../src/common/constants';
import Button from './Button';

class ContactPeopleSection {
  static defaultScope = `#${SECTIONS.contactPeopleSection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.contactPeopleSection}`);
  isExpanded = isVisible('[class*=content---]');
}

export default interactor(ContactPeopleSection);
