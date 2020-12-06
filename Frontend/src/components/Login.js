import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { login, emailChangeHandler, passwordChangeHandler, roleChangeHandler } from '../actions/actions';
import { loginMutation } from '../mutations';

class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    const { role, email, password } = this.props;
    axios.defaults.withCredentials = true;

    // axios.post('/login', { role, email, password })
    //   .then((response) => {
    //     if (response.data) {
    //       delete response.data.password;
    //       const { _id } = response.data;
    //       this.props.login(response.data, _id, this.props.role);
    //     }
    //   });
    this.props.loginMutation({
      variables: {
        email,
        password,
        role
      }
    }).then((data) => {
      const { status, content } = data.data.login;
      console.log(status, content);
      const { _id, password, ...user } = JSON.parse(content);
      if (status === '200') {
        this.props.login(user, _id, role);
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1 className="mb-4 title">{`${this.props.role} Login`}</h1>
          <h1 className="h3 mb-3 font-weight-normal signin">Sign in as</h1>
          <select onChange={this.props.roleChangeHandler} id="options">
            <option value="Customer">Customer</option>
            <option value="Restaurant">Restaurant</option>
          </select>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input onChange={this.props.emailChangeHandler} value={this.props.email} type="email" name="email" className="form-control mb-3" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input onChange={this.props.passwordChangeHandler} value={this.props.password} type="password" name="password" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
              {' '}
              Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <a className="btn btn-lg btn-success btn-block" href="/signup">Sign up</a>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    email: state.email,
    password: state.password,
    role: state.role
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, id, role) => dispatch(login(user, id, role)),
    emailChangeHandler: (e) => dispatch(emailChangeHandler(e)),
    passwordChangeHandler: (e) => dispatch(passwordChangeHandler(e)),
    roleChangeHandler: (e) => dispatch(roleChangeHandler(e))
  };
};

export default compose(
  graphql(loginMutation, { name: 'loginMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
