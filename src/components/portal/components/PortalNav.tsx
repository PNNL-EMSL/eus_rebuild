import { Menu } from 'antd';
import { css } from 'emotion';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBase from 'components/shared/components/NavBase';

import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';

const menu: string = css`
  line-height: 36px;
  background: ${colorDarkGreen};
  border-bottom-color: ${colorDarkGreen};
  margin: 0px 8px;
  border-radius: 4px;
  max-width: 1078px;
  align-items: center;
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
  i {
    margin-top: 5px;
  }
`;


export default class PortalNav extends NavBase {
  
  constructor(props) {
    super(props);

    this.renderNavSwitchItem = this.renderNavSwitchItem.bind(this);
  }

  renderAdminAccessItem(userRole, collapsed=false) {
    if(userRole === 999) {
      return (
      //   <NavMenuItem
      //     navTo="/EUSAdmin"
      //     icon="fas fa-user-shield"
      //     collapsed={false}
      //     text="Link to EUS Admin"
      //   />
      // );
        <Menu.Item key="/EUSAdmin">
          <Link to="/EUSAdmin">
            {collapsed ? <i className="fas fa-user-shield fa-2x"/> :
              "Link to EUS Admin"
            }
          </Link>
        </Menu.Item>
      );
    }
    return <div />
  }

  renderExpanded(userRole) {
    console.log('menu props', this.props);
    console.log('userRole', userRole);
    return(
      <Menu
        className={menu}
        theme="dark"
        mode={this.props.direction}
        defaultSelectedKeys={['/Portal']}
        selectedKeys={[this.props.pathname]}
      >
        <Menu.Item key="/Portal">
          <Link to="/Portal">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/proposals">
          <Link to="/Portal/proposals">
            Proposals
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/publications">
          <Link to="/Portal/publications">
            Publications
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/userInfo">
          <Link to="/Portal/userInfo">
            User Info
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/training">
          <Link to="/Portal/training">
            Training
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/scheduleExperiments">
          <Link to="/Portal/scheduleExperiments">
            Schedule Experiments
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/getData">
          <Link to="/Portal/getData">
            Get Data
          </Link>
        </Menu.Item>
        {this.renderAdminAccessItem(userRole)}

        {this.renderNavSwitchItem()}
      </Menu>
    );
  }

  renderCollapsed(userRole) {
    console.log(this.props);
    return (
      <Menu
        className={menu}
        theme="dark"
        mode={this.props.direction}
        defaultSelectedKeys={['/Portal']}
        selectedKeys={[this.props.pathname]}
      >
        <Menu.Item key="/Portal">
          <Link to="/Portal">
            <i className="fas fa-home fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/proposals">
          <Link to="/Portal/proposals">
            <i className="fas fa-lightbulb fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/publications">
          <Link to="/Portal/publications">
            <i className="fas fa-book fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/userInfo">
          <Link to="/Portal/userInfo">
            <i className="fas fa-id-card fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/training">
          <Link to="/Portal/training">
            <i className="fas fa-university fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/scheduleExperiments">
          <Link to="/Portal/scheduleExperiments">
            <i className="far fa-calendar-alt fa-2x" />
          </Link>
        </Menu.Item>
        <Menu.Item key="/Portal/getData">
          <Link to="/Portal/getData">
            <i className="fas fa-database fa-2x" />
          </Link>
        </Menu.Item>
        {this.renderAdminAccessItem(userRole, true)}
        {this.renderNavSwitchItem()}
      </Menu>
    );
  }
}