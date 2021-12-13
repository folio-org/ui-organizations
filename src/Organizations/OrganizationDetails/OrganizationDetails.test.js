import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import OrganizationDetails from './OrganizationDetails';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useAcqRestrictions: jest.fn().mockReturnValue({ restrictions: {} }),
  TagsPane: jest.fn(() => 'TagsPane'),
}));
jest.mock('@folio/stripes-smart-components/lib/Notes/NotesSmartAccordion', () => () => 'NotesSmartAccordion');
jest.mock('./OrganizationAccounts', () => ({ OrganizationAccounts: () => 'OrganizationAccounts' }));
jest.mock('./OrganizationEDIInfo', () => ({ OrganizationEDIInfo: () => 'OrganizationEDIInfo' }));
jest.mock('./OrganizationAgreements', () => ({ OrganizationAgreements: () => 'OrganizationAgreements' }));
jest.mock('./OrganizationVendorInfo', () => ({ OrganizationVendorInfo: () => 'OrganizationVendorInfo' }));
jest.mock('./OrganizationSummary', () => ({ OrganizationSummary: () => 'OrganizationSummary' }));
jest.mock('./OrganizationContactInfo', () => ({ OrganizationContactInfo: () => 'OrganizationContactInfo' }));
jest.mock(
  './OrganizationContactPeople',
  () => ({ OrganizationContactPeopleContainer: () => 'OrganizationContactPeopleContainer' }),
);
jest.mock(
  './OrganizationInterfaces',
  () => ({ OrganizationInterfacesContainer: () => 'OrganizationInterfacesContainer' }),
);

const defaultProps = {
  organization: { name: 'Amazon' },
  organizationCategories: [],
  integrationConfigs: [],
  onClose: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onViewExportLog: jest.fn(),
  onUpdate: jest.fn(),
};
const renderOrganizationDetails = (props = defaultProps) => render(
  <OrganizationDetails {...props} />,
  { wrapper: MemoryRouter },
);

describe('OrganizationDetails', () => {
  it('should display Summary accordion', () => {
    renderOrganizationDetails();

    expect(screen.getByText('OrganizationSummary')).toBeDefined();
  });

  it('should display Notes accordion', () => {
    renderOrganizationDetails();

    expect(screen.getByText('NotesSmartAccordion')).toBeDefined();
  });

  it('should display Contact info accordion', () => {
    renderOrganizationDetails();

    expect(screen.getByText('OrganizationContactInfo')).toBeDefined();
  });

  it('should display Contact people accordion', () => {
    renderOrganizationDetails();

    expect(screen.getByText('OrganizationContactPeopleContainer')).toBeDefined();
  });

  it('should display Interfaces accordion', () => {
    renderOrganizationDetails();

    expect(screen.getByText('OrganizationInterfacesContainer')).toBeDefined();
  });

  it('should display Vendor info accordion when org is vendor', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationVendorInfo')).toBeDefined();
  });

  it('should display Agreements accordion when org is vendor', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationAgreements')).toBeDefined();
  });

  it('should display EDI info accordion when org is vendor', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationEDIInfo')).toBeDefined();
  });

  it('should display Accounts accordion when org is vendor', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationAccounts')).toBeDefined();
  });

  describe('Actions', () => {
    it('should call onEdit when edit action is pressed', () => {
      const onEdit = jest.fn();

      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
        onEdit,
      });

      user.click(screen.getByTestId('edit-organization'));

      expect(onEdit).toHaveBeenCalled();
    });

    it('should open confirmation modal when delete action is pressed', () => {
      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
      });

      user.click(screen.getByTestId('delete-organization'));

      expect(screen.getByText('ui-organizations.organization.delete.confirmLabel')).toBeDefined();
    });

    it('should not display view export log action when there are no integrations', () => {
      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
        integrationConfigs: [],
      });

      expect(screen.queryByTestId('view-organization-export-log')).toBeNull();
    });

    it('should call onViewExportLog when view log action is pressed', () => {
      const onViewExportLog = jest.fn();

      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
        onViewExportLog,
        integrationConfigs: [{ id: 'integrationConfigId' }],
      });

      user.click(screen.getByTestId('view-organization-export-log'));

      expect(onViewExportLog).toHaveBeenCalled();
    });
  });

  describe('Tags', () => {
    it('should tags pane when badge is clicked', () => {
      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
      });

      user.click(screen.getAllByTitle('stripes-acq-components.showTags')[0]);

      expect(screen.getByText('TagsPane')).toBeDefined();
    });
  });
});
