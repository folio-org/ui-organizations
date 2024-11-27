import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  MemoryRouter,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';
import {
  AUDIT_ACQ_EVENTS_API,
  useOrganization,
} from '@folio/stripes-acq-components';

import {
  organization,
  organizationAuditEvent,
} from 'fixtures';
import { ORGANIZATION_VERSIONS_VIEW_ROUTE } from '../../common/constants';
import OrganizationVersion from './OrganizationVersion';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useOrganization: jest.fn(() => ({})),
}));

const { organizationSnapshot, ...auditEvent } = organizationAuditEvent;

const latestSnapshot = {
  ...organizationSnapshot.map,
  edition: 'Second edition',
};
const originalSnapshot = { ...organizationSnapshot };

const versions = [
  {
    ...auditEvent,
    id: 'testAuditEventId',
    organizationSnapshot: { map: latestSnapshot },
  },
  {
    ...auditEvent,
    organizationSnapshot: { map: originalSnapshot },
  },
];

const kyMock = {
  get: jest.fn((url) => ({
    json: async () => {
      const result = {};

      if (url.startsWith(`${AUDIT_ACQ_EVENTS_API}/organization/`)) {
        result.organizationAuditEvents = versions;
      }

      return Promise.resolve({
        isLoading: false,
        ...result,
      });
    },
  })),
};

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

const Component = withRouter(OrganizationVersion);
const mockDefaultContent = 'Hello world';

const renderOrganizationVersion = (props = {}) => render(
  <Switch>
    <Route
      path={ORGANIZATION_VERSIONS_VIEW_ROUTE}
      render={() => (
        <Component
          {...props}
        />
      )}
    />
    <Route
      render={() => (
        <div>{mockDefaultContent}</div>
      )}
    />
  </Switch>,
  { wrapper },
);

describe('OrganizationVersion', () => {
  beforeEach(() => {
    useOkapiKy.mockReturnValue(kyMock);
    useOrganization.mockReturnValue({
      isLoading: false,
      organization,
    });
  });

  it('should close version view when \'Version close\' button was clicked', async () => {
    renderOrganizationVersion();

    await screen.findAllByRole('button', { name: 'stripes-acq-components.versionHistory.card.select.tooltip' })
      .then(async ([selectVersionBtn]) => user.click(selectVersionBtn));

    await screen.findAllByRole('button', { name: 'stripes-components.closeItem' })
      .then(async ([closeVersionBtn]) => user.click(closeVersionBtn));

    expect(screen.queryByText(organization.name)).not.toBeInTheDocument();
    expect(screen.getByText(mockDefaultContent)).toBeInTheDocument();
  });

  it('should close version view when \'History close\' button was clicked', async () => {
    renderOrganizationVersion();

    await screen.findAllByRole('button', { name: 'stripes-acq-components.versionHistory.card.select.tooltip' })
      .then(async ([selectVersionBtn]) => user.click(selectVersionBtn));

    await screen.findAllByRole('button', { name: 'stripes-components.closeItem' })
      .then(async ([_, closeHistoryBtn]) => user.click(closeHistoryBtn));

    expect(screen.queryByText(organization.name)).not.toBeInTheDocument();
    expect(screen.getByText(mockDefaultContent)).toBeInTheDocument();
  });
});
