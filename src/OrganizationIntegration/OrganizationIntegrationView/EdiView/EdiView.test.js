import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

import { integrationConfig } from '../../../../test/jest/fixtures';
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
});
