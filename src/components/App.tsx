// import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled from 'react-emotion'
import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import ExternalStyleSheets from 'components/core/ExternalStyleSheets';

// import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';

import Login from 'components/pages/Login';
import Proposals from 'components/pages/Proposals';
import Publications from 'components/pages/Publications';
import UserInfo from 'components/pages/UserInfo';
import Training from 'components/pages/Training';
import ScheduleExperiments from 'components/pages/ScheduleExperiments'
import GetData from 'components/pages/GetData';
import UserHome from 'components/pages/UserHome';
import MessageSettings from 'components/pages/MessageSettings'
import NavMenu from 'components/core/NavMenu';

import logo from 'images/emsl_logo_notag.jpg';

// Define global styles
injectGlobal`
  body {
    height: 100%;
    #root {
      height: 100%;
    }
  }
  a {
    color: #337ab7;
    &:hover, &:focus {
      color: #23527c;
    }
  }
`;

// Define styles for the application
const app: string = css`
  font-family: sans-serif;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const header: string = css`
  padding: 5px 20px 5px 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: white;
  align-items: center;
  max-width: 1078px;
`;
const footer: string = css`
  padding: 5px 20px 5px 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: white;
  align-items: center;
  max-width: 1078px;
`;
const titleContainer: string = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -15px;
`;
const title: string = css`
  font-weight: 800;
  font-size: 28px;
  text-shadow: 2px 2px 8px #aaa;
`;
const content: string = css`
  margin: 5px 20px 15px 100px;
  max-width: 958px;
`;

const Logo = styled('img')`
  height: 80px;
`;

const logout: string = css`
  text-align: right;
  float: right;
  width: 72%;
`;

/**
 * The App component creates the main layout for the application,
 * including the top navbar.
 * 
 * With typescript, we must declare that this component takes
 * RouteComponentProps in order to get router props injected
 * properly with the withRouter HOC.
 * TODO: not sure how the prop interface declarations work...
 */
class App extends React.Component<any, any> {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  GET_HEADER_INFORMATION = gql`
    {
      isLoggedIn @client,
      userName @client,
      role @client,
      navStyle @client
    }
  `;

  GET_USER_LOGGED_IN = gql`
    {
      isLoggedIn @client
    }
  `;
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      navMenuType: 'tiles'
    };

    // Page Renderers
    this.renderLogin = this.renderLogin.bind(this);
    this.renderHomePage = this.renderHomePage.bind(this);
    this.renderMessageSettings = this.renderMessageSettings.bind(this);

    // Redirection functions
    this.redirectFromIndex = this.redirectFromIndex.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);

    // Action handlers
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);

    this.userIsLoggedIn = this.userIsLoggedIn.bind(this);
  }


  loginHandler(userName) {
    this.setState({loggedIn: true, navMenuType: 'tabs', userName});
    this.props.history.push('/home');
  }

  renderLogin() {
    const loginHandler = this.loginHandler;
    return (<Login {...this.props} loginHandler={loginHandler}/>)
  }

  logoutHandler() {
    this.props.client.writeData({data: {isLoggedIn: false, userName: '', role: 'UNDEFINED'}});
    this.redirectToLogin();
  }

  navTypeHandler(styleTo) {
    this.props.client.writeData({ data: { navStyle: styleTo }});
  }
  
  renderHomePage() {
    if(!this.userIsLoggedIn()) {
      return this.redirectToLogin();
    } else {
      return (<UserHome navStyle={this.state.navMenuType} {...this.props}/>);
    }
  }
  
  renderMessageSettings() {
    return (<MessageSettings {...this.props}/>);
  }

  userIsLoggedIn() {
    const query = this.GET_USER_LOGGED_IN;
    return this.props.client.readQuery({query}).isLoggedIn;
  }

  redirectFromIndex() {
    if(this.userIsLoggedIn) {
      this.props.history.push('/home');
    }
    else {
      this.redirectToLogin();
    }
    return null;
  }

  redirectToLogin() {
    this.props.history.push('/login');
    return null;
  }

  public render() {
    return (
      <div className={app}>
        <ExternalStyleSheets />
        <Query query={this.GET_HEADER_INFORMATION}>
          {({loading, error, data}) => {
            if(loading) {
              return <p>Loading...</p>;
            } else if(error) {
              return <p>Error...</p>;
            } else {
              return (
                <div className={header}>
                  <div className={titleContainer}>
                  <span>
                     <Logo src={logo} alt="logo"/>
                    <div className={title}>EMSL User Portal</div>
                    {
                      data.isLoggedIn ? (
                        <div className={logout}>
                          <div>Welcome {data.userName}</div>
                          <div onClick={this.logoutHandler}>Sign out</div>
                        </div>
                      ) : (<div />)
                    }
                  </span>
                    <NavMenu
                      navMenuType={data.navStyle}
                      pathname={this.props.location.pathname}
                      navChangeHandler={this.navTypeHandler}
                    />
                  </div>
                </div>
              );
            }
          }}
        </Query>
        <div className={content}>
          <Switch>
            <Route exact path="/" render={this.redirectFromIndex} />
            <Route exact path="/home" render={this.renderHomePage}/>
            <Route exact path="/login" render={this.renderLogin}/>
            <Route exact path="/proposals" component={Proposals} />
            <Route exact path="/publications" component={Publications} />
            <Route exact path="/userInfo" component={UserInfo} />
            <Route exact path="/training" component={Training} />
            <Route exact path="/scheduleExperiments" component={ScheduleExperiments} />
            <Route exact path="/getData" component={GetData} />
            <Route exact path="/messageSystem" component={this.renderMessageSettings} />
          </Switch>
        </div>
        <div className={footer}>
          <p>
            Footer should be taken from the existing eusi.emsl.pnl.gov/Portal/ styles
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(App);

