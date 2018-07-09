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

    this.renderLoginNav = this.renderLoginNav.bind(this);
    this.renderTabNav = this.renderTabNav.bind(this);
    this.renderTileNav = this.renderTileNav.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.navMenuType !== nextProps.navMenuType;
  }

  renderLoginNav() {
    return (
      <div>
        Do we need to show a nav for this?
      </div>
    );
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
            <Link to="/">Home</Link>
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
          <Menu.Item style={{float: 'right'}} key="navSwitch">
            <div onClick={this.props.navChangeHandler}>Switch Nav Type</div>
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  renderTileNav() {
    return (
      <Menu
        className={menu}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        selectedKeys={[this.props.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item style={{float: 'right'}} key="navSwitch">
          <div onClick={this.props.navChangeHandler}>Switch Nav Type</div>
        </Menu.Item>
      </Menu>
    );
  }
  
  render() {
    const navMenuType = this.props.navMenuType;
    if(navMenuType === 'login') {
      return this.renderLoginNav();
    } else if(navMenuType === 'tabs') {
      return this.renderTabNav();
    } else if(navMenuType === 'tiles') {
      return this.renderTileNav();
    } else {
      return (<div>ERROR</div>);
    }
  }
}