import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import { organizationTypes as organizationTypesMock } from 'fixtures';
import OrganizationDetails from './OrganizationDetails';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useAcqRestrictions: jest.fn().mockReturnValue({ restrictions: {} }),
  TagsPane: jest.fn(() => 'TagsPane'),
}));
jest.mock('@folio/stripes-smart-components/lib/Notes/NotesSmartAccordion', () => () => 'NotesSmartAccordion');
jest.mock('./OrganizationAccounts', () => ({ OrganizationAccounts: () => 'OrganizationAccounts' }));
jest.mock('./OrganizationBankingInfo', () => ({ OrganizationBankingInfo: () => 'OrganizationBankingInfo' }));
jest.mock('./IntegrationDetails', () => ({ IntegrationDetails: () => 'IntegrationDetails' }));
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

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </MemoryRouter>
);

const defaultProps = {
  organization: { name: 'Amazon', organizationTypes: ['e7e9af00-c12c-448f-8ad1-d15ff209605a'] },
  organizationCategories: [],
  integrationConfigs: [],
  duplicateAccounts: [],
  organizationTypes: organizationTypesMock,
  onClose: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onViewExportLog: jest.fn(),
  onUpdate: jest.fn(),
};
const renderOrganizationDetails = (props = defaultProps) => render(
  <OrganizationDetails {...props} />,
  { wrapper },
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

  it('should display Integration details accordion', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('IntegrationDetails')).toBeDefined();
  });

  it('should display Accounts accordion when org is vendor', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationAccounts')).toBeDefined();
  });

  it('should display Donor Contacts accordion when both vendor and donor have been checked', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: {
        name: 'Amazon',
        isVendor: true,
        isDonor: true,
      },
    });

    expect(screen.getByText('ui-organizations.privilegedDonorInformation')).toBeDefined();
  });

  it('should display warning message if vendor has not unique account numbers', () => {
    renderOrganizationDetails({
      ...defaultProps,
      organization: {
        ...defaultProps.organization,
        isVendor: true,
        accounts: [{ accountNo: '1' }, { accountNo: '1' }],
      },
    });

    expect(screen.getByText('ui-organizations.view.duplicateAccounts')).toBeDefined();
  });

  it('should display banking information accordion when org is vendor and related settings are enabled', () => {
    renderOrganizationDetails({
      ...defaultProps,
      isBankingInformationEnabled: true,
      organization: { name: 'Amazon', isVendor: true },
    });

    expect(screen.getByText('OrganizationBankingInfo')).toBeInTheDocument();
  });

  describe('Actions', () => {
    it('should call onEdit when edit action is pressed', async () => {
      const onEdit = jest.fn();

      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
        onEdit,
      });

      await user.click(screen.getByTestId('edit-organization'));

      expect(onEdit).toHaveBeenCalled();
    });

    it('should open confirmation modal when delete action is pressed', async () => {
      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
      });

      await user.click(screen.getByTestId('delete-organization'));

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

    it('should call onViewExportLog when view log action is pressed', async () => {
      const onViewExportLog = jest.fn();

      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
        onViewExportLog,
        integrationConfigs: [{ id: 'integrationConfigId' }],
      });

      await user.click(screen.getByTestId('view-organization-export-log'));

      expect(onViewExportLog).toHaveBeenCalled();
    });
  });

  describe('Tags', () => {
    it('should tags pane when badge is clicked', async () => {
      renderOrganizationDetails({
        ...defaultProps,
        organization: { name: 'Amazon', isVendor: true },
      });

      await user.click(screen.getAllByTitle('stripes-acq-components.showTags')[0]);

      expect(screen.getByText('TagsPane')).toBeDefined();
    });
  });
});
