import React, { Component } from 'react';
import { css } from 'emotion';
import TileContainer from 'components/core/TileContainer';
import TableContainer from 'components/core/TableContainer';

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

export default class UserHome extends Component<any, any> {

  constructor(props) {
    super(props);

    this.renderTab = this.renderTab.bind(this);
    this.renderTile = this.renderTile.bind(this);
  }

  renderTab() {
    return (
      <div>
        Temp tab user home
      </div>
    );
  }

  renderTile() {
    return (
      <div>
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
          <TileContainer />
          <TableContainer type="proposals" />
        </div>
      </div>
    );
  }

  render() {
    const navStyle = this.props.navStyle;
    if(navStyle === 'tabs') {
      return this.renderTab()
    }
    return this.renderTile();
  }
}