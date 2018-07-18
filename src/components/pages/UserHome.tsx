import React, {Component} from 'react';
import {css} from 'emotion';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import TileContainer from 'components/core/TileContainer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselContainer from 'components/core/CarouselContainer';
import MarqueeContainer from 'components/core/MarqueeContainer';
import ProposalsContainer from 'components/core/ProposalsContainer';
// import TextTicker from 'react-native-text-ticker';


const orcid:string = css`
  border-color: #7c93b5;
  background-color: #e7f0ff;
  padding: 1em;
  border: 1px solid;
  margin-top: 1.5em;
  min-height: 3em;
  float: left;
  width: 45%
`;

const proposalContent:string = css`
  width: 48%;
  float: right;
  padding: 4em 1em 1em;
  margin-top: 30px;
`;


export default class UserHome extends Component<any, any> {

  GET_LOGIN_FILTER = gql`
    {
      isLoggedIn @client
    }
  `;

  GET_MESSAGE_INFORMATION = gql`
    {
      MarqueeInfos @client {
        id,
        text,
        color,
        background,
        display,
      }
      CarouselInfos @client {
        id,
        text,
        imgUrl,
        order,
        display,
        
      }
    }
  `;

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
    if (navStyle === 'tabs') {
      content = this.renderTab()
    } else {
      content = this.renderTile();
    }
    return (
      <div>
        <Query query={this.GET_MESSAGE_INFORMATION}>
          {({loading, error, data}) => {
            if (loading) {
              return (<div />);
            } else if (error) {
              return (
                <div>
                  Error encountered retrieving Nofication and News Data. We apologize for the inconvenience.
                </div>
              )
            } else {
              const marqueeData = data.MarqueeInfos[0];
              const carouselData = data.CarouselInfos;
              return (
                <div>
                  <MarqueeContainer settings={marqueeData}/>
                  <CarouselContainer settings={carouselData}/>
                </div>
              )
            }
          }}
        </Query>
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