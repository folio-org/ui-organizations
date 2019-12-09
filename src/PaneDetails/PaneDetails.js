import React from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Button,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import { FormVendor } from '../VendorViews';

class PaneDetails extends React.Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    stripes: PropTypes.object.isRequired,
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
      dropdown: PropTypes.object.isRequired,
    }),
    parentMutator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.getVendorCategory = this.getVendorCategory.bind(this);
  }

  getPaneFooter(id, label) {
    const { pristine, submitting, handleSubmit, onCancel } = this.props;

    const start = (
      <FormattedMessage id="ui-organizations.button.cancel">
        {(btnLabel) => (
          <Button
            id="clickable-close-orgazitation-dialog-footer"
            buttonStyle="default mega"
            onClick={onCancel}
          >
            {btnLabel}
          </Button>
        )}
      </FormattedMessage>
    );

    const end = (
      <Button
        id={id}
        type="submit"
        buttonStyle="primary mega"
        disabled={pristine || submitting}
        onClick={handleSubmit}
      >
        {label}
      </Button>
    );

    return (
      <PaneFooter
        renderStart={start}
        renderEnd={end}
      />
    );
  }

  getVendorCategory() {
    const { parentResources } = this.props;
    const records = (parentResources.vendorCategory || {}).records || [];

    if (records.length === 0) return null;

    return records;
  }

  deleteVendor(ID) {
    const { parentMutator } = this.props;

    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: '/organization',
        layer: null,
      });
    });
  }

  dispatchChange = (fieldName, value) => {
    const { change, dispatch } = this.props;

    dispatch(change(fieldName, value));
  };

  render() {
    const { initialValues, stripes, onCancel } = this.props;

    const paneTitle = initialValues.id ?
      <FormattedMessage id="ui-organizations.editOrg.title" values={{ name: get(initialValues, ['name'], '') }} /> :
      <FormattedMessage id="ui-organizations.createOrg.title" />;
    const paneFooter = initialValues.id ?
      this.getPaneFooter('clickable-update-organization', <FormattedMessage id="ui-organizations.button.saveAndClose" />) :
      this.getPaneFooter('clickable-create-organization', <FormattedMessage id="ui-organizations.button.saveAndClose" />);
    const { isVendor, language } = getFormValues('FormVendor')(stripes.store.getState()) || {};

    return (
      <form id="form-vendor">
        <Pane
          data-test-form-vendor-pane
          defaultWidth="100%"
          dismissible
          footer={paneFooter}
          paneTitle={paneTitle}
          onClose={onCancel}
        >
          <FormVendor
            isVendor={isVendor}
            dispatchChange={this.dispatchChange}
            dropdownVendorCategories={this.getVendorCategory()}
            deleteVendor={this.deleteVendor}
            language={language}
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
