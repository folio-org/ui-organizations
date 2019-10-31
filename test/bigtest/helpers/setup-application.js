import { setupStripesCore } from '@folio/stripes/core/test';
import translations from '@folio/stripes-acq-components/translations/stripes-acq-components/en';
import prefixKeys from '@folio/stripes-acq-components/test/bigtest/helpers/prefixKeys';

import mirageOptions from '../network';

export default function setupApplication({
  scenarios,
  permissions = {},
  hasAllPerms = true,
} = {}) {
  setupStripesCore({
    mirageOptions,
    scenarios,
    stripesConfig: {
      hasAllPerms,
    },
    permissions,
    translations: prefixKeys(translations, 'stripes-acq-components'),
  });
}
