import { ORGANIZATIONS_API } from '../../../../src/common/constants';

const configOrganizations = server => {
  server.get(ORGANIZATIONS_API, (schema) => {
    return schema.organizations.all();
  });

  server.put(`${ORGANIZATIONS_API}/:id`);
};

export default configOrganizations;
