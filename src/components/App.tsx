// import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled from 'react-emotion'
import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import ExternalStyleSheets from 'components/core/ExternalStyleSheets';

import Login from 'components/pages/Login';
import Proposals from 'components/portal/pages/Proposals';
import Publications from 'components/portal/pages/Publications';
import UserInfo from 'components/portal/pages/UserInfo';
import Training from 'components/portal/pages/Training';
import ScheduleExperiments from 'components/portal/pages/ScheduleExperiments';
import GetData from 'components/portal/pages/GetData';
// import UserHome from 'components/pages/UserHome';
import PortalHome from 'components/portal/pages/PortalHome';
import AdminHome from 'components/admin/pages/AdminHome';
import MessageSettings from 'components/admin/pages/MessageSettings';
import AccessError from 'components/pages/AccessError';
import UserAdmin from 'components/admin/pages/UserAdmin';
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

  // Query to get the necessary information about the logged in user.
  GET_HEADER_INFORMATION = gql`
    {
      CurrentUser @client {
        userName,
        roleLevel
      }
      navStyle @client
    }
  `;

  // Slim query used for checking that the user is logged in, and redirecting if not.
  GET_USER_LOGGED_IN = gql`
    {
      CurrentUser @client {
        userName,
        roleLevel
      }
    }
  `;
  
  constructor(props) {
    super(props);
    this.state = {
      navMenuType: 'tiles'
    };

    // Page Renderers
    this.renderLogin = this.renderLogin.bind(this);
    this.renderPortalPage = this.renderPortalPage.bind(this);
    this.renderAdminPage = this.renderAdminPage.bind(this);
    this.renderProposals = this.renderProposals.bind(this);
    this.renderPublications = this.renderPublications.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.renderTraining = this.renderTraining.bind(this);
    this.renderExperiments = this.renderExperiments.bind(this);
    this.renderGetData = this.renderGetData.bind(this);
    this.renderMessageSettings = this.renderMessageSettings.bind(this);
    this.renderUserAdmin = this.renderUserAdmin.bind(this);

    // Redirection functions
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToAccessError = this.redirectToAccessError.bind(this);

    // Action handlers
    this.logoutHandler = this.logoutHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);

    this.userIsLoggedIn = this.userIsLoggedIn.bind(this);
  }

  logoutHandler() {
    this.props.client.writeData({data: {CurrentUser: []}});
    return this.redirectToLogin();
  }

  navTypeHandler(styleTo) {
    this.props.client.writeData({ data: { navStyle: styleTo }});
  }

  /*************************
   * Render pages section
   *************************/

  renderLogin() {
    return (<Login {...this.props} />);
  }

  renderPortalPage() {
    return this.userIsLoggedIn(<PortalHome navStyle={this.state.navMenuType} {...this.props}/>);
  }
  renderAdminPage() {
    return this.userIsLoggedIn(<AdminHome navStyle={this.state.navMenuType} {...this.props}/>);
  }

  renderProposals() {
    return this.userIsLoggedIn(<Proposals {...this.props}/>);
  }

  renderPublications() {
    return this.userIsLoggedIn(<Publications {...this.props}/>);
  }

  renderUserInfo() {
    return this.userIsLoggedIn(<UserInfo {...this.props}/>);
  }

  renderTraining() {
    return this.userIsLoggedIn(<Training {...this.props}/>);
  }

  renderExperiments() {
    return this.userIsLoggedIn(<ScheduleExperiments {...this.props}/>, 10);
  }

  renderGetData() {
    return this.userIsLoggedIn(<GetData {...this.props}/>)
  }
  
  renderMessageSettings() {
    return this.userIsLoggedIn(<MessageSettings {...this.props}/>, 999);
  }

  renderUserAdmin() {
    return this.userIsLoggedIn(<UserAdmin {...this.props} />, 999);
  }

  userIsLoggedIn(html, role=0) {
    const query = this.GET_USER_LOGGED_IN;
    const data = this.props.client.readQuery({query}).CurrentUser;
    if(data.length === 0) {
      return this.redirectToLogin();
    } else if(data[0].roleLevel < role) {
      // Display access denied
      return this.redirectToAccessError();
    } else {
      return html;
    }
  }

  redirectToLogin() {
    this.props.history.push('/login');
    return null;
  }

  redirectToAccessError() {
    this.props.history.push('/accessError');
    return null;
  }

  createPortalRoutes() {
    return [
      (<Route exact path="/" component={this.renderPortalPage} />),
      (<Route exact path="/Portal" component={this.renderPortalPage} />),
      (<Route exact path="/proposals" component={this.renderProposals} />),
      (<Route exact path="/publications" component={this.renderPublications} />),
      (<Route exact path="/userInfo" component={this.renderUserInfo} />),
      (<Route exact path="/training" component={this.renderTraining} />),
      (<Route exact path="/scheduleExperiments" component={this.renderExperiments} />),
      (<Route exact path="/getData" component={this.renderGetData} />)
    ];
  }

  createAdminRoutes() {
    return [
      (<Route exact path="/EUSAdmin" component={this.renderAdminPage} />),
      (<Route exact path="/messageSystem" component={this.renderMessageSettings} />),
      (<Route exact path="/userAdmin" component={this.renderUserAdmin} />),
    ];
  }


  public render() {
    const portalRoutes = this.createPortalRoutes();
    const adminRoutes = this.createAdminRoutes();

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
                      data.CurrentUser.length !== 0 ? (
                        <div className={logout}>
                          <div>Welcome {data.CurrentUser[0].userName}</div>
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
            {portalRoutes}
            {adminRoutes}
            <Route exact path="/accessError" component={AccessError} />
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

