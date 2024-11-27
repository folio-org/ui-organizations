import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { useCategories } from '@folio/stripes-acq-components';

import {
  organization,
  organizationAuditEvent,
} from 'fixtures';
import { ORGANIZATION_VERSIONS_VIEW_ROUTE } from '../../../common/constants';
import { OrganizationVersionView } from './OrganizationVersionView';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useCategories: jest.fn(),
}));

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
  beforeEach(() => {
    useCategories.mockReturnValue({ categories: [{ id: 'f52ceea4-8e35-404b-9ebd-5c7db6613195', value: 'cat' }] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
