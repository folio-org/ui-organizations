import { useShowCallout } from '@folio/stripes-acq-components';

export default function useSaveInterface() {
  const showCallout = useShowCallout();

  return (
    { vendorInterface, interfaceCredentials, interfaceId, interfaceOrg },
    { username, password, ...values },
    creds,
    org,
  ) => {
    const isNew = !values.id;
    const httpMethod = isNew ? 'POST' : 'PUT';
    let savedInterfaceId = values.id;

    return vendorInterface[httpMethod](values)
      .then(
        ({ id }) => {
          showCallout({ messageId: 'ui-organizations.interface.message.saved.success' });
          savedInterfaceId = id;
          if (isNew && org?.id) {
            return interfaceOrg.PUT({
              ...org,
              interfaces: [...org.interfaces, id],
            });
          }

          return undefined;
        },
        () => {
          showCallout({ messageId: 'ui-organizations.interface.message.saved.fail', type: 'error' });
        },
      )
      .catch(() => {
        showCallout({ messageId: 'ui-organizations.save.error.assignInterface', type: 'error' });
      })
      .then(() => {
        if (
          savedInterfaceId && (
            (!creds.id && (username || password)) ||
            creds.username !== username ||
            creds.password !== password
          )
        ) {
          interfaceId.replace(savedInterfaceId);

          return interfaceCredentials[creds.id ? 'PUT' : 'POST']({
            ...creds,
            username: username || '',
            password: password || '',
            interfaceId: savedInterfaceId,
          });
        }

        return savedInterfaceId;
      })
      .then(
        () => savedInterfaceId,
        () => {
          showCallout({ messageId: 'ui-organizations.save.error.creds', type: 'error' });

          return savedInterfaceId;
        },
      );
  };
}
