import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';

class CategorySettings extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes } = this.props;
    const columnMapping = {
      value: <FormattedMessage id="ui-organizations.settings.name" />,
      action: <FormattedMessage id="ui-organizations.settings.action" />,
    };
    const getDisableAttr = () => ({
      disabled: !stripes.hasPerm('ui-organizations.settings'),
    });
    const actionProps = {
      create: getDisableAttr,
      edit: getDisableAttr,
      delete: getDisableAttr,
    };

    return (
      <this.connectedControlledVocab
        stripes={stripes}
        baseUrl="organizations-storage/categories"
        records="categories"
        label={<FormattedMessage id="ui-organizations.settings.categories" />}
        labelSingular="Category"
        objectLabel="Categories"
        visibleFields={['value']}
        columnMapping={columnMapping}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="categories"
        id="categories"
        sortby="value"
        actionProps={actionProps}
      />
    );
  }
}

export default CategorySettings;
