import BaseSerializer from './base';

const { isArray } = Array;

export default BaseSerializer.extend({
  serialize(...args) {
    const json = BaseSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.organizations)) {
      return {
        organizations: json.organizations,
        totalRecords: json.organizations.length,
      };
    }

    return json.organizations;
  },
});
