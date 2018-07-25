import React, { Component } from 'react';
import { css } from 'emotion';
import gql from 'graphql-tag';

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

export default class Login extends Component<any, any> {

  GET_USERS = gql`
    {
      Users @client {
        userName
        password
        roleLevel
      }
    }
  `;

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
      this.doLogin();
    }
  }
  
  doLogin() {
    const userName = this.state.userName;
    const password = this.state.password;
    const query = this.GET_USERS;
    const users = this.props.client.readQuery({query}).Users;
    let user;
    console.log(users);
    users.forEach((item) => {
      if(item.userName === userName && item.password === password) {
        user = {
          userName: item.userName,
          roleLevel: item.roleLevel,
          __typename: 'CurrentUser'
        };
      }
    });
    if(user !== undefined) {
      console.log('data written');
      this.props.client.writeData({ data: {CurrentUser: [user]}});
      console.log('this.props.loginHandler', this.props.loginHandler);
      this.props.loginHandler();
    } else {
      this.setState({loginAttempted: true, displayError: true});
    }
  }

  updateUN(e) {
    this.setState({userName: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
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
    console.log('login re-render');
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
              <button className={submitButton} onClick={this.doLogin}>Log In</button>
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