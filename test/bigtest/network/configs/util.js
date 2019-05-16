// eslint-disable-next-line import/prefer-default-export
export const put = (schemaName) => (schema, request) => {
  const id = request.params.id;
  const attrs = JSON.parse(request.requestBody);

  return schema[schemaName].find(id).update(attrs);
};
