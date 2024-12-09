import get from 'lodash/get';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import {
  fetchAcqUnitsByIds,
  getVersionMetadata,
  useOrganization,
  useUsersBatch,
} from '@folio/stripes-acq-components';

import { organizationAuditEvent } from 'fixtures';
import {
  useContactsByIds,
  useInterfacesByIds,
  useTypes,
} from '../../../../common/hooks';
import { useSelectedOrganizationVersion } from './useSelectedOrganizationVersion';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  fetchAcqUnitsByIds: jest.fn(),
  getVersionMetadata: jest.fn(),
  useOrganization: jest.fn(),
  useUsersBatch: jest.fn(),
}));
jest.mock('../../../../common/hooks', () => ({
  ...jest.requireActual('../../../../common/hooks'),
  useContactsByIds: jest.fn(),
  useInterfacesByIds: jest.fn(),
  useTypes: jest.fn(),
}));

const versionId = organizationAuditEvent.id;
const versions = [organizationAuditEvent];
const snapshotPath = 'organizationSnapshot.map';

const contacts = [{ id: 'contact1' }];
const interfaces = [{ id: 'interface1' }];
const organization = { id: 'org1' };
const users = [{ id: 'user1', personal: { firstName: 'John', lastName: 'Doe' } }];
const organizationTypes = [{
  id: 'e7e9af00-c12c-448f-8ad1-d15ff209605a',
  name: 'Type name',
}];

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useSelectedOrganizationVersion', () => {
  beforeEach(() => {
    fetchAcqUnitsByIds.mockReturnValue(() => Promise.resolve([{ id: 'acq-unit-id' }]));
    useOrganization.mockReturnValue({ organization, isLoading: false });
    useUsersBatch.mockReturnValue({ users, isLoading: false });
    useContactsByIds.mockReturnValue({ contacts, isLoading: false });
    useInterfacesByIds.mockReturnValue({ interfaces, isLoading: false });
    useTypes.mockReturnValue({ organizationTypes, isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return selected version data', async () => {
    const { result } = renderHook(
      () => useSelectedOrganizationVersion({ versionId, versions, snapshotPath }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.selectedVersion).toEqual({
      ...get(organizationAuditEvent, snapshotPath),
      accounts: get(organizationAuditEvent, `${snapshotPath}.accounts`).map(acc => ({
        ...acc,
        acqUnits: [],
      })),
      acqUnits: '',
      createdByUser: null,
      contactsList: contacts,
      interfacesList: interfaces,
      organizationTypesResolved: 'Type name',
      vendorCurrenciesValue: 'US Dollar (USD)',
      metadata: getVersionMetadata(organizationAuditEvent, organization),
    });
  });
});
