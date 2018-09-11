import React from 'react';
import {css} from 'emotion';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import TileContainer from 'components/portal/components/PortalTileContainer';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselContainer from 'components/shared/components/CarouselContainer';
import MarqueeContainer from 'components/shared/components/MarqueeContainer';
import QuickLinks from 'components/portal/components/QuickLinks';

const orcid:string = css`
  border-color: #7c93b5;
  background-color: #e7f0ff;
  padding: 1em;
  border: 1px solid;
  margin-top: 1.5em;
  min-height: 3em;
  float: left;
`;

const newsDiv:string = css`
  width: 23%;
  display: inline-flex;
`;

const tilesDiv:string = css`
  width: 620px;
  float: right;
`;

const announcementDiv = css`
  display: inline-block;
  width: 87%;
  float: right;
`;

const carouselDiv:string = css`
  width: 80%;
  float: right;
  
`;



export default class UserHome extends PortalPageBase {

  GET_USER_ROLE = gql`
    {
      CurrentUser @client {
        roleLevel
      }
    }
  `;

  GET_MARQUEE_INFORMATION = gql`
    {
      MarqueeInfos @client {
        id,
        text,
        color,
        background,
        display,
      }
    }
  `;

  GET_CAROUSEL_INFORMATION = gql`
    {
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

    this.renderTile = this.renderTile.bind(this);
  }

  renderTile() {
    const query = this.GET_USER_ROLE;
    const role = this.props.client.readQuery({query}).CurrentUser[0].roleLevel;
    return (
      <div>
        <TileContainer role={role} {...this.props}/>
      </div>
    );
  }

  renderContent () {
    const content = this.renderTile();
    return (
      <div>
      <QuickLinks />
        <div className={announcementDiv}>
          
        <Query query={this.GET_MARQUEE_INFORMATION}>
          {({loading, error, data}) => {
            if (loading) {
              return (<div />);
            } else if (error) {
              return (
                <div>
                  Error encountered retrieving Notification Data. We apologize for the inconvenience.
                </div>
              )
            } else {
              console.log('marquee data', data);
              const marqueeData = data.MarqueeInfos[0];
              return (
                <div>
                  <MarqueeContainer settings={marqueeData}/>
                </div>
              )
            }
          }}
        </Query>
          <div className={newsDiv}>
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
          </div>
          <div className={tilesDiv}>
            {content}
          </div>
        </div>
        <div className={carouselDiv}>
          <Query query={this.GET_CAROUSEL_INFORMATION}>
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
                const carouselData = data.CarouselInfos;
                return (
                  <CarouselContainer settings={carouselData}/>
                )
              }
            }}
          </Query>
        </div>
      </div>
    )
  }
}