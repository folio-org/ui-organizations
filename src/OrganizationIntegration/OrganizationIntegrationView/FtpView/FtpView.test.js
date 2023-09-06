import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { integrationConfig } from 'fixtures';
import FtpView from './FtpView';

const defaultProps = {
  ediFtp: integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp,
};

const renderFtpView = (props = defaultProps) => render(
  <FtpView
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('FtpView', () => {
  it('should render FtpView', () => {
    renderFtpView();

    expect(screen.getByText('ui-organizations.integration.ftp')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.ediFtp.ftpConnMode)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.ediFtp.ftpFormat)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.ediFtp.ftpMode)).toBeInTheDocument();
  });
});
