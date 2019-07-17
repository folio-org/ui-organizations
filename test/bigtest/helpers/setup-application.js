import { setupStripesCore } from '@folio/stripes/core/test';
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
  });
}
