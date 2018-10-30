import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Icon, Menu } from 'antd';

export default abstract class NavBase extends Component<any, any> {

  GET_HEADER_INFORMATION = gql`
    {
      CurrentUser @client {
        roleLevel
      }
    }
  `;
  
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.renderItems = this.renderItems.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
    this.renderExpanded = this.renderExpanded.bind(this);

    this.navSwitchHandler = this.navSwitchHandler.bind(this);
  }

  renderNavSwitchItem() {
    return (
      <Menu.Item type="primary" key="navSwitch" onClick={this.navSwitchHandler}>
        <Icon type={this.state.collapsed? 'menu-unfold' : 'menu-fold'}  />
      </Menu.Item>
    );
  }

  navSwitchHandler() {
    this.props.client.writeData({ data: { navCollapsed: !this.state.collapsed }});
    this.setState({collapsed: !this.state.collapsed});
  }

  abstract renderCollapsed(userRole);

  abstract renderExpanded(userRole);

  /**
   * Render method for the menu items, defined by the page type it is on.
   */
  renderItems(data) {
    const userRole = Number(data.CurrentUser[0].roleLevel);
    if(data.navCollapsed) {
      return this.renderCollapsed(userRole);
    }
    return this.renderExpanded(userRole);
  }
  
  render() {
    return (
      <div>
        <Query query={this.GET_HEADER_INFORMATION}>
          {({data, loading, error}) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            else if (error) {
              return <p>Error!</p>
            }
            else {
              console.log('header', data);
              const content = this.renderItems(data);
              return (
                <div>
                  {content}
                </div>
              );
            }
          }}
      </Query>
      </div>
    )
  }
}