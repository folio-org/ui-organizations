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
  contacts: [],
  emails: [],
  interfaces: [],
  phoneNumbers: [],
  urls: [],
});
