import OrganizationLookup from './OrganizationLookup';

const setUpRegistry = (registry) => {
  // Organization Resource
  const organizationReg = registry.registerResource('organization');

  organizationReg.setViewResources('/organizations');
  organizationReg.setViewResource(organization => `/organizations/view/${organization.id}`);

  // Lookup plugin
  organizationReg.setLookupComponent(OrganizationLookup);
};

export default setUpRegistry;
