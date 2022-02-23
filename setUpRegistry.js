import { InternalContactsArrayDisplay } from '@folio/stripes-erm-components';
import OrganizationLookup from './OrganizationLookup';

const setUpRegistry = (registry) => {
  // Organization Resource
  const organizationReg = registry.registerResource('organization');

  organizationReg.setViewResources('/organizations/organizations');
  organizationReg.setViewResource(organization => `/organizations/organizations/${organization.id}`);

  organizationReg.setRenderFunction('internalContacts', record => {
    return <InternalContactsArrayDisplay contacts={record.contacts} />;
  });

  // Lookup plugin
  organizationReg.setLookupComponent(OrganizationLookup);
};

export default setUpRegistry;
