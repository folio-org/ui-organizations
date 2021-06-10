import React from 'react';
import { render, screen } from '@testing-library/react';

import { ediCodeTypeOptions } from './utils';
import OrganizationEDIInfo from './OrganizationEDIInfo';

const edi = {
  libEdiType: ediCodeTypeOptions[0].value,
  ediJob: {},
  ediFtp: {},
};
const renderOrganizationEDIInfo = () => render(
  <OrganizationEDIInfo edi={edi} />,
);

describe('OrganizationEDIInfo', () => {
  it('should EDI base info', () => {
    renderOrganizationEDIInfo();

    expect(screen.getByText('ui-organizations.edi.ediBasic')).toBeDefined();
  });

  it('should EDI ftp info', () => {
    renderOrganizationEDIInfo();

    expect(screen.getByText('ui-organizations.edi.ftpDetails')).toBeDefined();
  });

  it('should EDI job info', () => {
    renderOrganizationEDIInfo();

    expect(screen.getByText('ui-organizations.edi.scheduling')).toBeDefined();
  });

  it('should display formatted EDI type', () => {
    renderOrganizationEDIInfo();

    expect(screen.getByText(ediCodeTypeOptions[0].label)).toBeDefined();
  });
});
