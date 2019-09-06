import {
  interactor,
  attribute,
  isVisible,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';
import Button from '../Button';

class ContactPeopleSection {
  static defaultScope = `#${SECTIONS.contactPeopleSection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.contactPeopleSection}`);

  contentStyles = attribute('[class*=content---]', 'style');
  isExpanded = styles => styles.includes('visible');
  listIsVisible = isVisible('#contact-list');
}

export default interactor(ContactPeopleSection);
