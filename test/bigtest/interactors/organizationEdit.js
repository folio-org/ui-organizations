import {
  clickable,
  collection,
  interactor,
  Interactor,
  isVisible,
  isPresent,
  scoped,
} from '@bigtest/interactor';

import { TextFieldInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

import { SECTIONS } from '../../../src/common/constants';
import Button from './Button';
import {
  InterfacesSection,
  VendorInformationSection,
  VendorTermsSection,
  EdiInformationSection,
  AccountsSection,
} from './orgSections';
import Metadata from './Metadata';
import ContactList from './ContactList';
import InterfaceList from './Interfaces/InterfaceList';
import CheckboxInteractor from './CheckboxInteractor';
import ConfirmationModal from './ConfirmationModal';

@interactor class SummarySectionForm {
  static defaultScope = `#${SECTIONS.summarySection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.summarySection}`);
  metadata = new Metadata();
  isExpanded = isVisible('[class*=content---]');
  name = new TextFieldInteractor('input[name="name"]');
  isVendor = new CheckboxInteractor('input[name="isVendor"]');
  code = new TextFieldInteractor('input[name="code"]');
  codeError = isPresent('#icon-org.code-validation-error');
  status = new Interactor('select[name="status"]');
}

@interactor class ContactPeopleForm {
  static defaultScope = `#${SECTIONS.contactPeopleSection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.contactPeopleSection}`);
  addContactButton = new Button('[data-test-add-contact]');
  isExpanded = isPresent('#contact-list');
}

class VendorTermsForm extends VendorTermsSection {
  addButton = new Button('[data-test-vendor-term-add]');
  removeButton = new Button('[data-test-vendor-term-remove]');
}

@interactor class AddressesForm {
  static defaultScope = '#addresses';
  addressAddButton = new Button('#addresses-add-button');
  removeButtons = collection('[data-test-repeatable-field-remove-item-button]', Button);
  primaryCheckboxes = collection('[data-test-checkbox-is-primary]', CheckboxInteractor);
  addressLineInputs = collection('[data-test-address-1] input', TextFieldInteractor);
}

@interactor class ContactInformationForm {
  static defaultScope = `#${SECTIONS.contactInformationSection}`;

  toggle = clickable('[class*=defaultCollapseButton---]');
  addresses = new AddressesForm();
  urlAddButton = new Button('#urls-add-button');
  urlRemoveButton = new Button('#urls [data-test-repeatable-field-remove-item-button]');
  emailAddButton = new Button('#emails-add-button');
  emailRemoveButton = new Button('#emails [data-test-repeatable-field-remove-item-button]');
  phoneAddButton = new Button('#phone-numbers-add-button');
  phoneRemoveButton = new Button('#phone-numbers [data-test-repeatable-field-remove-item-button]');
}

@interactor class Aliases {
  static defaultScope = '#aliases';
  aliasAddButton = new Button('#aliases-add-button');
  aliasInputs = collection('[data-test-alias] input', TextFieldInteractor);
}

export default interactor(class OrganizationEditInteractor {
  static defaultScope = '#form-organization';

  updateVendorButton = new Button('#organization-form-save');
  createOrgButton = new Button('#organization-form-save');
  closePaneButton = new Button('[class*=paneHeaderButtonsArea---] [icon=times]');

  summarySectionForm = scoped(`#${SECTIONS.summarySection}`, SummarySectionForm);
  contactInformationSection = new ContactInformationForm();
  contactPeopleSection = scoped(`#${SECTIONS.contactPeopleSection}`, ContactPeopleForm);
  interfacesSection = new InterfacesSection();
  vendorInformationSection = new VendorInformationSection();
  vendorTermsSection = new VendorTermsForm();
  ediInformationSection = new EdiInformationSection();
  accountsSection = new AccountsSection();
  addNameButton = new Button('#aliases-add-button');
  removeNameButton = new Button('#aliases [data-test-repeatable-field-remove-item-button]');
  aliases = new Aliases();
  addAccountButton = new Button('[data-test-add-account-button]');
  removeAccountButton = new Button('[data-test-remove-account-button]');
  accounts = collection('input[name*=accountNo]');
  contactList = new ContactList();
  interfaceList = new InterfaceList();

  vendorConfirmationModal = new ConfirmationModal('#uncheck-is-vendor-confirmation');
  formIsVisible = isVisible('[data-test-form-vendor-pane]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.formIsVisible);
  }
});
