import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { integrationConfig } from 'fixtures';
import IntegrationInfoView from './IntegrationInfoView';

const defaultProps = {
  integrationConfig: integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig,
};

const renderIntegrationInfoView = (props = defaultProps) => render(
  <IntegrationInfoView
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('IntegrationInfoView', () => {
  it('should render IntegrationInfoView', () => {
    renderIntegrationInfoView();

    expect(screen.getByText('ui-organizations.integration.info')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.integrationConfig.configName)).toBeInTheDocument();
  });

  it('should render the names of the acquisition methods', () => {
    renderIntegrationInfoView({
      integrationConfig: {
        ...defaultProps.integrationConfig,
        ediConfig: { defaultAcquisitionMethods: ['selected-id'] },
      },
      acqMethods: [
        { id: 'selected-id', value: 'Selected method' },
        { id: 'other-id', value: 'Other method' },
      ],
    });

    expect(screen.getByText('ui-organizations.integration.info.acquisitionMethods')).toBeInTheDocument();
    expect(screen.getByText('Selected method')).toBeInTheDocument();
    expect(screen.queryByText('Other method')).not.toBeInTheDocument();
  });

  it('should mark deprecated acquisition methods', () => {
    const acqMethods = [
      { id: 'active-id', value: 'Active method' },
      { id: 'deprecated-id', value: 'Old method', deprecated: true },
    ];

    renderIntegrationInfoView({
      integrationConfig: {
        ...defaultProps.integrationConfig,
        ediConfig: { defaultAcquisitionMethods: acqMethods.map(({ id }) => id) },
      },
      acqMethods,
    });

    // The test intl renders message ids: the deprecated method is suffixed
    expect(screen.getByText('Active method, stripes-acq-components.acquisition_method.deprecatedSuffix')).toBeInTheDocument();
  });

  it('should show the translated names of system acquisition methods', () => {
    renderIntegrationInfoView({
      integrationConfig: {
        ...defaultProps.integrationConfig,
        ediConfig: { defaultAcquisitionMethods: ['purchase-id'] },
      },
      acqMethods: [{ id: 'purchase-id', value: 'Purchase' }],
    });

    // The test intl renders message ids
    expect(screen.getByText('stripes-acq-components.acquisition_method.purchase')).toBeInTheDocument();
  });
});
