import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  Icon,
} from '@folio/stripes/components';

import {
  categoriesResource,
} from '../../../common/resources';
import { DICT_CATEGORIES } from '../../../common/constants';
import { useTranslatedCategories } from '../../../common/hooks';
import OrganizationContactInfoForm from './OrganizationContactInfoForm';

const OrganizationContactInfoFormContainer = ({ mutator, defaultLanguage }) => {
  const [categoriesDict, setCategoriesDict] = useState([]);
  const [translatedCategories] = useTranslatedCategories(categoriesDict);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mutator[DICT_CATEGORIES].GET()
      .then(setCategoriesDict)
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Icon
        icon="spinner-ellipsis"
        width="100px"
      />
    );
  }

  return (
    <OrganizationContactInfoForm
      defaultLanguage={defaultLanguage}
      vendorCategories={translatedCategories}
    />
  );
};

OrganizationContactInfoFormContainer.manifest = Object.freeze({
  [DICT_CATEGORIES]: {
    ...categoriesResource,
    accumulate: true,
    fetch: false,
  },
});

OrganizationContactInfoFormContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string,
};

export default stripesConnect(OrganizationContactInfoFormContainer);
