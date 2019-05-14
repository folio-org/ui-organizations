import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.name.title,
  uri: faker.internet.url,
  notes: faker.lorem.text,
  username: faker.name.title,
  password: faker.internet.password,
  available: true,
});
