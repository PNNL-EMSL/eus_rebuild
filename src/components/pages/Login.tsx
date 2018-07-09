import React, { Component } from 'react';
import { css } from 'emotion';
// import styled from 'react-emotion';
// import { Link } from 'react-router-dom';

const container: string = css`
    background-color: #6699ff;
`
export default class Login extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}

    this.updateUN = this.updateUN.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if((this.state.username !== nextState.userName) ||
      (this.state.password !== nextState.password)) {
      return false;
    }
    return true;
  }
  
  doLogin() {
    // do my logic
    const goodUN = "admin";
    const goodPass = "admin";
    // if passing
    if(this.state.username === goodUN && this.state.password === goodPass) {
      this.props.loginHandler(this.state.username);
    } else {
      // display error
    }
  }

  updateUN(e) {
    this.setState({username: e.target.value});
  }
  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  submitFunction(e) {
    e.preventDefault();
    this.doLogin()
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

          <div className={container}>
            Temp Login container

            <div>
              Placeholder for Login Explanation
            </div>

            <div>
              PNNL Network ID:
              <input name='username' type="text" onChange={this.updateUN} />
            </div>
            <br />
            <div>
              PNNL Password:
              <input name='pass' type="password" onChange={this.updatePassword} />
            </div>
            <div>
              <button onClick={this.submitFunction}>Log In</button>
            </div>

          </div>
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