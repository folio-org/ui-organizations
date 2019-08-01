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

class VendorTermsForm extends VendorTermsSection {
  addButton = new Button('[data-test-vendor-term-add]');
  removeButton = new Button('[data-test-vendor-term-remove]');
}

class ContactInformationForm extends ContactInformationSection {
  addressAddButton = new Button('#addresses-add-button');
  addressRemoveButton = new Button('#addresses [data-test-repeatable-field-remove-item-button]');
  urlAddButton = new Button('#urls-add-button');
  urlRemoveButton = new Button('#urls [data-test-repeatable-field-remove-item-button]');
  emailAddButton = new Button('#emails-add-button');
  emailRemoveButton = new Button('#emails [data-test-repeatable-field-remove-item-button]');
  phoneAddButton = new Button('#phone-numbers-add-button');
  phoneRemoveButton = new Button('#phone-numbers [data-test-repeatable-field-remove-item-button]');
}

export default interactor(class OrganizationEditInteractor {
  static defaultScope = '#form-vendor';

  updateVendorButton = new Button('#clickable-update-organization');
  createOrgButton = new Button('#clickable-create-organization');
  closePaneButton = new Button('[class*=paneHeaderButtonsArea---] [icon=times]');

  summarySectionForm = new SummarySectionForm();
  contactInformationSection = new ContactInformationForm();
  contactPeopleSection = new ContactPeopleForm();
  interfacesSection = new InterfacesSection();
  vendorInformationSection = new VendorInformationSection();
  vendorTermsSection = new VendorTermsForm();
  ediInformationSection = new EdiInformationSection();
  accountsSection = new AccountsSection();
  addNameButton = new Button('#aliases-add-button');
  removeNameButton = new Button('#aliases [data-test-repeatable-field-remove-item-button]');
  aliases = collection('input[name*=value]');
  addAccountButton = new Button('[data-test-add-account-button]');
  removeAccountButton = new Button('[data-test-remove-account-button]');
  accounts = collection('input[name*=accountNo]');
  contactList = new ContactList();
  interfaceList = new InterfaceList();
});
