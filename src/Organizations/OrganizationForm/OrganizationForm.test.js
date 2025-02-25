import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';
import {
  render,
  screen,
  act,
} from '@folio/jest-config-stripes/testing-library/react';
import { queryHelpers } from '@folio/jest-config-stripes/testing-library/dom';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import { organizationTypes } from 'fixtures';
import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import { useBankingInformationSettings } from '../../common/hooks';
import OrganizationForm from './OrganizationForm';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  PrivilegedDonorContacts: jest.fn(() => 'PrivilegedDonorContacts'),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useBankingInformationSettings: jest.fn(),
}));
jest.mock(
  './OrganizationSummaryForm',
  () => ({ OrganizationSummaryForm: () => 'OrganizationSummaryForm' }),
);
jest.mock(
  './OrganizationContactInfoForm',
  () => ({ OrganizationContactInfoFormContainer: () => 'OrganizationContactInfoFormContainer' }),
);
jest.mock(
  './OrganizationContactPeopleForm',
  () => ({ OrganizationContactPeopleForm: () => 'OrganizationContactPeopleForm' }),
);
jest.mock(
  './OrganizationInterfacesForm',
  () => ({ OrganizationInterfacesForm: () => 'OrganizationInterfacesForm' }),
);
jest.mock(
  './OrganizationVendorInfoForm',
  () => ({ OrganizationVendorInfoForm: () => 'OrganizationVendorInfoForm' }),
);
jest.mock(
  './OrganizationAgreementsForm',
  () => ({ OrganizationAgreementsForm: () => 'OrganizationAgreementsForm' }),
);
jest.mock(
  './OrganizationAccountsForm',
  () => ({ OrganizationAccountsForm: () => 'OrganizationAccountsForm' }),
);
jest.mock('./OrganizationBankingInfoForm', () => ({
  OrganizationBankingInfoForm: () => 'OrganizationBankingInfoForm',
}));

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const organizationTypesMock = {
  records: organizationTypes,
};

const defaultProps = {
  onSubmit: jest.fn(),
  initialValues: {},
  organizationTypes: organizationTypesMock,
  cancelForm: jest.fn(),
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </MemoryRouter>
);

const renderOrganizationForm = (props = defaultProps) => render(
  <OrganizationForm {...props} />,
  { wrapper },
);

describe('OrganizationForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;

    useBankingInformationSettings.mockClear().mockReturnValue({ enabled: false });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct non-vendor form structure', () => {
    const { container, asFragment } = renderOrganizationForm();

    container.querySelector('#org-form-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct vendor form structure', () => {
    const { container, asFragment } = renderOrganizationForm({
      ...defaultProps,
      initialValues: { isVendor: true },
    });

    container.querySelector('#org-form-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct form with metadata', () => {
    const { container, asFragment } = renderOrganizationForm({
      ...defaultProps,
      initialValues: {
        metadata: {
          createdAt: '2019-04-04',
        },
      },
    });

    container.querySelector('#org-form-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render footer buttons', async () => {
    renderOrganizationForm();

    expect(screen.getByText('stripes-components.cancel')).toBeInTheDocument();
    expect(screen.getByText('stripes-components.saveAndKeepEditing')).toBeInTheDocument();
    expect(screen.getByText('stripes-components.saveAndClose')).toBeInTheDocument();
  });

  it('should call cancelForm prop when cancel button is pressed', async () => {
    const cancelForm = jest.fn();

    renderOrganizationForm({
      ...defaultProps,
      cancelForm,
    });

    await user.click(screen.getByText('stripes-components.cancel'));

    expect(cancelForm).toHaveBeenCalled();
  });

  describe('Sections toggle', () => {
    it('should have all collapsed sections by default expect summary', () => {
      const { container } = renderOrganizationForm();

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length - 1);
    });

    it('should expand sections when Expand all button is pressed', async () => {
      const { container } = renderOrganizationForm();

      await user.click(screen.getByText('stripes-components.expandAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });

    it('should render banking information form', () => {
      useBankingInformationSettings.mockReturnValue({ enabled: true });

      renderOrganizationForm({
        ...defaultProps,
        initialValues: { isVendor: true },
      });

      expect(screen.getByText('OrganizationBankingInfoForm')).toBeInTheDocument();
    });

    it('should render privileged donor contacts form', () => {
      useBankingInformationSettings.mockReturnValue({ enabled: true });

      renderOrganizationForm({
        ...defaultProps,
        initialValues: {
          isDonor: true,
          isVendor: true,
        },
      });

      expect(screen.getByText('PrivilegedDonorContacts')).toBeInTheDocument();
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', async () => {
      const { container } = renderOrganizationForm();

      act(() => {
        HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();
      });

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      const { container } = renderOrganizationForm();

      act(() => {
        HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();
      });

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should cancel form when cancel shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationForm();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'cancel').handler();

      expect(defaultProps.cancelForm).toHaveBeenCalled();
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationForm();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
