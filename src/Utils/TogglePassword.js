import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field as ReduxField } from 'redux-form';
import { Field as FinalFormField } from 'react-final-form';
import { Button, TextField, Row, Col } from '@folio/stripes/components';

class TogglePassword extends Component {
  static propTypes = {
    name: PropTypes.string,
    buttonID: PropTypes.string,
    Field: PropTypes.element,
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
    const { name, buttonID, Field } = this.props;

    return (
      <Row>
        <Col xs={10}>
          <Field
            autoComplete="new-password"
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.edit.password" />}
            name={name}
            type={this.state.showPassword ? 'text' : 'password'}
          />
        </Col>
        <Col xs={2} style={{ paddingTop: '20px', marginBottom: '0' }}>
          <Button id={buttonID} onClick={() => this.togglePassword()}>
            {
              this.state.showPassword
                ? <FormattedMessage id="ui-organizations.edit.hide" />
                : <FormattedMessage id="ui-organizations.edit.show" />
            }
          </Button>
        </Col>
      </Row>
    );
  }
}

TogglePassword.defaultProps = {
  Field: ReduxField,
};

export const TogglePasswordFinal = (props) => (
  <TogglePassword
    {...props}
    Field={FinalFormField}
  />
);

export default TogglePassword;
