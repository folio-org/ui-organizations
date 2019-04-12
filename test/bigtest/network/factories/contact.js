import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  prefix: faker.name.prefix,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  notes: faker.lorem.text,
});
