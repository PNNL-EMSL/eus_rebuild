import { Menu } from 'antd';
import { css } from 'emotion';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';


const menu: string = css`
  line-height: 20px;
  background: ${colorDarkGreen};
  border-bottom-color: ${colorDarkGreen};
  border-radius: 4px;
  li:first-child {
    border-radius: 4px 0 0 4px;
  }
  li {
    &.ant-menu-item-selected {
      background-color: ${colorLightGreen} !important;
      a {
       font-weight: 500;
        color: ${colorBlack};
        &:hover {
          color: ${colorBlack};
        }
      }
    }
  }
`;

export default class NavMenu extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };

    this.renderTabNav = this.renderTabNav.bind(this);
    this.renderTileNav = this.renderTileNav.bind(this);
    this.renderNavSwitchItem = this.renderNavSwitchItem.bind(this);
    this.updateNavType = this.updateNavType.bind(this);
  }

  updateNavType() {
    const styleTo = this.props.navMenuType === 'tabs' ? 'tiles' : 'tabs';
    this.props.navChangeHandler(styleTo);
  }

  renderTabNav() {
    console.log(this.props);
    return(
      <div>
        <Menu
          className={menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/Portal']}
          selectedKeys={[this.props.pathname]}
        >
          <Menu.Item key="/Portal">
            <Link to="/Portal">Home</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/proposals">
            <Link to="/Portal/proposals">Proposals</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/publications">
            <Link to="/Portal/publications">Publications</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/userInfo">
            <Link to="/Portal/userInfo">User Info</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/training">
            <Link to="/Portal/training">Training</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/scheduleExperiments">
            <Link to="/Portal/scheduleExperiments">Schedule Experiments</Link>
          </Menu.Item>
          <Menu.Item key="/Portal/getData">
            <Link to="/Portal/getData">Get Data</Link>
          </Menu.Item>
          <Menu.Item key="/EUSAdmin/messageSystem">
            <Link to="/EUSAdmin/messageSystem">Message System</Link>
          </Menu.Item>

          {this.renderNavSwitchItem()}
        </Menu>
      </div>
    );
  }

  renderTileNav() {
    console.log(this.props);
    return (
      <div>
        <Menu
          className={menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/Portal']}
          selectedKeys={[this.props.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/Portal">Home</Link>
          </Menu.Item>
          {this.renderNavSwitchItem()}
        </Menu>
      </div>
    );
  }

  renderNavSwitchItem() {
    return (
      <Menu.Item style={{float: 'right'}} key="navSwitch" onClick={this.updateNavType}>
        <div>Switch Nav Type</div>
      </Menu.Item>
    );
  }
  
  render() {
    const navMenuType = this.props.navMenuType;
    let items;
    if(navMenuType === 'tabs') {
      items = this.renderTabNav();
    } else if(navMenuType === 'tiles') {
      items = this.renderTileNav();
    } else {
      items = (<div>ERROR</div>);
    }
    return (
      <div>
        {items}
      </div>
    )
  }
}