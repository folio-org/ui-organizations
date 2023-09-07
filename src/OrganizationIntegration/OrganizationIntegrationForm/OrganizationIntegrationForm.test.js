import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { queryHelpers } from '@folio/jest-config-stripes/testing-library/dom';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import {
  EDI_CODE_TYPES,
  FTP_TYPES,
  TRANSMISSION_MODES,
  CONNECTION_MODES,
} from '../constants';
import OrganizationIntegrationForm from './OrganizationIntegrationForm';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
// eslint-disable-next-line react/prop-types
jest.mock('@folio/stripes-components/lib/AutoSuggest', () => (props) => <input {...props.input} />);

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const initialValues = {
  schedulePeriod: 'NONE',
  type: 'EDIFACT_ORDERS_EXPORT',
  exportTypeSpecificParameters: {
    vendorEdiOrdersExportConfig: {
      vendorId: 'orgId',
      ediConfig: {
        accountNoList: [],
        defaultAcquisitionMethods: [],
        vendorEdiType: EDI_CODE_TYPES[0].value,
        libEdiType: EDI_CODE_TYPES[0].value,
      },
      editFtp: {
        ftpFormat: FTP_TYPES[0].value,
        ftpMode: TRANSMISSION_MODES[0].value,
        ftpConnMode: CONNECTION_MODES[0].value,
      },
    },
  },
};

const defaultProps = {
  acqMethods: [],
  accounts: ['123', '456'],
  defaultIntegration: undefined,
  onSubmit: jest.fn(),
  initialValues,
  onClose: jest.fn(),
  paneTitle: 'Create integration',
};
const renderOrganizationIntegrationForm = (props = defaultProps) => render(
  <OrganizationIntegrationForm {...props} />,
  { wrapper: MemoryRouter },
);

describe('OrganizationIntegrationForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct form structure', () => {
    const { container, asFragment } = renderOrganizationIntegrationForm();

    container.querySelector('#org-integration-form-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Sections toggle', () => {
    it('should have all expanded sections by default', () => {
      const { container } = renderOrganizationIntegrationForm();

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse sections when Collapse all button is pressed', async () => {
      const { container } = renderOrganizationIntegrationForm();

      await user.click(screen.getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', async () => {
      expandAllSections.mockClear();
      renderOrganizationIntegrationForm();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      collapseAllSections.mockClear();
      renderOrganizationIntegrationForm();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should cancel form when cancel shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationIntegrationForm();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'cancel').handler();

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationIntegrationForm();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
