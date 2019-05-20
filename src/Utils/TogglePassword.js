import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, TextField, Row, Col } from '@folio/stripes/components';

class TogglePassword extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    buttonID: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  togglePassword() {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword,
    }));
  }

  render() {
    const { name, id, buttonID } = this.props;

    return (
      <Row>
        <Col xs={10}>
          <Field label={<FormattedMessage id="ui-organizations.edit.password" />} name={name} id={id} type={this.state.showPassword ? 'text' : 'password'} component={TextField} autoComplete="nope" fullWidth />
        </Col>
        <Col xs={2} style={{ paddingTop: '20px', marginBottom: '0' }}>
          <Button id={buttonID} onClick={() => this.togglePassword()}>
            {this.state.showPassword ? <FormattedMessage id="ui-organizations.edit.hide" /> : <FormattedMessage id="ui-organizations.edit.show" />}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default TogglePassword;
