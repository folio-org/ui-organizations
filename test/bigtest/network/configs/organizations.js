import { noop } from 'lodash';

import { ORGANIZATIONS_API } from '../../../../src/common/constants';
import { put } from './util';

const configOrganizations = server => {
  server.get(ORGANIZATIONS_API, (schema) => {
    return schema.organizations.all();
  });

  server.put(`${ORGANIZATIONS_API}/:id`, put('organizations'));

  server.delete(`${ORGANIZATIONS_API}/:id`, 'organizations');

  server.post(`${ORGANIZATIONS_API}`, noop);
};

export default configOrganizations;
