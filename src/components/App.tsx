// import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled from 'react-emotion'
import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import PropTypes from 'prop-types';

// import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';

import Home from 'components/pages/Home';
import Search from 'components/pages/Search';
import Browse from 'components/pages/Browse';

import Login from 'components/pages/Login';
import TileUserHome from 'components/pages/TileUserHome';
import Proposals from 'components/pages/Proposals';
import Publications from 'components/pages/Publications';
import UserInfo from 'components/pages/UserInfo';
import Training from 'components/pages/Training';
import ScheduleExperiments from 'components/pages/ScheduleExperiments'
import GetData from 'components/pages/GetData';
import TabUserHome from 'components/pages/TabUserHome';
import UserHome from 'components/pages/UserHome';

import NavMenu from 'components/core/NavMenu';

import logo from 'images/logo.png';

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
  display: flex;
  flex: 1;
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
class App extends React.Component<RouteComponentProps<any>, any> {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userName: '',
      navMenuType: 'tabs'
    };
    // Page Renderers
    this.renderLogin = this.renderLogin.bind(this);
    this.renderHomePageTab = this.renderHomePageTab.bind(this);
    this.renderHomePageTile = this.renderHomePageTile.bind(this);
    this.renderHomePage = this.renderHomePage.bind(this);

    // Action handlers
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);
  }

  loginHandler(userName) {
    this.setState({loggedIn: true, navMenuType: 'tabs', userName});
    // window.location.assign("/home");
  }

  renderLogin() {
    const state = this.state;
    const loginHandler = this.loginHandler;
    return (<Login {...this.props} loggedIn={state.loggedIn} loginHandler={loginHandler}/>)
  }

  logoutHandler() {
    this.setState({loggedIn: false, navMenuType: 'login'});
  }

  navTypeHandler() {
    console.log('Old state: ' + this.state.navMenuType);
    console.log('New State: ' + this.state.navMenuType === 'tabs' ? 'tiles' : 'tabs');
    this.state.navMenuType === 'tabs' ?
      this.setState({navMenuType: 'tiles'}) :
      this.setState({navMenuType: 'tabs'});
  }

  renderHomePageTab() {
    if(!this.state.loggedIn) {
      return this.renderLogin();
    }
    else {
      return (<TabUserHome />);
    }
  }

  renderHomePageTile() {
    if(!this.state.loggedIn) {
      return this.renderLogin();
    }
    else {
      return (<TileUserHome />);
    }
  }
  
  renderHomePage() {
    if(!this.state.loggedIn) {
      return this.renderLogin();
    } else {
      return (<UserHome navStyle={this.state.navMenuType} />);
    }
  }

  public render() {
    return (
      <div className={app}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
          crossOrigin="anonymous"
        />
        <div className={header}>
          <Logo src={logo} alt="logo" />
          <div className={titleContainer}>
            <span>
              <div className={title}>EMSL User Portal</div>
              {this.state.loggedIn ? (
                <div className={logout}>
                  <div>Welcome {this.state.userName}</div>
                  <div onClick={this.logoutHandler}>Sign out</div>
                </div>
              ): (<div className={logout}>Please sign in</div>)}
            </span>
            <NavMenu 
              navMenuType={this.state.navMenuType} 
              pathname={this.props.location.pathname}
              navChangeHandler={this.navTypeHandler}
            />
          </div>
        </div>
        <div className={content}>
          <Switch>
            <Route exact path="/" render={this.renderHomePage}/>
            <Route exact path="/login" render={this.renderLogin}/>
            <Route exact path="/proposals" component={Proposals} />
            <Route exact path="/publications" component={Publications} />
            <Route exact path="/userInfo" component={UserInfo} />
            <Route exact path="/training" component={Training} />
            <Route exact path="/scheduleExperiments" component={ScheduleExperiments} />
            <Route exact path="/oldHome" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/getData" component={GetData} />
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

