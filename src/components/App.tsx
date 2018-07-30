// import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled from 'react-emotion'
import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import ExternalStyleSheets from 'components/shared/components//ExternalStyleSheets';

import Proposals from 'components/portal/pages/Proposals';
import Publications from 'components/portal/pages/Publications';
import UserInfo from 'components/portal/pages/UserInfo';
import Training from 'components/portal/pages/Training';
import ScheduleExperiments from 'components/portal/pages/ScheduleExperiments';
import GetData from 'components/portal/pages/GetData';
import PortalHome from 'components/portal/pages/PortalHome';
import AdminHome from 'components/admin/pages/AdminHome';
import MessageSettings from 'components/admin/pages/MessageSettings';
import AccessError from 'components/shared/pages/AccessError';
import UserAdmin from 'components/admin/pages/UserAdmin';
import NavMenu from 'components/shared/components/NavMenu';

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

    // Action handlers
    this.logoutHandler = this.logoutHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);

  }

  logoutHandler() {
    this.props.client.writeData({data: {CurrentUser: []}});
  }

  navTypeHandler(styleTo) {
    this.props.client.writeData({ data: { navStyle: styleTo }});
  }

  /*************************
   * Render pages section
   *************************/

  renderPortalPage() {
    return (<PortalHome navStyle={this.state.navMenuType} {...this.props} restricted={true}/>);
  }
  renderAdminPage() {
    return (<AdminHome navStyle={this.state.navMenuType} {...this.props} restricted={true} roleLevel={999}/>);
  }

  renderProposals() {
    return (<Proposals {...this.props} restricted={true}/>);
  }

  renderPublications() {
    return (<Publications {...this.props} restricted={true}/>);
  }

  renderUserInfo() {
    return (<UserInfo {...this.props} restricted={true}/>);
  }

  renderTraining() {
    return (<Training {...this.props} restricted={true}/>);
  }

  renderExperiments() {
    return (<ScheduleExperiments {...this.props} restricted={true}/>);
  }

  renderGetData() {
    return (<GetData {...this.props} restricted={true}/>)
  }
  
  renderMessageSettings() {
    return (<MessageSettings {...this.props} restricted={true}/>);
  }

  renderUserAdmin() {
    return (<UserAdmin {...this.props} restricted={true}/>);
  }

  createPortalRoutes() {
    return [
      (<Route exact path="/" component={this.renderPortalPage} />),
      (<Route exact path="/Portal" component={this.renderPortalPage} />),
      (<Route exact path="/Portal/proposals" component={this.renderProposals} />),
      (<Route exact path="/Portal/publications" component={this.renderPublications} />),
      (<Route exact path="/Portal/userInfo" component={this.renderUserInfo} />),
      (<Route exact path="/Portal/training" component={this.renderTraining} />),
      (<Route exact path="/Portal/scheduleExperiments" component={this.renderExperiments} />),
      (<Route exact path="/Portal/getData" component={this.renderGetData} />)
    ];
  }

  createAdminRoutes() {
    return [
      (<Route exact path="/EUSAdmin" component={this.renderAdminPage} />),
      (<Route exact path="/EUSAdmin/messageSystem" component={this.renderMessageSettings} />),
      (<Route exact path="/EUSAdmin/userAdmin" component={this.renderUserAdmin} />),
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
                      {...this.props}
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

