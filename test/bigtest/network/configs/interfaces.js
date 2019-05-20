import { Response } from '@bigtest/mirage';
import { noop } from 'lodash';

import { INTERFACES_API } from '../../../../src/common/constants';
import { put } from './util';

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

  server.put(`${INTERFACES_API}/:id`, put('interfaces'));

  server.post(INTERFACES_API, noop);
};

export default configInterfaces;
