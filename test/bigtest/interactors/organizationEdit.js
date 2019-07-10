import {
  collection,
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

import ContactList from './ContactList';
import InterfaceList from './Interfaces/InterfaceList';

class SummarySectionForm extends SummarySection {
  name = new Interactor('input[name="name"]');
  isVendor = new Interactor('input[name="isVendor"]');
  code = new Interactor('input[name="code"]');
  status = new Interactor('select[name="status"]');
}

class ContactPeopleForm extends ContactPeopleSection {
  addContactButton = new Button('[data-test-add-contact]');
}

export default interactor(class OrganizationEditInteractor {
  static defaultScope = '#form-vendor';

  updateVendorButton = new Button('#clickable-update-organization');
  createOrgButton = new Button('#clickable-create-organization');
  closePaneButton = new Button('[class*=paneHeaderButtonsArea---] [icon=times]');

  summarySectionForm = new SummarySectionForm();
  contactInformationSection = new ContactInformationSection();
  contactPeopleSection = new ContactPeopleForm();
  interfacesSection = new InterfacesSection();
  vendorInformationSection = new VendorInformationSection();
  vendorTermsSection = new VendorTermsSection();
  ediInformationSection = new EdiInformationSection();
  accountsSection = new AccountsSection();
  addNameButton = new Button('[data-test-add-name-button]');
  removeNameButton = new Button('[data-test-remove-name-button]');
  aliases = collection('input[name*=value]');
  addAccountButton = new Button('[data-test-add-account-button]');
  removeAccountButton = new Button('[data-test-remove-account-button]');
  accounts = collection('input[name*=accountNo]');
  contactList = new ContactList();
  interfaceList = new InterfaceList();
});
