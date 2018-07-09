import React, { Component } from 'react';
// import { css } from 'emotion';
// import styled from 'react-emotion';
// import { Link } from 'react-router-dom';
import LoginContainer from 'components/core/LoginContainer'

export default class Login extends Component<any, any> {

  constructor(props) {
    super(props);
  }
  
  doLogin() {
    // do my logic
    // if passing
    this.props.loginHandler();
  }
  
  render() {
    return (
      <div>
        <p>
          If the user has gone from logged in to logged out, should inform this
        </p>
        <p>
          The Login page should have a brief blurb about how to log in
        </p>
        <div>
          The login container should go here
          <LoginContainer />
        </div>
        <div>
          <p>
            TEMP item to allow access to access to home page while login is developed, 
            remove this once login logic has been developed
          </p>
        </div>
        <div>
          Should have a forgot password link 
        </div>
        <p>
          Should have a brief blurb about IE being slow and provide suggestions for other browsers
        </p>
      </div>
    )
  }
}