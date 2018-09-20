import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import HeaderBase from 'components/shared/components/HeaderBase';
import { Link } from 'react-router-dom';



import logo from 'images/logo_white.png';

const title: string = css`
  font-weight: 800;
  font-size: 28px;
  text-shadow: 2px 2px 8px #aaa;
  width: auto;
`;

const Logo = styled('img')`
  height: 80px;
`;

const loginHeader: string = css`
  display: flex;
`;

const logout: string = css`
  text-align: right;
  float: right;
  width: 72%;
`;

const headerLinks: string = css`
  color: #F4AA00;
`;

const dividers: string = css`
  color: #F4AA00;
  margin: 10px;
  display: inline;
`;




export default class PortalHeader extends HeaderBase {
  constructor(props) {
    super(props);
    

  }
  

  renderContent(data) {
    console.log('renderContent', this.props);
    return (
      <div>
        <span>
          <Logo src={logo} alt="logo"/>
          <span className={loginHeader}>
            <div className={title}>USER PORTAL</div>
            {
              data.CurrentUser.length !== 0 ? (
                <div className={logout}>
                  <div>Welcome {data.CurrentUser[0].userName}</div>
                  
                  <Link to="/Portal/userInfo" className={headerLinks}>My profile</Link>
                  <p className={dividers}>|</p>
                  <Link to="/Portal/ProvideFeedback" className={headerLinks}>Provide feedback</Link>
                  <p className={dividers}>|</p>
                  <a href="#" className={headerLinks} onClick={this.props.logoutHandler}>Sign out</a>
                </div>
              ) : (<div />)
            }
          </span>
        </span>
      </div>
    );
  }
}