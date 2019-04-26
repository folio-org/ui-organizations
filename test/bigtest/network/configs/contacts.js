import { CONTACTS_API } from '../../../../src/common/constants';

const configContacts = server => {
  server.get(CONTACTS_API, (schema) => {
    return schema.contacts.all();
  });

  server.get(`${CONTACTS_API}/:id`, (schema, request) => {
    return schema.contacts.find(request.params.id).attrs;
  });
};

export default configContacts;
