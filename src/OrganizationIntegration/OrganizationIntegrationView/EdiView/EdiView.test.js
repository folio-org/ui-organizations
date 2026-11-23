import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { integrationConfig } from 'fixtures';
import EdiView from './EdiView';

const defaultProps = {
  vendorEdiOrdersExportConfig: integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig,
};

const renderEdiView = (props = defaultProps) => render(
  <EdiView
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('EdiView', () => {
  it('should render EdiView', () => {
    renderEdiView();

    expect(screen.getByText('ui-organizations.integration.edi')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.vendorEdiOrdersExportConfig.ediConfig.libEdiType)).toBeInTheDocument();
  });

  it('should mark deprecated default acquisition methods', () => {
    const acqMethods = [
      { id: 'active-id', value: 'Active method' },
      { id: 'deprecated-id', value: 'Old method', deprecated: true },
    ];
    const ediConfig = {
      ...defaultProps.vendorEdiOrdersExportConfig.ediConfig,
      defaultAcquisitionMethods: acqMethods.map(({ id }) => id),
    };

    renderEdiView({
      acqMethods,
      vendorEdiOrdersExportConfig: { ...defaultProps.vendorEdiOrdersExportConfig, ediConfig },
    });

    // The test intl renders message ids: the deprecated method is suffixed
    expect(screen.getByText('Active method, stripes-acq-components.acquisition_method.deprecatedSuffix')).toBeInTheDocument();
  });

  it('should show the translated names of system acquisition methods', () => {
    const acqMethods = [{ id: 'purchase-id', value: 'Purchase' }];
    const ediConfig = {
      ...defaultProps.vendorEdiOrdersExportConfig.ediConfig,
      defaultAcquisitionMethods: ['purchase-id'],
    };

    renderEdiView({
      acqMethods,
      vendorEdiOrdersExportConfig: { ...defaultProps.vendorEdiOrdersExportConfig, ediConfig },
    });

    // The test intl renders message ids
    expect(screen.getByText('stripes-acq-components.acquisition_method.purchase')).toBeInTheDocument();
  });
});
