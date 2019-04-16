import {
  interactor,
} from '@bigtest/interactor';

import Button from './Button';
import { ContactPeopleSection } from './orgSections';

export default interactor(class OrganizationDetailsInteractor {
  static defaultScope = '#pane-vendordetails';

  closePaneButton = new Button('[class*=paneHeaderButtonsArea---] [icon=times]');
  editOrganizationButton = new Button('#clickable-editvendor');
  contactPeopleSection = new ContactPeopleSection();
  expandAllButton = new Button('[class*=paneContent---] div[class*=row---] [class*=button---]');
});
