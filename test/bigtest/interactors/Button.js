import {
  interactor,
  is,
  property,
} from '@bigtest/interactor';

class Button {
  isButton = is('button');
  isDisabled = property('disabled');
}

export default interactor(Button);
