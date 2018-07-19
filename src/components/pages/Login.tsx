import React, { Component } from 'react';
import { css } from 'emotion';

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
    text-align: center;
    margin: 2em auto;
`;

const loginContainer: string = css`
  width: 800px;
  margin: 2em auto;
  float: left;
`;

const warning: string = css`
  color: red;
`;

const validUsers = {
  admin: { 
    userName: 'admin',
    password: 'admin',
    role: 'admin'
  },
  guest: {
    userName: 'guest',
    password: 'password',
    role: 'guest'
  },
  user: {
    userName: 'user',
    password: 'password',
    role: 'user'
  }
};

export default class Login extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      loginAttempted: false,
      displayError: false,
    };

    this.updateUN = this.updateUN.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if((this.state.userName !== nextState.userName) ||
      (this.state.password !== nextState.password)) {
      return false;
    }
    return true;
  }

  handleKeyPress(e) {
    if(e.keyCode === 13) {
      this.submitFunction();
    }
  }
  
  doLogin(client, history) {
    // do my logic
    // if passing
    const userName = this.state.userName;
    const password = this.state.password;
    if(validUsers[userName] !== undefined && validUsers[userName].password === password) {
    // if(this.state.userName === goodUN && this.state.password === goodPass) {
      client.writeData({ data: { isLoggedIn: true, userName, role: validUsers[userName].role }});
      console.log(client);
      this.props.loginHandler(this.state.userName, history);
    } else {
      this.setState({loginAttempted: true, displayError: true});
    }
  }

  updateUN(e) {
    // console.log('updating userName state');
    this.setState({userName: e.target.value});
  }
  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  submitFunction() {
    // e.preventDefault();
    this.doLogin(this.props.client, this.props.history)
  }

  errorDisplay() {
    if(this.state.displayError) {
      return (
        <p className={warning}>
          Invalid login credentials. Please validate and try again.
        </p>
      );
    }
    return(<p />);
  }

  render() {
    return (
      <div className={loginContainer}>
        <p>
          Enter your PNNL Netowrk ID and PNNL Password to log in.
        </p>
        {this.errorDisplay()}
        <div>
          <div className={container}>
            <div>
              PNNL Network ID:
              <input name='userName' type="text" onChange={this.updateUN} onKeyUp={this.handleKeyPress}/>
            </div>
            <br />
            <div>
              PNNL Password:
              <input name='pass' type="password" onChange={this.updatePassword} onKeyUp={this.handleKeyPress}/>
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