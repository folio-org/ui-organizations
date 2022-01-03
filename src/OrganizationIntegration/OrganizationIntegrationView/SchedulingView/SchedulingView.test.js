import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

import { integrationConfig } from '../../../../test/jest/fixtures';
import SchedulingView from './SchedulingView';

const defaultProps = {
  ediSchedule: integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule,
};

const renderSchedulingView = (props = defaultProps) => render(
  <SchedulingView
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('FtpView', () => {
  it('should render FtpView', () => {
    renderSchedulingView();

    expect(screen.getByText('ui-organizations.integration.scheduling')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.integration.scheduling.scheduleEDI')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.integration.scheduling.schedulePeriod')).toBeInTheDocument();
  });

  it('should render only Schedule Enabled checkbox', () => {
    renderSchedulingView({
      ediSchedule: {
        ...integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule,
        enableScheduledExport: false,
      },
    });

    expect(screen.queryByText('ui-organizations.integration.scheduling.schedulePeriod')).toBeNull();
  });
});
