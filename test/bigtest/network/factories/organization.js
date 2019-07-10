import { Factory, faker } from '@bigtest/mirage';

import { ORGANIZATION_STATUS } from '../../../../src/common/constants';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.company.companyName,
  code: faker.random.uuid,
  description: faker.lorem.text,
  status: ORGANIZATION_STATUS.active,
  addresses: [],
  agreements: [],
  contacts: [faker.random.uuid],
  emails: [],
  interfaces: [],
  phoneNumbers: [],
  urls: [],
  metadata: {
    createdDate: faker.date.past(),
    createdByUserId: faker.random.uuid,
    updatedDate: faker.date.past(),
    updatedByUserId: faker.random.uuid,
  },
});
