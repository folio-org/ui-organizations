import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  organization,
  organizationAuditEvent,
} from 'fixtures';
import { ORGANIZATION_VERSIONS_VIEW_ROUTE } from '../../../common/constants';
import { OrganizationVersionView } from './OrganizationVersionView';

const { organizationSnapshot } = organizationAuditEvent;

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter
      initialEntries={[{
        pathname: ORGANIZATION_VERSIONS_VIEW_ROUTE.replace(':id', organization.id),
      }]}
    >
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);

const renderOrganizationVersionView = (props = {}) => render(
  <OrganizationVersionView
    version={organizationSnapshot.map}
    {...props}
  />,
  { wrapper },
);

describe('OrganizationVersion', () => {
  it('should render version history view', async () => {
    renderOrganizationVersionView();

    expect(screen.getByText('ui-organizations.summary')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.contactInformation')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.contactPeople')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.interface')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.vendorInformation')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.vendorTerms')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.accounts')).toBeInTheDocument();
  });
});
