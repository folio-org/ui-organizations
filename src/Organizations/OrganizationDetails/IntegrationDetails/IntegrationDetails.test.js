import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import IntegrationDetails from './IntegrationDetails';

const renderIntegrationDetails = (props = {}) => render(
  <IntegrationDetails
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('IntegrationDetails', () => {
  it('should render IntegrationDetails list', () => {
    renderIntegrationDetails({ integrationConfigs: [{}], orgId: 'orgId' });

    expect(screen.getByText('ui-organizations.main.description')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.main.name')).toBeInTheDocument();
  });
});
