import React from 'react';
import {css} from 'emotion';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import TrainingLink from 'components/portal/components/training/TrainingLinks';

import pnnlLogo from 'images/PNNL_Logo_grey_transparent.png';
import iops from 'images/iops_logo.png';

import {colorLightGrey} from 'styles/base';

const trainingFooter: string = css`
  width: 65%;
  margin: 50px auto 140px auto;
  color: ${colorLightGrey};
  text-align: center;
`;

const trainingLinks: string = css`
    width: 50%;
    margin: auto;
    h1 {
        color: white;
    };
`;


export default class Training extends PortalPageBase {

    /**
     * TODO: Get Traning due from server...
     * function getTrainingDue(props) {
     *      foreach...
     * }
     */

    renderContent() {
        return (
            <div>
                <div className={trainingLinks}>
                    <TrainingLink
                        img={pnnlLogo}
                        title='Formal'
                        link='//psportal.pnl.gov/psp/paprod/EMPLOYEE/ELM/c/PNL_LM_SS_LEARNING.PNL_MY_LEARNING.GBL'
                        linkText='PNNL Online Training site'
                        username='8706363'
                        password='87TRN_km'
                    />
                    <TrainingLink
                        img={iops}
                        title='Lab Specific'
                        link='//iops.pnl.gov/'
                        linkText='IOPS Training site'
                        username='H8706363'
                        password='8706363'
                    />
                </div>
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
