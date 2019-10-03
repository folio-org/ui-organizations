import {
  createGetAll,
  createGetById,
  createPost,
  createPut,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { INTERFACES_API } from '../../../../src/common/constants';

const SCHEMA_NAME = 'interfaces';

const configInterfaces = server => {
  server.get(INTERFACES_API, createGetAll(SCHEMA_NAME));
  server.put(`${INTERFACES_API}/:id`, createPut(SCHEMA_NAME));
  server.delete(`${INTERFACES_API}/:id`, createGetById(SCHEMA_NAME));
  server.post(`${INTERFACES_API}`, createPost(SCHEMA_NAME));
};

export default configInterfaces;
