import configOrganizations from './configs/organizations';
import configCategories from './configs/categories';
import configContacts from './configs/contacts';
import configInterfaces from './configs/interfaces';
import configUsers from './configs/users';

export default function config() {
  configOrganizations(this);
  configCategories(this);
  configContacts(this);
  configInterfaces(this);
  configUsers(this);
}
