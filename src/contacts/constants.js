import React from 'react';
import { FormattedMessage } from 'react-intl';

export const CONTACT_PERSON_ACCORDIONS = {
  NAME: 'name',
  EMAILS: 'emails',
  PHONES: 'phones',
  URLS: 'urls',
  ADDRESSES: 'addresses',
};

export const CONTACT_PERSON_ACCORDION_LABELS = {
  [CONTACT_PERSON_ACCORDIONS.NAME]: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  [CONTACT_PERSON_ACCORDIONS.EMAILS]: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  [CONTACT_PERSON_ACCORDIONS.PHONES]: <FormattedMessage id="ui-organizations.contactPeople.phone" />,
  [CONTACT_PERSON_ACCORDIONS.URLS]: <FormattedMessage id="ui-organizations.contactPeople.url" />,
  [CONTACT_PERSON_ACCORDIONS.ADDRESSES]: <FormattedMessage id="ui-organizations.contactPeople.address" />,
};
