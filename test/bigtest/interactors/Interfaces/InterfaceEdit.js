import {
  Interactor,
  interactor,
  selectable,
  text,
} from '@bigtest/interactor';

import Button from '../Button';

export default interactor(class InterfaceEditInteractor {
  static defaultScope = '#edit-interface';

  name = new Interactor('input[name="name"]');
  selectType = selectable('select[name="type"]');
  saveButton = new Button('[type="submit"]');
  paneTitle = text('[class*="paneTitleLabel---"]');
});
