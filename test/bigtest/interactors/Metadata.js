import {
  interactor,
} from '@bigtest/interactor';

class Metadata {
  static defaultScope = '[class*=metaSectionRoot]';
}

export default interactor(Metadata);
