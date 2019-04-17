import React from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import { Pane, PaneMenu, Button } from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import css from './PaneDetails.css';
import { FormVendor } from '../VendorViews';
import { getDropDownItems } from '../common/utils/dropdown';

class PaneDetails extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
    parentMutator: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.getVendorCategory = this.getVendorCategory.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button type="button" id="clickable-closenewvendordialog" onClick={onCancel} title="close" aria-label="Close New Vendor Dialog">
          <span className={css.closeButton}>&times;</span>
        </button>
      </PaneMenu>
    );
  }

  getLastMenu(id, labelId) {
    const { pristine, submitting, handleSubmit } = this.props;
    const label = <FormattedMessage id={labelId} />;

    return (
      <PaneMenu>
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          onClick={handleSubmit}
          style={{ marginBottom: '0' }}
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  getVendorCategory() {
    const { parentResources } = this.props;
    const records = (parentResources.vendorCategory || {}).records || [];
    if (records.length === 0) return null;
    return records;
  }

  getCountryList() {
    const { parentResources } = this.props;
    return getDropDownItems(parentResources, 'countryList', true);
  }

  getLanguageList() {
    const { parentResources } = this.props;
    return getDropDownItems(parentResources, 'languageList', false);
  }

  getCurrencies() {
    const { parentResources } = this.props;
    const data = (parentResources.dropdown || {}).currencyDD || [];
    if (!data || data.length === 0) return null;
    return data;
  }

  getPhoneType() {
    const { parentResources } = this.props;
    return getDropDownItems(parentResources, 'phoneTypeDD', false);
  }

  deleteVendor(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: '/organization',
        layer: null
      });
    });
  }

  render() {
    const { initialValues, stripes } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ?
      <FormattedMessage id="ui-organizations.editOrg.title" values={{ name: get(initialValues, ['name'], '') }} /> :
      <FormattedMessage id="ui-organizations.createOrg.title" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-update-organization', 'ui-organizations.editOrg.submit') :
      this.getLastMenu('clickable-create-organization', 'ui-organizations.createOrg.submit');
    const isVendor = getFormValues('FormVendor')(stripes.store.getState()).isVendor;

    return (
      <form id="form-vendor">
        <Pane defaultWidth="100%" firstMenu={firstMenu} lastMenu={lastMenu} paneTitle={paneTitle}>
          <FormVendor
            isVendor={isVendor}
            dropdownCurrencies={this.getCurrencies()}
            dropdownVendorCategories={this.getVendorCategory()}
            dropdownLanguages={this.getLanguageList()}
            dropdownCountry={this.getCountryList()}
            dropdownPhoneType={this.getPhoneType()}
            deleteVendor={this.deleteVendor}
            {...this.props}
          />
        </Pane>
      </form>
    );
  }
}

export default stripesForm({
  form: 'FormVendor',
  navigationCheck: true,
  enableReinitialize: true,
})(PaneDetails);
