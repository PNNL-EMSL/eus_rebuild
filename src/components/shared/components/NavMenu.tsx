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

    this.renderTabNav = this.renderTabNav.bind(this);
    this.renderTileNav = this.renderTileNav.bind(this);
    this.renderNavSwitchItem = this.renderNavSwitchItem.bind(this);
    this.updateNavType = this.updateNavType.bind(this);
  }

  updateNavType() {
    const styleTo = this.props.navMenuType === 'tabs' ? 'tiles' : 'tabs';
    this.props.navChangeHandler(styleTo);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.navMenuType !== nextProps.navMenuType;
  }
  
  renderTabNav() {
    return(
      <div>
        <Menu
          className={menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          selectedKeys={[this.props.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/proposals">
            <Link to="/proposals">Proposals</Link>
          </Menu.Item>
          <Menu.Item key="/publications">
            <Link to="/publications">Publications</Link>
          </Menu.Item>
          <Menu.Item key="/userInfo">
            <Link to="/userInfo">User Info</Link>
          </Menu.Item>
          <Menu.Item key="/training">
            <Link to="/training">Training</Link>
          </Menu.Item>
          <Menu.Item key="/scheduleExperiments">
            <Link to="/scheduleExperiments">Schedule Experiments</Link>
          </Menu.Item>
          <Menu.Item key="/getData">
            <Link to="/getData">Get Data</Link>
          </Menu.Item>
          <Menu.Item key="/messageSystem">
            <Link to="/messageSystem">Message System</Link>
          </Menu.Item>

          {this.renderNavSwitchItem()}
        </Menu>
      </div>
    );
  }

  renderTileNav() {
    return (
      <div>
        <Menu
          className={menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          selectedKeys={[this.props.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/home">Home</Link>
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