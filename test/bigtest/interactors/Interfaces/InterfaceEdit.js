import {
  clickable,
  Interactor,
  interactor,
  text,
} from '@bigtest/interactor';

import Button from '../Button';

export default interactor(class InterfaceEditInteractor {
  static defaultScope = '#edit-interface';

  name = new Interactor('input[name="name"]');
  saveButton = new Button('[type="submit"]');
  paneTitle = text('[class*="paneTitleLabel---"]');
});
