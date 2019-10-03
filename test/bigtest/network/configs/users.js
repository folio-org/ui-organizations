import {
  createGetAll,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

const configUsers = server => {
  server.get('users', createGetAll('users'));
};

export default configUsers;
