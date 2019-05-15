// eslint-disable-next-line import/prefer-default-export
export const saveInterface = (mutator, values) => {
  const httpMethod = values.id ? mutator.PUT : mutator.POST;

  return httpMethod(values);
};
