import { without } from 'lodash';

export const unassignInterface = (mutator, interfaceId, org) => {
  if (org) {
    const interfaces = without(org.interfaces, interfaceId);
    return mutator.PUT({
      ...org,
      interfaces,
    });
  }

  return Promise.resolve();
};

export const deleteInterface = (orgMutator, interfaceMutator, interfaceId, org) => {
  if (interfaceId) {
    return unassignInterface(orgMutator, interfaceId, org)
      .then(() => interfaceMutator.DELETE({ id: interfaceId }));
  }

  return Promise.resolve();
};
