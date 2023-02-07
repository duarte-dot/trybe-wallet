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
      <div className="form-login">
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            const { history, dispatch } = this.props;
            dispatch(addUser(email));
            history.push('/carteira');
          } }
        >
          <label htmlFor="email">
            E-mail:
            {' '}
            <input
              value={ email }
              onChange={ this.formHandleChange }
              id="email"
              name="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Password:
            {' '}
            <input
              value={ password }
              onChange={ this.formHandleChange }
              id="password"
              name="password"
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
          >
            Entrar
          </button>
        </form>
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
