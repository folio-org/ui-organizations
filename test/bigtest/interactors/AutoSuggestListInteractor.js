import {
  interactor,
  clickable,
  collection,
  text,
  isVisible,
} from '@bigtest/interactor';

@interactor class listItemInteractor {
  text = text();
  click = clickable();
}

@interactor class AutoSuggestListInteractor {
  isOpen = isVisible();
  items = collection('li', listItemInteractor);
}

export default AutoSuggestListInteractor;
