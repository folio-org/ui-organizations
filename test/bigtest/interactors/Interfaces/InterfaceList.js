import {
  collection,
  interactor,
} from '@bigtest/interactor';

class InterfaceList {
  static defaultScope = '#interface-list';
  contacts = collection('[class*=mclRow---]');
}

export default interactor(InterfaceList);
