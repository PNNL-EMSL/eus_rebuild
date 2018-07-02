import { Menu } from 'antd';
import { css, injectGlobal } from 'emotion';
import styled, { keyframes } from 'react-emotion'
import * as React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import PropTypes from 'prop-types';

import { colorBlack, colorLightGreen, colorDarkGreen } from 'styles/base';

import Home from 'components/pages/Home';
import Search from 'components/pages/Search';
import Browse from 'components/pages/Browse'

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
const spin: string = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  animation: ${spin} infinite 20s linear;
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
            <div className={title}>Soil Microbes Explorer</div>
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
              <Menu.Item key="/search">
                <Link to="/search">Search</Link>
              </Menu.Item>
              <Menu.Item key="/browse">
                <Link to="/browse">Browse</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className={content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/browse" component={Browse} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);

