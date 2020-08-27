import React from 'react';

import { AcqNoteCreatePage } from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import {
  ORG_DOMAIN,
  ENTITY_TYPE_TRANSLATION_KEYS,
  PANE_HEADER_APP_ICON,
} from './const';

const NoteCreate = () => {
  return (
    <AcqNoteCreatePage
      domain={ORG_DOMAIN}
      entityTypeTranslationKeys={ENTITY_TYPE_TRANSLATION_KEYS}
      fallbackPath={ORGANIZATIONS_ROUTE}
      paneHeaderAppIcon={PANE_HEADER_APP_ICON}
    />
  );
};

export default NoteCreate;
