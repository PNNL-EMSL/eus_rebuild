import React, { Component} from 'react';
import { css } from 'emotion';
import TileContainer from 'components/core/TileContainer';
import ProposalsContainer from 'components/core/ProposalsContainer';
import logo from 'images/emsl_logo_notag.jpg'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Marquee from 'react-smooth-marquee'; 
// import TextTicker from 'react-native-text-ticker';



const orcid: string = css`
  border-color: #7c93b5;
  background-color: #e7f0ff;
  padding: 1em;
  border: 1px solid;
  margin-top: 1.5em;
  min-height: 3em;
  float: left;
  width: 45%
`;

const proposalContent: string = css`
  width: 48%;
  float: right;
  padding: 4em 1em 1em;
  margin-top: 30px;
`;

const marquee: string = css`
  width: 60%;
  font-size:20px;
  
`


export default class UserHome extends Component<any, any> {

  constructor(props) {
    super(props);

    this.renderTab = this.renderTab.bind(this);
    this.renderTile = this.renderTile.bind(this);
  }

  renderTab() {
    return (
      <div />
    );
  }

  renderTile() {
    return (
      <div>
        <TileContainer />
      </div>
    );
  }

  render() {
    const navStyle = this.props.navStyle;
    console.log(navStyle);
    let content;
    if(navStyle === 'tabs') {
      content = this.renderTab()
    } else {
      content = this.renderTile();
    }
    return (

      <div>
        <div className={marquee}>
          <Marquee>
            Content goes here 
          </Marquee>
          
        </div>
        
        <div>
          <Carousel autoPlay width="70%">
            <div>
              <img src={logo}/>
              <p>Legend</p>
            </div>
            <div>
              <img src={logo}/>
              <p>Legend 2</p>
            </div>
            <div>
              <img src={logo}/>
              <p>Legend 3</p>
            </div>
          </Carousel>
        </ div>
        <div className={orcid}>
          <p>
            An ORCID iD is now required for all users and must be included for the PI and co-PI
            in the proposal form in order to submit. You don't need your number. To link an
            ORCID iD with your user account:
          </p>
          <ul>
            <li>
              Click on the User Info tab above.
            </li>
            <li>
              Indicate whether or not you authorize EMSL to post non-proprietary user
            research awards, as well as other professional service activities, to your ORCID
            record by clicking on the "Yes" or "No" buttons.
            </li>
            <li>
              You will be redirected to the ORCID login page. If you already have an ID,
            sign in using your ORCID credentials. Otherwise, click "Register now" to
            create an account.
            </li>
            <li>
              After signing into ORCID, click "Authorize", which will redirect you back
            to the Portal and add the ID to the User Info page.
            </li>
            <li>
              To save your settings, be sure to click on "Save User Now" in the top
            right-hand corner.
            </li>
          </ul>
        </div>
        <div className={proposalContent}>
          {content}
          <br />
          <ProposalsContainer />
        </div>
      </div>
    )
  }
}