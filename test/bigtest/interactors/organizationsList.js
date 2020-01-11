import {
  collection,
  interactor,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class OrganizationsListInteractor {
  static defaultScope = '[data-test-organizations-list]';

  hasCreateOrganizationButton = isPresent('#clickable-neworganization');

  organizationRows = collection('[role=group] [role=row]');
});
