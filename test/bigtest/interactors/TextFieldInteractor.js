import {
  fillable,
  interactor,
  value,
} from '@bigtest/interactor';

@interactor class TextFieldInteractor {
  value = value();
  fill = fillable();
}

export default TextFieldInteractor;
