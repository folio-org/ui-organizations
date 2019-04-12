import { CATEGORIES_API } from '../../../../src/common/constants';

const configCategories = server => {
  server.get(CATEGORIES_API, (schema) => {
    return schema.categories.all();
  });
};

export default configCategories;
