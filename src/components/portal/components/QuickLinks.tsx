import React, {Component} from 'react';
import {css} from 'emotion';
import {Link} from 'react-router-dom';
import {colorWhite, colorLightOrange} from 'styles/base';

const quickLinksMenu: string = css`
  width: 13%;
  display: inline-table;
  color: ${colorLightOrange};
  vertical-align: top;
  padding-right: 5px
  `;

const quickLink: string = css`
    color: ${colorWhite};
`;

const quickLinkHr: string = css`
    margin: 5px 0 5px 0;
`;

export default  class QuickLinks extends Component<any, any> {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={quickLinksMenu}>
                QUICK LINKS <hr className={quickLinkHr}/>
                <Link to="/Portal/userInfo" className={quickLink}>My Profile</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/proposals" className={quickLink}>Submit a Proposal</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/scheduleExperiments" className={quickLink}>Schedule an Experiment</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/submitSample" className={quickLink}>Submit a Sample</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/scheduleExperiments" className={quickLink}>Search my Data</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/publications" className={quickLink}>Publications</Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/provideFeedback" className={quickLink}>Provide Feeback</Link> <hr className={quickLinkHr}/>
                <a href="#" className={quickLink} onClick={this.props.logoutHandler}>Sign out</a>
            </div>

        );
    }


}
