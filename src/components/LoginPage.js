/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/index';

class LoginPage extends Component {
  state = {
    isLoginButtonDisabled: true,
    email: '',
    password: '',
  };

  formHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.loginButtonValidator);
  };

  loginButtonValidator = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH
        && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?::[a-zA-Z0-9])?$/.test(email)) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  render() {
    const { isLoginButtonDisabled, email, password } = this.state;
    return (
      <div>
        <div className="main-login">
          <div className="left-side">
            <h1 className="title-login">
              Trybe
              {' '}
              <strong>Wallet</strong>
            </h1>
            <img className="wallet-login" width="800px" src="https://user-images.githubusercontent.com/78454964/221427847-ea148894-b283-4671-ba6f-9ca8fda0eab3.png" alt="wallet" />
            <p className="still">ainda não há versão mobile 😞</p>
          </div>
          <div className="right-side">
            <div className="form-login">
              <p className="lets">Vamos fazer o seu login!</p>
              <form
                className="form-form-login"
                onSubmit={ (e) => {
                  e.preventDefault();
                  const { history, dispatch } = this.props;
                  dispatch(addUser(email));
                  history.push('/carteira');
                } }
              >
                <div className="text-input">
                  <label htmlFor="email">
                    <p>E-mail:</p>
                    {' '}
                    <input
                      placeholder="email@email.com"
                      value={ email }
                      onChange={ this.formHandleChange }
                      id="email"
                      name="email"
                      data-testid="email-input"
                    />
                  </label>
                </div>
                <div className="text-input">
                  <label htmlFor="password">
                    <p>Password:</p>
                    {' '}
                    <input
                      type="password"
                      placeholder="************"
                      value={ password }
                      onChange={ this.formHandleChange }
                      id="password"
                      name="password"
                      data-testid="password-input"
                    />
                  </label>
                </div>
                <button
                  className="button-login"
                  type="submit"
                  disabled={ isLoginButtonDisabled }
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
//   wallet: state.wallet,
// });

export default connect()(LoginPage);
