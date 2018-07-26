/**
 * This is the template for a 'restricted page'
 *
 * All pages which require a certain role level will extend this class
 *
 * render() will check if user is logged in. if not, will display Login component
 * If user is logged in but does not have priveleges, the user will be shown the Access Denied component
 *
 * This page will handle doLogin which will set loggedIn to true
 * This page will know how to check if the user is logged in
 *
 */

import React, { Component } from 'react';
import gql from 'graphql-tag';
import Login from 'components/shared/pages/Login';
import AccessError from 'components/shared/pages/AccessError';

export default abstract class RestrictedPage extends Component<any, any> {

  GET_USER_ROLE = gql`
    {
      CurrentUser @client {
        roleLevel
      }
    }
  `;

  constructor(props) {
    super(props);

    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
    this.state = {userLoggedIn: this.isUserLoggedIn()};

    this.doLogin = this.doLogin.bind(this);
    this.renderLoginContent = this.renderLoginContent.bind(this);
    this.renderAccessDenialContent = this.renderAccessDenialContent.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  isUserLoggedIn() {
    const query = this.GET_USER_ROLE;
    return this.props.client.readQuery({query}).CurrentUser.length !== 0;
  }

  userHasAccess() {
    const query = this.GET_USER_ROLE;
    const data = this.props.client.readQuery({query}).CurrentUser;
    const userRoleLevel = data.length !== 0 ? data[0].roleLevel : -999;
    const pageRoleLevel = this.props.roleLevel ? this.props.roleLevel : 0;
    // props.roleLevel should track what role level is necessary to view this
    return pageRoleLevel <= userRoleLevel;
  }

  doLogin() {
    this.setState({userLoggedIn: true});
  }

  renderLoginContent() {
    return (<Login {...this.props} loginHandler={this.doLogin} />);
  }

  renderAccessDenialContent() {
    return (<AccessError {...this.props} />);
  }

  abstract renderPage();

  render() {
    let content;
    if(!this.state.userLoggedIn) {
      content = this.renderLoginContent();
    } else if (!this.userHasAccess()) {
      content = this.renderAccessDenialContent();
    } else {
      content = this.renderPage();
    }
    return (
      <div>
        {content}
      </div>
    );
  }

}