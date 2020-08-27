import React from 'react';

import { AcqNoteViewPage } from '@folio/stripes-acq-components';

import {
  NOTES_ROUTE,
  ORGANIZATIONS_ROUTE,
} from '../../common/constants';
import {
  ENTITY_TYPE_PLURALIZED_TRANSLATION_KEYS,
  ENTITY_TYPE_TRANSLATION_KEYS,
  PANE_HEADER_APP_ICON,
} from './const';

const NoteView = () => {
  return (
    <AcqNoteViewPage
      entityTypePluralizedTranslationKeys={ENTITY_TYPE_PLURALIZED_TRANSLATION_KEYS}
      entityTypeTranslationKeys={ENTITY_TYPE_TRANSLATION_KEYS}
      fallbackPath={ORGANIZATIONS_ROUTE}
      notesPath={NOTES_ROUTE}
      paneHeaderAppIcon={PANE_HEADER_APP_ICON}
    />
  );
};

export default NoteView;
