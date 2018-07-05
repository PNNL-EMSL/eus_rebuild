import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled from 'react-emotion'
import * as React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import PropTypes from 'prop-types';

import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';

import Home from 'components/pages/Home';
import Search from 'components/pages/Search';
import Browse from 'components/pages/Browse';

import Login from 'components/pages/Login';
import TileUserHome from 'components/pages/TileUserHome';
import Proposals from 'components/pages/Proposals';
import Publications from 'components/pages/Publications';
import UserInfo from 'components/pages/UserInfo';
import Training from 'components/pages/Training';
import ScheduleExperiments from 'components/pages/ScheduleExperiments'
import GetData from 'components/pages/GetData';
// import TabUserHome from 'components/pages/TabUserHome';

import logo from 'images/logo.png';




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
const content: string = css`
  margin: 5px 20px 15px 100px;
  display: flex;
  flex: 1;
`;

const Logo = styled('img')`
  height: 80px;
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
class App extends React.Component<RouteComponentProps<any>> {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  public render() {
    return (
      <div className={app}>
        <div className={header}>
          <Logo src={logo} alt="logo" />
          <div className={titleContainer}>
            <div className={title}>EMSL User Portal</div>
            <Menu
              className={menu}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              selectedKeys={[this.props.location.pathname]}
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
            </Menu>
          </div>
        </div>
        <div className={content}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/homeTile" component={TileUserHome} />
            <Route exact path="/homeTab" component={TileUserHome} />
            <Route exact path="/proposals" component={Proposals} />
            <Route exact path="/publications" component={Publications} />
            <Route exact path="/userInfo" component={UserInfo} />
            <Route exact path="/training" component={Training} />
            <Route exact path="/scheduleExperiments" component={ScheduleExperiments} />
            <Route exact path="/oldHome" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/getData" component={GetData} />
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

