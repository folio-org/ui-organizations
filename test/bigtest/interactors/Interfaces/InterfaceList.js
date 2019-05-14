import {
  collection,
  interactor,
} from '@bigtest/interactor';

import Button from '../Button';

class InterfaceList {
  static defaultScope = '#interface-list';
  interfaces = collection('[class*=mclRow---]', {
    unassign: new Button('[data-test-unassign-interface]'),
  });
}

export default interactor(InterfaceList);
