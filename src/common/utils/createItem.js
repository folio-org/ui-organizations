// eslint-disable-next-line import/prefer-default-export
export const getBackPath = (orgId, entityId, entityName) => {
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  if (entityId) {
    return `${starting}/${entityName}/${entityId}/view`;
  }

  if (!entityId && orgId) {
    return `/organizations/${orgId}/edit`;
  }

  return '/organizations/create';
};
