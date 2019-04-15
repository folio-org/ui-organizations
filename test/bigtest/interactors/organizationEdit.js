import {
  interactor,
  Interactor,
} from '@bigtest/interactor';

import Button from './Button';
import ContactPeopleSection from './ContactPeopleSection';
import SummarySection from './SummarySection';

export default interactor(class OrganizationEditInteractor {
  static defaultScope = '#form-vendor';

  contactPeopleSection = new ContactPeopleSection();
  updateVendorButton = new Button('#clickable-updatevendor');
  summarySection = new SummarySection();
  name = new Interactor('input[name="name"]');
});
