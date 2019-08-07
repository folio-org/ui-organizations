import { INTERFACE_TYPES } from '../../common/constants';

export const saveInterface = (
  { vendorInterface, interfaceCredentials, interfaceId },
  { username, password, ...values },
  creds,
) => {
  const httpMethod = values.id ? 'PUT' : 'POST';

  return vendorInterface[httpMethod](values)
    .then(({ id }) => {
      if ((!creds.id && (username || password)) || creds.username !== username || creds.password !== password) {
        interfaceId.replace(id);
        interfaceCredentials[creds.id ? 'PUT' : 'POST']({
          ...creds,
          username: username || '',
          password: password || '',
          interfaceId: id,
        });
      }

      return id;
    });
};

export const getSelectOptions = (arrayOfStringValues) => arrayOfStringValues.map(type => ({
  value: type,
  label: type,
}));

export const INTERFACE_OPTIONS = getSelectOptions(INTERFACE_TYPES);
