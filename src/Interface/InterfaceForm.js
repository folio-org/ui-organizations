
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea, Select, Checkbox } from '@folio/stripes/components';
import { isURLValid } from '../Utils/Validate';
import TogglePassword from '../Utils/TogglePassword';
import css from './InterfaceForm.css';
import { getDropDownItems } from '../common/utils/dropdown';

class InterfaceForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.renderInterfaceForm = this.renderInterfaceForm.bind(this);
    this.renderInterfaceSubForm = this.renderInterfaceSubForm.bind(this);
  }

  renderInterfaceForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={6}>
              <div><em>{<FormattedMessage id="ui-organizations.interface.pleaseAddInterface" />}</em></div>
            </Col>
          }
          {fields.map(this.renderInterfaceSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-organizations.interface.add" />}</Button>
        </Col>
      </Row>
    );
  };

  renderInterfaceSubForm = (elem, index, fields) => {
    const { parentResources } = this.props;
    const formatDD = getDropDownItems(parentResources, 'formatDD', false);
    const deliveryMethodDD = getDropDownItems(parentResources, 'deliveryMethodDD', false);

    return (
      <div key={index} className={css.panels}>
        <Row>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.name" />} name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.uri" />} name={`${elem}.uri`} id={`${elem}.uri`} type="url" validate={[isURLValid]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.username" />} name={`${elem}.username`} id={`${elem}.username`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <TogglePassword name={`${elem}.password`} id={`${elem}.password`} buttonID={`${elem}.button`} />
          </Col>
          <Col xs={12}>
            <Field label={<FormattedMessage id="ui-organizations.interface.notes" />} name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.interface.statistics" />}</div>
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.available" />} name={`${elem}.available`} id={`${elem}.available`} component={Checkbox} />
          </Col>
          <Col xs={12} md={6}>
            <Field
              label={<FormattedMessage id="ui-organizations.interface.deliveryMethod" />}
              name={`${elem}.deliveryMethod`}
              component={Select}
              fullWidth
              dataOptions={deliveryMethodDD}
            />
          </Col>
          <Col xs={12} md={6}>
            <Field
              label={<FormattedMessage id="ui-organizations.interface.statisticsFormat" />}
              name={`${elem}.statisticsFormat`}
              component={Select}
              fullWidth
              dataOptions={formatDD}
            />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.locallyStored" />} name={`${elem}.locallyStored`} id={`${elem}.locallyStored`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.onlineLocation" />} name={`${elem}.onlineLocation`} id={`${elem}.onlineLocation`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-organizations.interface.statisticsNotes" />} name={`${elem}.statisticsNotes`} id={`${elem}.statisticsNotes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              {<FormattedMessage id="ui-organizations.interface.remove" />}
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Interface" name="interfaces" id="interfaces" component={this.renderInterfaceForm} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default InterfaceForm;
