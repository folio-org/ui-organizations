import { MAX_LIMIT } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const mutatorGet = (mutator, idArray = []) => {
  let query = 'query=(id=null)';

  if (idArray.length >= 1) {
    const items = idArray.map(item => {
      return `id="${item}"`;
    });
    const buildQuery = items.join(' or ');

    query = `query=(${buildQuery})`;
  }

  return mutator.GET({ params: { query, limit: MAX_LIMIT } });
};
