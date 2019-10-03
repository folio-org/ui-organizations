import {
  createGetAll,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { CATEGORIES_API } from '../../../../src/common/constants';

const configCategories = server => {
  server.get(CATEGORIES_API, createGetAll('categories'));
};

export default configCategories;
