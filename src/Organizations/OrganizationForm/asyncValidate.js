export function asyncValidate(fetchOrgByCode, orgId, code) {
  if (!code) return Promise.resolve([]);

  let query = `code == ${code}`;

  if (orgId) query += ` and id<>"${orgId}"`;

  return fetchOrgByCode.GET({ params: { query } });
}
