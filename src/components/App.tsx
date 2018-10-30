import React, {Component} from 'react';
import { css, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';

import ProposalHome from 'components/portal/pages/proposals/Home';
import Publications from 'components/portal/pages/Publications';
import UserInfo from 'components/portal/pages/UserInfo';
import Training from 'components/portal/pages/Training';
import ScheduleExperiments from 'components/portal/pages/ScheduleExperiments';
import GetData from 'components/portal/pages/GetData';
import SubmitSample from 'components/portal/pages/SubmitSample';
import ProvideFeedback from 'components/portal/pages/ProvideFeedback';
import PortalHome from 'components/portal/pages/PortalHome';
import AdminHome from 'components/admin/pages/AdminHome';
import MessageSettings from 'components/admin/pages/MessageSettings';
import AccessError from 'components/shared/pages/AccessError';
import InvalidPage from 'components/shared/pages/InvalidPage';
import UserAdmin from 'components/admin/pages/UserAdmin';

import ManageCallsHome from 'components/admin/pages/manageCalls/Home';

import ExternalStyleSheets from 'components/shared/components//ExternalStyleSheets';
import {colorDarkGrey} from 'styles/base';

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
  background-color: ${colorDarkGrey};
  min-height: 100%;
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
class App extends Component<any, any> {
  static propTypes = {
    location: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      navMenuType: 'tiles'
    };

    // Page Renderers
    this.renderIndexPage = this.renderIndexPage.bind(this);
    this.renderPortalPage = this.renderPortalPage.bind(this);
    this.renderAdminPage = this.renderAdminPage.bind(this);
    this.renderProposals = this.renderProposals.bind(this);
    this.renderNewProposal = this.renderNewProposal.bind(this);
    this.renderExistingProposal = this.renderExistingProposal.bind(this);
    this.renderPublications = this.renderPublications.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.renderTraining = this.renderTraining.bind(this);
    this.renderExperiments = this.renderExperiments.bind(this);
    this.renderGetData = this.renderGetData.bind(this);
    this.renderSubmitSample = this.renderSubmitSample.bind(this);
    this.renderProvideFeedback = this.renderProvideFeedback.bind(this);
    this.renderMessageSettings = this.renderMessageSettings.bind(this);
    this.renderUserAdmin = this.renderUserAdmin.bind(this);
    this.renderCallManagement = this.renderCallManagement.bind(this);

    // Action handlers
    this.logoutHandler = this.logoutHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);

  }

  logoutHandler() {
    this.props.client.writeData({data: {CurrentUser: []}});
  }

  navTypeHandler(styleTo) {
    this.props.client.writeData({ data: { navCollapsed: styleTo }});
  }

  /*************************
   * Render pages section
   *************************/

  renderIndexPage() {
    this.props.history.push('/Portal');
    return null;
  }
  renderPortalPage() {
    return (<PortalHome navStyle={this.state.navMenuType} {...this.props} restricted={true}/>);
  }
  renderAdminPage() {
    return (<AdminHome navStyle={this.state.navMenuType} {...this.props} restricted={true} roleLevel={999}/>);
  }

  renderProposals({match, location}) {
    console.log('match:', match);
    console.log('location:', location);
    return (<ProposalHome {...this.props} restricted={true}/>);
  }

  renderNewProposal({match}) {
    console.log('match:', match);
    return (<ProposalHome {...this.props} restricted={true} type='new' />);
    // return (<ProposalNew {...this.props} restricted={true}/>);
  }

  renderExistingProposal({match}) {
    console.log('match:', match);
    return (<ProposalHome {...this.props} restricted={true} id={match.params.id} />);
    // return (<ProposalExisting {...this.props} restricted={true} id={match.params.id} />);
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

  renderSubmitSample() {
    return (<SubmitSample {...this.props} restricted={true}/>)
  }

  renderProvideFeedback() {
    return (<ProvideFeedback {...this.props} restricted={true}/>)
  }

  renderMessageSettings() {
    return (<MessageSettings {...this.props} restricted={true}/>);
  }

  renderUserAdmin() {
    return (<UserAdmin {...this.props} restricted={true}/>);
  }

  renderCallManagement() {
    return (<ManageCallsHome {...this.props} restricted={true} />);
  }

  createPortalRoutes() {
    let portalRouteNum = 0;
    return [
      (<Route key={portalRouteNum++} exact path="/" component={this.renderIndexPage} />),
      (<Route key={portalRouteNum++} exact path="/Portal" component={this.renderPortalPage} />),
      (<Route key={portalRouteNum++} exact path="/Portal/proposals" component={this.renderProposals} />),
      (<Route key={portalRouteNum++} exact path="/Portal/proposals/new" component={this.renderNewProposal} />),
      (<Route key={portalRouteNum++} exact path="/Portal/proposals/:id" component={this.renderExistingProposal} />),
      (<Route key={portalRouteNum++} exact path="/Portal/publications" component={this.renderPublications} />),
      (<Route key={portalRouteNum++} exact path="/Portal/userInfo" component={this.renderUserInfo} />),
      (<Route key={portalRouteNum++} exact path="/Portal/training" component={this.renderTraining} />),
      (<Route key={portalRouteNum++} exact path="/Portal/scheduleExperiments" component={this.renderExperiments} />),
      (<Route key={portalRouteNum++} exact path="/Portal/getData" component={this.renderGetData} />),
      (<Route key={portalRouteNum++} exact path="/Portal/SubmitSample" component={this.renderSubmitSample} />),
      (<Route key={portalRouteNum++} exact path="/Portal/ProvideFeedback" component={this.renderProvideFeedback} />)
    ];
  }

  createAdminRoutes() {
    let adminRouteNum = 0;
    return [
      (<Route key={adminRouteNum++} exact path="/EUSAdmin" component={this.renderAdminPage} />),
      (<Route key={adminRouteNum++} exact path="/EUSAdmin/user_services/message_system" component={this.renderMessageSettings} />),
      (<Route key={adminRouteNum++} exact path="/EUSAdmin/user_services/users" component={this.renderUserAdmin} />),
      (<Route key={adminRouteNum++} exact path="/EUSAdmin/user_services/calls" component={this.renderCallManagement} />),
    ];
  }


  public render() {
    const portalRoutes = this.createPortalRoutes();
    const adminRoutes = this.createAdminRoutes();

    return (
      <div className={app}>
        <ExternalStyleSheets />
        <Switch>
          {portalRoutes}
          {adminRoutes}
          <Route exact path="/accessError" component={AccessError} />
          <Route component={InvalidPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

