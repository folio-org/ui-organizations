import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from '@folio/stripes/components';

import css from './ContactPersonSection.css';

const ContactPersonSection = ({ renderHeader, renderBody }) => (
  <>
    <Row>
      <Col xs={12}>
        <h4 className={css.contactPersonSectionTitle}>
          {renderHeader()}
        </h4>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        {renderBody()}
      </Col>
    </Row>
  </>
);

ContactPersonSection.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
};

export default ContactPersonSection;
