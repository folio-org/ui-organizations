// eslint-disable-next-line import/prefer-default-export
export const getBackQuery = (orgId, entityId, entityName) => {
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  if (entityId) {
    return {
      _path: `${starting}/${entityName}/${entityId}/view`,
    };
  }

  if (!entityId && orgId) {
    return {
      _path: `/organizations/view/${orgId}`,
      layer: 'edit',
    };
  }

  return {
    _path: '/organizations/',
    layer: 'create',
    sort: 'Name',
  };
};
