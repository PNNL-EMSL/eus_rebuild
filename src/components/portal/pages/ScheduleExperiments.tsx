import React from 'react';
import {css} from 'emotion';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

import {colorLightGreen, colorLightGrey, colorDarkGrey, colorBlack, colorWhite} from 'styles/base';

const info: string = css`
    width: 30%;
    min-width: 150px;
    padding: 1em;
    background-color: ${colorLightGreen};
    border: ${colorBlack} 3px solid;
    h3 {
        margin: 0 0 5px 0;
    }
`;

const note: string = css`
    width: 80%;
    min-width: 120px;
    border: ${colorDarkGrey} 3px solid;
    border-radius: 5px;
    padding: 1em;
    margin: 1em auto 1em auto;
    background-color: ${colorLightGrey};
`;

const scheduleExperiments: string = css`
    width: 60%;
`;

const schedule: string = css`
    width: 100%;
    min-width: 800;
    margin: auto;
    background-color: ${colorWhite};
`;

export default class ScheduleExperiments extends PortalPageBase {
  renderContent() {
        return (
            <div>
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
                    <div className={schedule}>
                        Proposals
                    </div>
                </div>
            </div>
        );
    }
}
