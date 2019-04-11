import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.company.companyName,
  code: faker.random.uuid,
  description: faker.lorem.text,
  status: 'active',
  addresses: [],
  agreements: [],
  contacts: [],
  emails: [],
  interfaces: [],
  phoneNumbers: [],
  urls: [],
});
