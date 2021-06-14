import React from 'react';
import { render, screen } from '@testing-library/react';
import { queryHelpers } from '@testing-library/dom';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import OrganizationForm from './OrganizationForm';

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
  './OrganizationEDIInfoForm',
  () => ({ OrganizationEDIInfoForm: () => 'OrganizationEDIInfoForm' }),
);
jest.mock(
  './OrganizationAccountsForm',
  () => ({ OrganizationAccountsForm: () => 'OrganizationAccountsForm' }),
);

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const defaultProps = {
  onSubmit: jest.fn(),
  initialValues: {},
  cancelForm: jest.fn(),
};
const renderOrganizationForm = (props = defaultProps) => render(
  <OrganizationForm {...props} />,
  { wrapper: MemoryRouter },
);

describe('OrganizationForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct non-vendor form structure', () => {
    const { asFragment } = renderOrganizationForm();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct vendor form structure', () => {
    const { asFragment } = renderOrganizationForm({
      ...defaultProps,
      initialValues: { isVendor: true },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct form with metadata', () => {
    const { asFragment } = renderOrganizationForm({
      ...defaultProps,
      initialValues: {
        metadata: {
          createdAt: '2019-04-04',
        },
      },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call cancelForm prop when cancel button is pressed', () => {
    const cancelForm = jest.fn();

    renderOrganizationForm({
      ...defaultProps,
      cancelForm,
    });

    user.click(screen.getByText('stripes-acq-components.FormFooter.cancel'));

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

    it('should expand sections when Expand all button is pressed', () => {
      const { container } = renderOrganizationForm();

      user.click(screen.getByText('stripes-components.expandAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });
  });
});
