import { validateRequired } from '@folio/stripes-acq-components';

import { validateOrgCode } from './validateOrgCode';

jest.mock('@folio/stripes-acq-components', () => ({
  validateRequired: jest.fn(),
}));

const fetchOrgByCodeMutator = {
  GET: jest.fn(),
};
const orgId = 'orgId';
const orgCode = 'YANKEE/E';

describe('validateOrgCode', () => {
  beforeEach(() => {
    validateRequired.mockClear().mockReturnValue(undefined);
    fetchOrgByCodeMutator.GET.mockClear().mockReturnValue(Promise.resolve([]));
  });

  it('should return error when required validation is not passed', async () => {
    const requiredError = 'requiredError';

    validateRequired.mockReturnValue(requiredError);

    const error = await validateOrgCode(fetchOrgByCodeMutator, orgId, orgCode);

    expect(error).toBe(requiredError);
  });

  it('should make a request with passed code to validate existance', async () => {
    await validateOrgCode(fetchOrgByCodeMutator, undefined, orgCode);

    expect(fetchOrgByCodeMutator.GET).toHaveBeenCalledWith({
      params: { query: 'code=="YANKEE/E"' },
    });
  });

  it('should make a request with passed code to validate existance except current org', async () => {
    await validateOrgCode(fetchOrgByCodeMutator, orgId, orgCode);

    expect(fetchOrgByCodeMutator.GET).toHaveBeenCalledWith({
      params: { query: 'code=="YANKEE/E" and id<>"orgId"' },
    });
  });

  it('should return error when code is not unique', async () => {
    fetchOrgByCodeMutator.GET.mockClear().mockReturnValue(Promise.resolve([{ code: orgCode }]));

    const error = await validateOrgCode(fetchOrgByCodeMutator, undefined, orgCode);

    expect(error).toBeDefined();
  });

  it('should not return error when code is unique', async () => {
    fetchOrgByCodeMutator.GET.mockClear().mockReturnValue(Promise.resolve([]));

    const error = await validateOrgCode(fetchOrgByCodeMutator, undefined, orgCode);

    expect(error).not.toBeDefined();
  });
});
