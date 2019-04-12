import configOrganizations from './configs/organizations';
import configCategories from './configs/categories';
import configContacts from './configs/contacts';

export default function config() {
  configOrganizations(this);
  configCategories(this);
  configContacts(this);
}
