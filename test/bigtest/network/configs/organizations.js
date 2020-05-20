import {
  createGetAll,
  createGetById,
  createPost,
  createPut,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { VENDORS_API } from '@folio/stripes-acq-components';

const SCHEMA_NAME = 'organizations';

const configOrganizations = server => {
  server.get(VENDORS_API, createGetAll(SCHEMA_NAME));
  server.get(`${VENDORS_API}/:id`, createGetById(SCHEMA_NAME));
  server.put(`${VENDORS_API}/:id`, createPut(SCHEMA_NAME));
  server.delete(`${VENDORS_API}/:id`, SCHEMA_NAME);
  server.post(`${VENDORS_API}`, createPost(SCHEMA_NAME));
};

export default configOrganizations;
