import {
  interactor,
  Interactor,
} from '@bigtest/interactor';

import Button from './Button';
import {
  SummarySection,
  ContactInformationSection,
  ContactPeopleSection,
  InterfacesSection,
  VendorInformationSection,
  VendorTermsSection,
  EdiInformationSection,
  AccountsSection,
} from './orgSections';

class SummarySectionForm extends SummarySection {
  name = new Interactor('input[name="name"]');
  isVendor = new Interactor('input[name="isVendor"]');
  code = new Interactor('input[name="code"]');
  status = new Interactor('select[name="status"]');
}

export default interactor(class OrganizationEditInteractor {
  static defaultScope = '#form-vendor';

  updateVendorButton = new Button('#clickable-update-organization');
  createOrgButton = new Button('#clickable-create-organization');

  summarySectionForm = new SummarySectionForm();
  contactInformationSection = new ContactInformationSection();
  contactPeopleSection = new ContactPeopleSection();
  interfacesSection = new InterfacesSection();
  vendorInformationSection = new VendorInformationSection();
  vendorTermsSection = new VendorTermsSection();
  ediInformationSection = new EdiInformationSection();
  accountsSection = new AccountsSection();
});
