import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationDetailsInteractor,
  OrganizationEditInteractor,
  InterfacesViewInteractor,
  ConfirmationModalInteractor,
} from '../interactors';

const ORGANIZATIONS_COUNT = 13;
const TEST_NOTE = 'Test note';

describe('Organization details', () => {
  setupApplication();

  const orgDetails = new OrganizationDetailsInteractor();
  const orgEdit = new OrganizationEditInteractor();
  const orgInterface = new InterfacesViewInteractor();

  beforeEach(function () {
    const vendorInterface = this.server.create('interface');
    const organizations = this.server.createList(
      'organization',
      ORGANIZATIONS_COUNT,
      { interfaces: [vendorInterface.id] },
    );
    const orgId = organizations[0].id;

    this.server.create('contact', { notes: TEST_NOTE });

    this.visit(`/organizations/view/${orgId}`);
  });

  it('renders Organization details', () => {
    expect(orgDetails.$root).to.exist;
  });

  it("doesn't show Organization Details action menu", () => {
    expect(orgDetails.actions.isPresent).to.be.false;
  });

  describe('click on header', () => {
    beforeEach(async function () {
      await orgDetails.actions.toggle.click();
    });

    it('shows action menu', () => {
      expect(orgDetails.actions.isPresent).to.be.true;
    });
  });

  it('shows the close details pane button', () => {
    expect(orgDetails.closePaneButton.isPresent).to.be.true;
  });

  it('shows the edit button', () => {
    expect(orgDetails.editOrganizationButton.isPresent).to.be.true;
  });

  it('summarySection is displayed', function () {
    expect(orgDetails.summarySection.isPresent).to.be.true;
  });

  it('contactInformationSection is displayed', function () {
    expect(orgDetails.contactInformationSection.isPresent).to.be.true;
  });

  it('note is displayed', function () {
    expect(orgDetails.note.value).to.contain(TEST_NOTE);
  });

  it('interfacesSection is displayed', function () {
    expect(orgDetails.interfacesSection.isPresent).to.be.true;
  });

  it('vendorInformationSection is not displayed', function () {
    expect(orgDetails.vendorInformationSection.isPresent).to.be.false;
  });

  it('vendorTermsSection is not displayed', function () {
    expect(orgDetails.vendorTermsSection.isPresent).to.be.false;
  });

  it('ediInformationSection is not displayed', function () {
    expect(orgDetails.ediInformationSection.isPresent).to.be.false;
  });

  it('accountsSection is not displayed', function () {
    expect(orgDetails.accountsSection.isPresent).to.be.false;
  });

  it('contact people section is expanded', () => {
    expect(orgDetails.contactPeopleSection.isExpanded).to.be.true;
  });

  describe('metadata', function () {
    beforeEach(async function () {
      await orgDetails.summarySection.headerButton.click();
    });

    it('summary section is opened', function () {
      expect(orgDetails.summarySection.isExpanded).to.be.true;
    });

    it('metadata is displayed', function () {
      expect(orgDetails.summarySection.metadata.isPresent).to.be.true;
    });
  });

  describe('click contact people section', function () {
    beforeEach(async function () {
      await orgDetails.contactPeopleSection.headerButton.click();
    });

    it('contact people section is closed', function () {
      expect(orgDetails.contactPeopleSection.isExpanded).to.be.false;
    });
  });

  describe('clicking on the close pane button', function () {
    beforeEach(async function () {
      await orgDetails.closePaneButton.click();
    });

    it('organization\'s details pane is closed', function () {
      expect(orgDetails.isPresent).to.be.false;
    });
  });

  describe('open details url without org id', function () {
    beforeEach(function () {
      this.visit('/organizations/view/');
    });

    it('details pane has not being render without id', function () {
      expect(orgDetails.isPresent).to.be.false;
    });
  });

  describe('click expand all button', function () {
    beforeEach(async function () {
      await orgDetails.expandAllButton.click();
    });

    it('all sections are expanded', function () {
      expect(orgDetails.contactPeopleSection.isExpanded).to.be.true;
    });
  });

  describe('click edit button', function () {
    beforeEach(async function () {
      await orgDetails.editOrganizationButton.click();
    });

    it('edit organization layer is open', function () {
      expect(orgEdit.isPresent).to.be.true;
    });
  });

  describe('click delete Organization', () => {
    const deleteLineConfirmation = new ConfirmationModalInteractor('#delete-organization-confirmation');

    beforeEach(async function () {
      await orgDetails.actions.toggle.click();
      await orgDetails.actions.delete.click();
    });

    it('shows delete Organization confirmation', () => {
      expect(deleteLineConfirmation.isVisible).to.be.true;
    });
  });

  describe('click delete Organization and cancel', () => {
    const deleteLineConfirmation = new ConfirmationModalInteractor('#delete-organization-confirmation');

    beforeEach(async function () {
      await orgDetails.actions.toggle.click();
      await orgDetails.actions.delete.click();
      await deleteLineConfirmation.cancelButton.click();
    });

    it('closes delete Organization confirmation', () => {
      expect(deleteLineConfirmation.isPresent).to.be.false;
    });

    it('shows Organization Details Pane', () => {
      expect(orgDetails.isVisible).to.be.true;
    });
  });

  describe('click delete Organization and confirm', () => {
    const deleteLineConfirmation = new ConfirmationModalInteractor('#delete-organization-confirmation');

    beforeEach(async function () {
      await orgDetails.actions.toggle.click();
      await orgDetails.actions.delete.click();
      await deleteLineConfirmation.confirmButton.click();
    });

    it('closes delete Organization confirmation', () => {
      expect(deleteLineConfirmation.isPresent).to.be.false;
    });

    it('closes Organization Details Pane', () => {
      expect(orgDetails.isPresent).to.be.false;
    });
  });

  describe('vendor interface section', () => {
    beforeEach(async function () {
      await orgDetails.interfacesSection.headerButton.click();
    });

    it('vendor interface is displayed', () => {
      expect(orgInterface.interfaces(0).isPresent).to.be.true;
    });
  });
});
