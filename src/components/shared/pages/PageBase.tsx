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

export default abstract class PageBase extends Component<any, any> {

  GET_USER_ROLE = gql`
    {
      CurrentUser @client {
        roleLevel
      }
    }
  `;

  constructor(props) {
    super(props);
    this.state = {userLoggedIn: this.isUserLoggedIn()};

    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.renderRestrictionContent = this.renderRestrictionContent.bind(this);
    this.passesPageRestriction = this.passesPageRestriction.bind(this);
    this.userHasAccess = this.userHasAccess.bind(this);

    
    this.logoutHandler = this.logoutHandler.bind(this);
    this.navTypeHandler = this.navTypeHandler.bind(this);

    this.renderPage = this.renderPage.bind(this);
  }


  /***************************
   * Restriction logic section
   **************************/

  /**
   * If the page is restricted checks if the user is logged in and has access to the page
   * @returns {boolean}
   */
  passesPageRestriction() : boolean {
    if(this.props.restricted) {
      return this.state.userLoggedIn && this.userHasAccess();
    }
    return true;
  }

  /**
   * Returns true if and only if the user is logged in
   * @returns {boolean}
   */
  isUserLoggedIn() : boolean {
    const query = this.GET_USER_ROLE;
    return this.props.client.readQuery({query}).CurrentUser.length !== 0;
  }

  /**
   * Returns true if and only if the user has the necessary role for this page
   * NOTE: This logic might be handled by the individual page if there is finicky logic for it.
   * @returns {boolean}
   */
  userHasAccess() : boolean {
    const query = this.GET_USER_ROLE;
    const data = this.props.client.readQuery({query}).CurrentUser;
    const userRoleLevel = data.length !== 0 ? data[0].roleLevel : -999;
    const pageRoleLevel = this.props.roleLevel ? this.props.roleLevel : 0;
    // props.roleLevel should track what role level is necessary to view this
    return pageRoleLevel <= userRoleLevel;
  }

  /**
   * Login handler which simply updates the Page's state
   */
  doLogin() {
    this.setState({userLoggedIn: true});
  }

  logoutHandler() {
    console.log('logout handler called');
    this.props.client.writeData({data: {CurrentUser: []}});
    this.setState({userLoggedIn: false});
  }

  navTypeHandler(styleTo) {
    this.props.client.writeData({ data: { navCollapsed: styleTo }});
  }

  /**
   * Renders the appropriate restricted content based on if the user needs to log in or if they have insufficient access
   */
  renderRestrictionContent() {
    if(!this.state.userLoggedIn) {
      return (<Login {...this.props} loginHandler={this.doLogin} />);
    }
    return (<AccessError {...this.props} />);
  }

  /**
   * Abstract function which MUST be defined by the implementers.
   */
  abstract renderPage();

  render() {
    let content;
    if(this.passesPageRestriction()) {
      content = this.renderPage();
    } else {
      content = this.renderRestrictionContent();
    }
    return (
      <div>
        {content}
      </div>
    );
  }

}