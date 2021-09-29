import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.datatype.uuid,
  name: faker.name.title,
  uri: faker.internet.url,
  notes: faker.lorem.text,
  available: true,
});
