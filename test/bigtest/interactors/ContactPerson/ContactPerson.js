import {
  interactor,
} from '@bigtest/interactor';

export default interactor(class ContactPersonInteractor {
  static defaultScope = '[data-test-contact-person]';
});
