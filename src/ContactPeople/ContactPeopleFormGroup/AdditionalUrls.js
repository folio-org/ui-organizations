import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import css from '../ContactPeopleForm.css';
import { UrlsMF } from '../../MultiForms';

class AdditionalUrls extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  renderSub = (elem, index) => {
    const { fields } = this.props;
    return (
      <Row key={index}>
        <UrlsMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
          {...this.props}
        />
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            {<FormattedMessage id="ui-vendors.contactPeople.remove" />}
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields, contactPeopleForm } = this.props;
    return (
      <Row>
        { !contactPeopleForm &&
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.url" />}</div>
          </Col>
        }
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>{<FormattedMessage id="ui-vendors.contactPeople.pleaseAddUrl" />}</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSub)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.contactPeople.addUrl" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default AdditionalUrls;
