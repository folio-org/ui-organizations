import { Factory } from 'miragejs';
import faker from 'faker';

import { ORGANIZATION_STATUS } from '../../../../src/common/constants';

export default Factory.extend({
  id: faker.datatype.uuid,
  name: () => faker.company.companyName(),
  code: faker.datatype.uuid,
  description: faker.lorem.text,
  status: ORGANIZATION_STATUS.active,
  accounts: [],
  addresses: [],
  agreements: [],
  contacts: [faker.datatype.uuid],
  emails: [],
  interfaces: [],
  phoneNumbers: [],
  urls: [],
  metadata: {
    createdDate: faker.date.past(),
    createdByUserId: faker.datatype.uuid,
    updatedDate: faker.date.past(),
    updatedByUserId: faker.datatype.uuid,
  },
});
