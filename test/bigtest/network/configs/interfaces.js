import { Response } from '@bigtest/mirage';

import { INTERFACES_API } from '../../../../src/common/constants';

const configInterfaces = server => {
  server.get(INTERFACES_API, (schema) => {
    return schema.interfaces.all();
  });

  server.get(`${INTERFACES_API}/:id`, (schema, request) => {
    const orgInterface = schema.interfaces.find(request.params.id);
    return orgInterface
      ? orgInterface.attrs
      : new Response(404, { errors: 'interface not found' });
  });

  server.put(`${INTERFACES_API}/:id`);

  server.post(`${INTERFACES_API}`);
};

export default configInterfaces;
