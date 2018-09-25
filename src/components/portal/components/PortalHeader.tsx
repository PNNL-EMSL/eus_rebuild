import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import HeaderBase from 'components/shared/components/HeaderBase';
import { Link } from 'react-router-dom';
import logo from 'images/logo_white.png';
import polygon from 'images/portal_icon_no_text.png'

// const title: string = css`
//   font-weight: 800;
//   font-size: 28px;
//   text-shadow: 2px 2px 8px #aaa;
//   width: auto;
// `;

const Logo = styled('img')`
  height: 80px;
`;

// const loginHeader: string = css`
//   display: flex;
// `;

const logout: string = css`
  position: absolute;
  left: 775px;
  margin-top: 25px;
`;

const headerLinks: string = css`
  color: #F4AA00;
`;

const dividers: string = css`
  color: #F4AA00;
  margin: 10px;
  display: inline;
`;

const Polygon = styled('img')`
position: absolute;
top: 0px;
left: 12%;
height: 91px;
width: 530px;
`;

const headerSpan: string = css`
  display: flex;
`;

const headerText: string = css`
  font-size: 39px;
  width: 500px;
  z-index: 3;
  position: absolute;
  left: 357px;
  top: 20px;
  color: #53682B;
`;

const userText: string = css`
  font-size: 20px;
  text-align: center;
  color: white;
  font-style: italic;
`;
// const PolyText: string = css`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate( -50%, -50% );
//   text-align: center;
//   color: white;
//   font-weight: bold;
// `;

export default class PortalHeader extends HeaderBase {
  constructor(props) {
    super(props);
    

  }
  

  renderContent(data) {
    console.log('renderContent', this.props);
    return (
      <div>
        <span className={headerSpan}>
          <Logo src={logo} alt="logo"/>
          <Polygon src={polygon} alt="polygon" />
          <p className={headerText}>USER PORTAL</p>  
            {
              data.CurrentUser.length !== 0 ? (
                <div className={logout}>
                  <div className={userText}>Welcome {data.CurrentUser[0].userName}</div>
                  
                  <Link to="/Portal/userInfo" className={headerLinks}>My profile</Link>
                  <p className={dividers}>|</p>
                  <Link to="/Portal/ProvideFeedback" className={headerLinks}>Provide feedback</Link>
                  <p className={dividers}>|</p>
                  <a href="#" className={headerLinks} onClick={this.props.logoutHandler}>Sign out</a>
                </div>
              ) : (<div />)
            }
          </span>
      </div>
    );
  }
}