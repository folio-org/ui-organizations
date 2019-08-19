import {
  interactor,
} from '@bigtest/interactor';

import Button from './Button';

export default @interactor class OrganizationSettingsInteractor {
  static defaultScope = '#ModuleContainer';

  buttonNewCategory = new Button('#clickable-add-categories');
}
