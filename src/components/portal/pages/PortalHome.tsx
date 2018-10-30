import React from 'react';
import { css } from 'emotion';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import TileContainer from 'components/portal/components/PortalTileContainer';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselContainer from 'components/shared/components/CarouselContainer';
import MarqueeContainer from 'components/shared/components/MarqueeContainer';
import QuickLinks from 'components/portal/components/QuickLinks';
import { Modal, Button } from 'antd';
import { colorLightGreen, colorBlack, colorYellow, colorLightGrey, colorWhite } from 'styles/base';

const orcid: string = css`
  background-color: ${colorLightGreen};
  color: ${colorWhite};
  padding: 2em;
  border: ${colorBlack} 3px solid;
  margin-top: .5em;
  min-height: 3em;
  float: left;
`;

const newsDiv: string = css`
  width: 225px;
  height: 425px;
  display: inline-flex;
`;

const mainContent: string = css`
  width: 83%;
  float: right;
  display: inline-block;
`;

const tilesDiv: string = css`
  width: 620px;
  float: right;
`;

const announcementDiv = css`
  max-width: 860px;
  margin: auto;
`;

const carouselDiv: string = css`
  max-width: 860px;
  margin: 0 auto 140px auto;
  padding: 1.5em;
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
        webUrl,
        order,
        display,

      }
    }
  `;

    constructor(props) {
        super(props);

        this.renderTile = this.renderTile.bind(this);
    }


    summary = () => {
        Modal.info({
            title: 'Summary Required',
            content: (
                <div>
                    <p>Summary Goes Here</p>
                </div>
            ),
        });
    };

    orcidId = () => {
        Modal.info({
            title: 'ORCID ID',
            content: (
                <div>
                    <p>An ORCID iD is now required for all users and must be included for the PI and co-PI
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
            ),
        });
    };

    training = () => {
        Modal.info({
            title: 'Training Due',
            content: (
                <div>
                    <p>What Training is due goes here</p>
                </div>
            ),
        });
    };


    renderTile() {
        const query = this.GET_USER_ROLE;
        const role = this.props.client.readQuery({ query }).CurrentUser[0].roleLevel;
        return (
            <div>
                <TileContainer role={role} {...this.props} />
            </div>
        );
    };

    renderContent() {
        const content = this.renderTile();
        return (
            <div>
                <QuickLinks logoutHandler={this.logoutHandler} />
                <div className={mainContent}>
                    <div className={announcementDiv}>
                        <Query query={this.GET_MARQUEE_INFORMATION}>
                            {({ loading, error, data }) => {
                                if (loading) {
                                    return (<div />);
                                } else if (error) {
                                    return (
                                        <div>
                                            Error encountered retrieving Notification Data. We apologize for the inconvenience.
                                        </div>
                                    )
                                } else {
                                    const marqueeData = data.MarqueeInfos[0];
                                    return (
                                        <div>
                                            <MarqueeContainer settings={marqueeData} />
                                        </div>
                                    )
                                }
                            }}
                        </Query>
                        <div className={newsDiv}>
                            <div className={orcid}>
                                <p style={{ textAlign: 'center' }}><b>Announcements</b></p>
                                <div>
                                    <Button style={{ margin: 3, background: colorLightGrey, fontWeight: 'bold', textAlign: 'center' }} onClick={this.summary}>Summary Required</Button>
                                    <Button style={{ margin: 3, background: colorLightGrey, fontWeight: 'bold', textAlign: 'center' }} onClick={this.orcidId}>Orcid® Info Needed</Button>
                                    <Button style={{ margin: 3, background: colorYellow, fontWeight: 'bold', textAlign: 'center' }} onClick={this.training}>Training Due</Button>
                                </div>
                            </div>
                        </div>
                        <div className={tilesDiv}>
                            {content}
                        </div>
                    </div>
                    <div className={carouselDiv}>
                        <Query query={this.GET_CAROUSEL_INFORMATION}>
                            {({ loading, error, data }) => {
                                if (loading) {
                                    return (<div />);
                                } else if (error) {
                                    return (
                                        <div>
                                            Error encountered retrieving Notification and News Data. We apologize for the inconvenience.
                                        </div>
                                    )
                                } else {
                                    const carouselData = data.CarouselInfos;
                                    return (
                                        <CarouselContainer settings={carouselData} />
                                    )
                                }
                            }}
                        </Query>
                    </div>
                </div>
            </div>
        )
    }
}
