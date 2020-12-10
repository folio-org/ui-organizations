import {
  interactor,
  clickable,
  collection,
  isPresent,
} from '@bigtest/interactor';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';
import Button from '../Button';

class ContactPeopleSection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.contactPeopleSection}`;
  headerButton = new Button(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.contactPeopleSection}`);

  isExpanded = isPresent('[class*=expanded---]')
  contacts = collection('[class*=mclRow---]', {
    click: clickable(),
  });
}

export default interactor(ContactPeopleSection);
