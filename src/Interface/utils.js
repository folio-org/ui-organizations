// eslint-disable-next-line import/prefer-default-export
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
