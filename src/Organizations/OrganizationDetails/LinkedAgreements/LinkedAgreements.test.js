import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { useLinkedAgreements } from '../../../common/hooks';
import { LinkedAgreements } from './LinkedAgreements';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Loading: jest.fn(() => <>Loading</>),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  FolioFormattedDate: jest.fn(({ value }) => <>{value}</>),
}));
jest.mock('../../../common/hooks', () => ({
  ...jest.requireActual('../../../common/hooks'),
  useLinkedAgreements: jest.fn(),
}));

const defaultProps = {
  id: 'linked-agreements-id',
  label: 'linked-agreements-label',
  organization: { id: 'organizationId' },
};

const renderLinkedAgreements = (props = {}) => render(
  <LinkedAgreements
    {...defaultProps}
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('LinkedAgreements', () => {
  const mockAgreements = [{
    id: 'agreementId',
    name: 'Some agreement',
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    agreementStatus: { label: 'Draft' },
  }];
  const mockDefaultResponse = {
    agreements: mockAgreements,
    isFetching: false,
    isLoading: false,
    totalCount: mockAgreements.length,
  };

  beforeEach(() => {
    useLinkedAgreements
      .mockClear()
      .mockReturnValue(mockDefaultResponse);
  });

  it('should return \'Loading\' when agreements are loading', () => {
    useLinkedAgreements.mockReturnValue({
      ...mockDefaultResponse,
      isLoading: true,
    });

    renderLinkedAgreements();

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render MCL with agreement\'s columns', () => {
    renderLinkedAgreements();

    expect(screen.getByText('ui-organizations.linkedAgreements.agreement.name')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.linkedAgreements.agreement.startDate')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.linkedAgreements.agreement.endDate')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.linkedAgreements.agreement.agreementStatus')).toBeInTheDocument();
  });
});
