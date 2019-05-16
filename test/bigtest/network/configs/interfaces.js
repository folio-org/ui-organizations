import { Response } from '@bigtest/mirage';
import { noop } from 'lodash';

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

  server.put(`${INTERFACES_API}/:id`, (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);

    return schema.interfaces.find(id).update(attrs);
  });

  server.post(INTERFACES_API, noop);
};

export default configInterfaces;
