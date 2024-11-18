import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization, organizationTypes } from 'fixtures';
import { QueryClient, QueryClientProvider } from 'react-query';
import OrganizationSummaryForm from './OrganizationSummaryForm';

import { useTypes } from '../../../common/hooks';

jest.mock('../../../common/hooks', () => ({
  useTypes: jest.fn(),
  useSettings: jest.fn(() => ([
    {
      id: 'f2b84177-d85a-4b0c-93dd-279e8f9d1d42',
      module: 'ORGANIZATIONS',
      configName: 'number_generator',
      enabled: true,
      value: '{"vendorGeneratorSetting":"useBoth"}',
    },
  ])),
}));

jest.mock('@folio/service-interaction', () => ({
  NumberGeneratorModalButton: () => <div>NumberGeneratorModalButton</div>
}));

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationSummaryForm
          initialValues={organization}
        />
      </form>
    );
  },
);

const queryClient = new QueryClient();

const renderForm = ({ initialValues = {} } = {}) => render(
  <QueryClientProvider client={queryClient}>
    <TestForm
      onSubmit={jest.fn()}
      initialValues={initialValues}
    />
  </QueryClientProvider>,
  { wrapper: MemoryRouter },
);

describe('OrganizationSummaryForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes, totalRecords: organizationTypes.length });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  // TODO: release blocker: enable after release
  xit('should render correct structure', async () => {
    const { asFragment } = renderForm({ initialValues: organization });

    await screen.findByText('ui-organizations.summary.name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render active type', async () => {
    renderForm({ initialValues: organization });

    expect(document.querySelector('#multiselect-option-list-organizations-type')).toBeInTheDocument();
    expect(document.querySelectorAll('#multiselect-option-list-organizations-type [role=option]').length).toEqual(1);
  });

  it('should show the label of the selected initial active value type once', async () => {
    renderForm({ initialValues: organization });

    const selectedType = await screen.findAllByText('Book trade');

    expect((selectedType).length).toEqual(1);
  });
});
