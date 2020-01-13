import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import Button from './Button';
import {
  AccountsSection,
  ContactInformationSection,
  ContactPeopleSection,
  EdiInformationSection,
  InterfacesSection,
  SummarySection,
  VendorInformationSection,
  VendorTermsSection,
} from './orgSections';

@interactor class OrganizationDetailsActions {
  static defaultScope = '#data-test-organizations-details-actions';

  toggle = new Button('[class*=paneHeaderCenterButton---]');
  delete = new Button('[data-test-button-delete-organization]');
  edit = new Button('[data-test-button-edit-organization]');
}

export default interactor(class OrganizationDetailsInteractor {
  static defaultScope = '#pane-organization-details';

  closePaneButton = new Button('[class*=paneHeaderButtonsArea---] [icon=times]');
  editOrganizationButton = new Button('[data-test-button-edit-organization]');

  summarySection = new SummarySection();
  contactInformationSection = new ContactInformationSection();
  contactPeopleSection = new ContactPeopleSection();
  interfacesSection = new InterfacesSection();
  vendorInformationSection = new VendorInformationSection();
  vendorTermsSection = new VendorTermsSection();
  ediInformationSection = new EdiInformationSection();
  accountsSection = new AccountsSection();
  actions = new OrganizationDetailsActions();

  expandAllButton = new Button('[class*=paneContent---] div[class*=row---] [class*=button---]');

  isLoaded = isPresent('[class*=paneTitleLabel---]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
