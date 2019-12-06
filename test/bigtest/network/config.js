import {
  configMemberships,
  configTags,
  configUnits,
  configUsers,
} from '@folio/stripes-acq-components/test/bigtest/network';

import configOrganizations from './configs/organizations';
import configCategories from './configs/categories';
import configContacts from './configs/contacts';
import configInterfaces from './configs/interfaces';

export default function config() {
  configMemberships(this);
  configTags(this);
  configUnits(this);
  configUsers(this);
  configOrganizations(this);
  configCategories(this);
  configContacts(this);
  configInterfaces(this);
}
