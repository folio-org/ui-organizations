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
});
