import {
  interactor,
  attribute,
  clickable,
  collection,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';
import Button from '../Button';

class ContactPeopleSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.contactPeopleSection}`;
  headerButton = new Button(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.contactPeopleSection}`);

  contentStyles = attribute('[class*=content---]', 'style');
  isExpanded = styles => styles.includes('visible');
  contacts = collection('[class*=mclRow---]', {
    click: clickable(),
  });
}

export default interactor(ContactPeopleSection);
