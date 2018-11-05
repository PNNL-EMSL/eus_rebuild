import React from 'react';
import {css} from 'emotion';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

import {portalContentStyle, colorDarkGreen, colorLightOrange, colorBurntOrange, colorDarkGrey, colorBlack} from 'styles/base';
import calendar from 'images/portalTileIcons/schedule_experiment.png';
import sample from 'images/portalTileIcons/proposals_projects.png';

const info: string = css`
  width: 30%;
  min-width: 150px;
  padding: 1em;
  display: inline-block;
  vertical-align: top;
  h3 {
    margin: 1em 0 1em 0;
    color: ${colorBlack};
  }
`;

const note: string = css`
  width: 80%;
  min-width: 120px;
  border: ${colorDarkGrey} 2px solid;
  border-radius: 5px;
  padding: 1em;
  margin: 1em auto 1em auto;
  background-color: ${colorLightOrange};
  font-size: 80%;
`;

const scheduleExperiments: string = css`
  width: 70%;
  padding: 1em;
  display: inline-block;
  vertical-align: top;
  h3 {
    margin: 1em 0 1em 0;
    color: ${colorBlack};
  }
`;

const proposals: string = css`
  width: 100%;
  margin: 5px auto 20px auto;
  background-color: transparent;
  border: 1px solid #ddd;
  border-spacing: 0;
  border-collapse: collapse;
  thead {
    background-color: ${colorDarkGreen};
    font-size: 120%;
    font-weight: bold;
    color: ${colorLightOrange};
    td {
      padding: 8px;
    }
  }
  tbody>tr:nth-of-type(odd) {
    background-color: #f9f9f9
  }
  tbody>tr>td, thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    p span {
      color: ${colorDarkGreen}
    }
    a {
      vertical-align: 1em;
      color: ${colorBurntOrange};
      img {
        width: 40px;
        opacity: 0.8;
      }
      &:hover {
        img {
          opacity: 1;
        }
      }
    }
  }
`;

const proposalTitle: string = css`
  width: 50%;
`;

const sampleAndSchedule: string = css`
  width: 25%;
`;

const sampleProposals = [
  {
    id: '00001',
    title: 'Sample Proposal 1',
    requests: 0,
    booked: 0
  },
  {
    id: '00002',
    title: 'Sample Proposal 2',
    requests: 0,
    booked: 0
  },
  {
    id: '00003',
    title: 'Sample Proposal 3',
    requests: 0,
    booked: 0
  }
];

export default class ScheduleExperiments extends PortalPageBase {

  renderProposalRows() {
    const rows = sampleProposals.map((proposal, index) =>
      <tr key={index}>
        <td className={proposalTitle}>
          <p>#{proposal.id} - {proposal.title}</p>
          <p>
            <span>Requests: {proposal.requests}</span><br />
            Booked: {proposal.booked}
          </p>
        </td>
        <td className={sampleAndSchedule}>
          <a href={'/Portal/rest/resource/proposal/'+proposal.id}><img src={calendar} />Schedule Experiment</a>
        </td>
        <td>
          <a href='#'><img src={sample} />Sample Submission</a>
        </td>
      </tr>
    );
    return (rows);
  }

  renderContent() {
    const rows = this.renderProposalRows();
    return (
      <div className={portalContentStyle}>
        <div className={info}>
          <h3>How does it work</h3>
          <p>
            You can make reservations for yourself and/or any participants on
            experimental resources that have been allocated to your approved proposal(s).
            Once submitted, you'll receive an email confirmation if your request is accepted.
          </p>
          <div className={note}>
            <p>
              Note: Computational and a select number of experimental resources cannot
              be requested using this tool. If you don't see one of your allocated
              resources in the list, please contact your Host.
            </p>
            <p>
              The Environmental and Scanning Transmission Electron Microscopes can
              only be scheduled in 6-hour blocks of time on weekdays (7:00 AM - 1:00
              PM or 1:00 PM - 7:00 PM) and in 12-hour blocks on evenings and
              weekends (7:00 AM - 7:00 PM).
            </p>
          </div>
          <h3>What steps do I take?</h3>
          <ul>
            <li>
              Click on the Schedule Experiment link. A calendar showing the resources
              that have been allocated for the current fiscal year on that proposal
              will be displayed. A legend in the top right-hand corner will show the
              availability of the instrument(s).
            </li>
            <li>
              Time cannot be requested prior to your proposal's start date or after
              its end date.
            </li>
            <li>
              To select a block of time, click on the desired date(s).
            </li>
            <li>
              A block of days can be requested as long as there are no conflicting
              bookings.
            </li>
            <li>
              If you try to select a date that is partially booked, a weekly view will
              open that allows you to request the unscheduled portion of the day. At
              that point, multiple days can be requested by dragging the selection
              across a block of unscheduled time.
            </li>
            <li>
              Some resources (designated with an asterisk) are Read-Only and cannot be
              requested via the scheduling tool. Please contact your Host or Science
              POC to arrange for time.
            </li>
          </ul>
        </div>
        <div className={scheduleExperiments}>
          <h3>Schedule Experiments</h3>
          <p>
            To submit a booking request, click the "Schedule Experiment" link for
            the related proposal. If you are sending samples, please complete the
            appropriate sample submission form by clicking on the link below.
          </p>
          <table className={proposals}>
            <thead><tr><td>Proposals</td><td /><td /></tr></thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
