import React from 'react';
import {Translate, translate} from 'react-jhipster';
import {Alert, Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Link} from 'react-router-dom';

export interface ILoginComponentProps {
  loginError: boolean;
  handleLogin: Function;
}

class LoginComponent extends React.Component<ILoginComponentProps> {
  handleSubmit = (event, errors, {username, password, tenant, rememberMe}) => {
    const {handleLogin} = this.props;
    handleLogin(username, password, tenant, rememberMe);
  };

  render() {
    const {loginError} = this.props;

    return (
      <div className="loginContainer">
        <AvForm onSubmit={this.handleSubmit}>
          <h1><Translate contentKey="login.title">Sign in</Translate></h1>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <AvField
                name="tenant"
                label={translate('global.form.tenant.label')}
                placeholder={translate('global.form.tenant.placeholder')}
                required
                errorMessage="The company identifier cannot be empty!"
                autoFocus
              />
              <AvField
                name="username"
                label={translate('global.form.username.label')}
                placeholder={translate('global.form.username.placeholder')}
                required
                errorMessage="Username cannot be empty!"
              />
              <AvField
                name="password"
                type="password"
                label={translate('login.form.password')}
                placeholder={translate('login.form.password.placeholder')}
                required
                errorMessage="Password cannot be empty!"
              />
              <AvGroup check inline>
                <Label className="form-check-label">
                  <AvInput type="checkbox" name="rememberMe"/>
                  <Translate contentKey="login.form.rememberme">Remember me</Translate>
                </Label>
              </AvGroup>
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          <Alert color="warning">
            <Link to="/account/reset/request">
              <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
            </Link>
          </Alert>
          <Button color="primary" type="submit">
            <Translate contentKey="login.form.button">Sign in</Translate>
          </Button>
        </AvForm>
      </div>
    );
  }
}

export default LoginComponent;
