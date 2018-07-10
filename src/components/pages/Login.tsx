import React, { Component } from 'react';
import { css } from 'emotion';
// import styled from 'react-emotion';
// import { Link } from 'react-router-dom';

const container: string = css`
    border-style: solid;
    padding: 10px;
    background-color: rgba(215,118,0,0.5);
`;

const submitButton: string = css`
  background-color: rgba(114, 148, 26, 1);
  color: #FFFFFF
`;

const noteText: string = css`
    width: 600px;
    margin: 2em auto;
`;

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
          Enter your PNNL Netowrk ID and PNNL Password to log in.
        </p>
        <div>
          <div className={container}>
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
              <button className={submitButton} onClick={this.submitFunction}>Log In</button>
            </div>

          </div>
        </div>
        <p className={noteText}>
          NOTE: If you are using Internet Explorer and are experiencing slow page loads and/or overall slowness, try using
          <a target="_blank" href="http://www.mozilla.com/en-US/firefox/personal.html">Firefox</a> or
          <a target="_blank" href="http://www.google.com/chrome">Chrome</a> instead.
        </p>
      </div>
    )
  }
}