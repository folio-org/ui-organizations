import {
  createGetAll,
  createGetById,
  createPost,
  createPut,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { ORGANIZATIONS_API } from '../../../../src/common/constants';

const SCHEMA_NAME = 'organizations';

const configOrganizations = server => {
  server.get(ORGANIZATIONS_API, createGetAll(SCHEMA_NAME));
  server.put(`${ORGANIZATIONS_API}/:id`, createPut(SCHEMA_NAME));
  server.delete(`${ORGANIZATIONS_API}/:id`, createGetById(SCHEMA_NAME));
  server.post(`${ORGANIZATIONS_API}`, createPost(SCHEMA_NAME));
};

export default configOrganizations;
