import React from 'react';
import {css} from 'emotion';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

import {colorLightGrey} from 'styles/base';

const trainingFooter: string = css`
  width: 70%;
  margin: 0 auto 140px auto;
  color: ${colorLightGrey};
  text-align: center;
`;

export default class Training extends PortalPageBase {
  renderContent() {
        return (
            <div>
                <h1>Training Due</h1>
                <div className={trainingFooter}>
                    Note: Training records listed here may take 24 hours to update. If any training is
                    due, the links will direct you to PNNL's training site where you'll be asked to
                    create a unique password. The site works best with Internet Explorer or, for Mac
                    users, Firefox (vs. Safari). Before beginning, be sure you are running the most
                    recent Flash Play Plug-in and that your pop-up blockers are turned off. If you have
                    any problems, please contact the User Support Office (509-371-6003
                    or <a href='mailto: emsl@pnnl.gov'>emsl@pnnl.gov</a>) before trying the numbers
                    provided by PNNL.
                </div>
            </div>
        );
    }
}
