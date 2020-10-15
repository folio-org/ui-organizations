export function asyncValidate(fetchOrgByCode, values) {
  if (!values.code) return Promise.resolve([]);

  let query = `code == ${values.code}`;

  if (values.id) query += ` and id<>"${values.id}"`;

  return fetchOrgByCode.GET({ params: { query } });
}
