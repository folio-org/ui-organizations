import {
  interactor,
  collection
} from '@bigtest/interactor';

export default interactor(class InterfacesViewInteractor {
  static defaultScope = '[data-test-interfaces-view]';
  interfaces = collection('[data-test-interfaces-view-item');
});
