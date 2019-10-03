import {
  createGetAll,
  createGetById,
  createPost,
  createPut,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { CONTACTS_API } from '../../../../src/common/constants';

const SCHEMA_NAME = 'contacts';

const configContacts = server => {
  server.get(CONTACTS_API, createGetAll(SCHEMA_NAME));
  server.get(`${CONTACTS_API}/:id`, createGetById(SCHEMA_NAME));
  server.put(`${CONTACTS_API}/:id`, createPut(SCHEMA_NAME));
  server.delete(`${CONTACTS_API}/:id`, SCHEMA_NAME);
  server.post(`${CONTACTS_API}`, createPost(SCHEMA_NAME));
};

export default configContacts;
