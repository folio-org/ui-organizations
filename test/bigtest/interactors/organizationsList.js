import {
  collection,
  fillable,
  interactor,
  isPresent,
} from '@bigtest/interactor';

import { ButtonInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

@interactor class FiltersInteractor {
  static defaultScope = '[data-test-filter-pane]';

  searchInput = fillable('[data-test-single-search-form] input[type="search"]');
  searchButton = new ButtonInteractor('[data-test-single-search-form-submit]');
}

export default interactor(class OrganizationsListInteractor {
  static defaultScope = '[data-test-organizations-list]';

  hasCreateOrganizationButton = isPresent('#clickable-neworganization');
  isNoResultsMessageLabelPresent = isPresent('[class*=mclEmptyMessage---]');
  organizationRows = collection('[role=group] [role=row]');
  filters = new FiltersInteractor();
});
