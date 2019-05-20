import { MAX_LIMIT } from '../common/constants';

export const updateInterfaces = (interfaces, mutator) => {
  let newQuery = 'query=(id=null)';

  if (interfaces.length >= 1) {
    const items = interfaces.map(item => {
      return `id="${item}"`;
    });
    const buildQuery = items.join(' or ');

    newQuery = `query=(${buildQuery})`;
  }

  mutator.queryCustom.update({ interfaceIDs: newQuery });
};

export const fetchInterfaces = (interfaceIds = [], mutator) => {
  let query = 'query=(id=null)';

  if (interfaceIds.length >= 1) {
    const items = interfaceIds.map(item => {
      return `id="${item}"`;
    });
    const buildQuery = items.join(' or ');

    query = `query=(${buildQuery})`;
  }

  return mutator.GET({ params: { query, limit: MAX_LIMIT } });
};
