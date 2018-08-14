import { Menu } from 'antd';
import { css } from 'emotion';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBase from 'components/shared/components/NavBase';

import { colorBlack, colorLightGreen, colorDarkGreen, colorDarkGreenSubMenu } from 'styles/base';

const menu: string = css`
  background: ${colorDarkGreen};
  border-bottom-color: ${colorDarkGreen};
  margin: 0px 8px;
  border-radius: 4px;
  li:first-child {
    border-radius: 4px 0 0 4px;
  }
  .ant-menu {
    background-color: ${colorDarkGreen};
    border-bottom-color: ${colorDarkGreen};
  }
  .ant-menu-inline.ant-menu-sub {
    background-color: ${colorDarkGreenSubMenu};
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

const SubMenu = Menu.SubMenu;

export default class AdminNav extends NavBase {

  constructor(props) {
    super(props);

    this.renderNavSwitchItem = this.renderNavSwitchItem.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu(collapsed) {
    return (
      <div style={collapsed ? {width: 75}:{}}>
        <Menu
          className={menu}
          theme="dark"
          mode={collapsed ? "vertical" :"inline"}
          defaultSelectedKeys={['/EUSAdmin']}
          selectedKeys={[this.props.pathname]}
        >
          <Menu.Item key="/EUSAdmin">
            <Link to="/EUSAdmin">
              {collapsed ? <i className="fas fa-home" /> : "Home"}
            </Link>
          </Menu.Item>
          <Menu.Item key="/EUSAdmin/generateReports">
            <Link to="/EUSAdmin/generateReports">
              {collapsed ? <i className="fas fa-file-invoice" /> : "Generate Reports (NOT ESTABLISHED)"}
            </Link>
          </Menu.Item>
          <SubMenu key="Proposals" title={collapsed ? <i className="fas fa-book" /> : <span>Proposals</span>}>
            <Menu.Item key="/EUSAdmin/proposals/search">
              <Link to="/EUSAdmin/proposals/search">Proposal Search (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/proposals/review">
              <Link to="/EUSAdmin/proposals/review">Proposal Review (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <SubMenu key="ProposalApprovals" title="Approvals" >
              <Menu.Item key="/EUSAdmin/proposals/approvals/Extensions">
                <Link to="/EUSAdmin/proposals/approvals/Extensions">Extensions (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/animal">
                <Link to="/EUSAdmin/proposals/approvals/animal">Animal Care (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/business">
                <Link to="/EUSAdmin/proposals/approvals/business">Business Office (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/environment">
                <Link to="/EUSAdmin/proposals/approvals/environment">Environment (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/capability">
                <Link to="/EUSAdmin/proposals/approvals/capability">Capability Steward (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/grandChallenges">
                <Link to="/EUSAdmin/proposals/approvals/grandChallenges">Grand Challenges (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/humanStudies">
                <Link to="/EUSAdmin/proposals/approvals/humanStudies">Human Studies (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/peerReview">
                <Link to="/EUSAdmin/proposals/approvals/peerReview">Peer Review (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/productLine">
                <Link to="/EUSAdmin/proposals/approvals/productLine">Product Line (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/radEngineering">
                <Link to="/EUSAdmin/proposals/approvals/radEngineering">Rad. Engineering (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/proposals/approvals/safetyHealth">
                <Link to="/EUSAdmin/proposals/approvals/safetyHealth">Safety and Health (NOT ESTABLISHED)</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="Software" title={collapsed ? <i className="fas fa-compact-disc" /> : <span>Software</span>}>
            <Menu.Item key="/EUSAdmin/software/search">
              <Link to="/EUSAdmin/softwareSearch">Software Search (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/software/agreements">
              <Link to="/EUSAdmin/agreements">Software Search (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <SubMenu key="SoftwareApprovals" title="Approvals">
              <Menu.Item key="/EUSAdmin/software/pendingApprovals">
                <Link to="/EUSAdmin/software/pendingApprovals">Pending Approvals Report (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/software/exportControl">
                <Link to="/EUSAdmin/software/exportControl">Export Control (NOT ESTABLISHED)</Link>
              </Menu.Item>
              <Menu.Item key="/EUSAdmin/software/capabilitySteward">
                <Link to="/EUSAdmin/software/capabilitySteward">Capability Steward (NOT ESTABLISHED)</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="User Services" title={collapsed ? <i className="fas fa-users"/> : <span>User Services</span>}>
            <Menu.Item key="/EUSAdmin/messageSystem">
              <Link to="/EUSAdmin/messageSystem">Message System</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/calls">
              <Link to="/EUSAdmin/services/calls">Manage Calls (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/cats">
              <Link to="/EUSAdmin/services/cats">Manage CATs (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/facilities">
              <Link to="/EUSAdmin/services/facilities">Manage Facilities (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/institutions">
              <Link to="/EUSAdmin/services/institutions">Manage Institutions (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/resources">
              <Link to="/EUSAdmin/services/resources">Manage Resources (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/roles">
              <Link to="/EUSAdmin/services/roles">Manage Roles (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/staff">
              <Link to="/EUSAdmin/services/staff">Manage Staff (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/userAdmin">
              <Link to="/EUSAdmin/userAdmin">Manage Users</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/letters">
              <Link to="/EUSAdmin/services/letters">Send Letters (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/lists">
              <Link to="/EUSAdmin/services/lists">Update Lists (NOT ESTABLISHED)</Link>
            </Menu.Item>
            <Menu.Item key="/EUSAdmin/services/mailingLists">
              <Link to="/EUSAdmin/services/mailingLists">Get Mailing Lists (NOT ESTABLISHED)</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/Portal">
                <Link to="/Portal">
                  {collapsed ? <i className="fas fa-tv" /> : "Link to Portal"}
                </Link>
          </Menu.Item>
          {this.renderNavSwitchItem()}
        </Menu>
      </div>
    )
  }

  renderExpanded(userRole) {
    return this.renderMenu(false);
  }

  renderCollapsed(userRole) {
    return this.renderMenu(true);
  }
}