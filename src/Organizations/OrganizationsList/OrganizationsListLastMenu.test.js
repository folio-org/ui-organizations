import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrganizationsListLastMenu from './OrganizationsListLastMenu';

const renderOrganizationsListLastMenu = () => render(
  <OrganizationsListLastMenu />,
  { wrapper: MemoryRouter },
);

describe('OrganizationsListLastMenu', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderOrganizationsListLastMenu();

    expect(asFragment()).toMatchSnapshot();
  });
});
