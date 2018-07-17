import React, { Component } from 'react';
import { css } from 'emotion';
import { Query } from 'react-apollo';
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

export default class Login extends Component<any, any> {

  GET_LOGIN_FILTER = gql`
    {
      isLoggedIn @client,
      userName @client
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
    this.submitFunction = this.submitFunction.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if((this.state.userName !== nextState.userName) ||
      (this.state.password !== nextState.password)) {
      return false;
    }
    return true;
  }
  
  doLogin(client, history) {
    // do my logic
    const goodUN = "admin";
    const goodPass = "admin";
    // if passing
    if(this.state.userName === goodUN && this.state.password === goodPass) {
      client.writeData({ data: { isLoggedIn: true, userName: this.state.userName }});
      console.log(client);
      this.props.loginHandler(this.state.userName, history);
    }
    this.setState({loginAttempted: true, displayError: true});
    
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
        <p>
          Invalid login credentials. Please validate your credentials and try again.
        </p>
      );
    }
    return(<p />);
  }

  render() {
    console.log('re-render');
    console.log('login props: ', this.props);
    return (
      <div>
        <Query query={this.GET_LOGIN_FILTER}>
          {({loading, error, data, client}) => {
            if (loading) {
              return <p>Loading...</p>;
            } else if (error) {

              return <p>Error...</p>;
            } else {
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
                        <input name='userName' type="text" onChange={this.updateUN}/>
                      </div>
                      <br />
                      <div>
                        PNNL Password:
                        <input name='pass' type="password" onChange={this.updatePassword}/>
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
          }}
        </Query>
      </div>
    )
  }
}