import React, {Component} from 'react';
import {css} from 'emotion';
import {Link} from 'react-router-dom';
import {colorWhite, colorLightOrange, colorLightGrey} from 'styles/base';

const quickLinksMenu: string = css`
  width: 17%;
  display: inline-table;
  color: ${colorLightOrange};
  vertical-align: top;
  padding-right: 5px
  `;

const quickLinkContainer: string = css`
  &:hover {
    background-color: ${colorLightGrey};
    span {
      color: ${colorLightOrange};
    }
  }
  height: 2.5em;
  width: 100%;
  padding: 0.5em;
`;

const quickLinksHeader: string = css`
  height: 2.5em;
  width: 100%;
  padding: 0.5em;
`;

const quickLink: string = css`
  color: ${colorWhite};
  margin-left: 5px;
`;

const quickLinkHr: string = css`
  margin: 0;
`;

export default  class QuickLinks extends Component<any, any> {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={quickLinksMenu}>
                <div className={quickLinksHeader}>QUICK LINKS</div><hr className={quickLinkHr}/>
                <Link to="/Portal/userInfo"><div className={quickLinkContainer}><span className={quickLink}>My Profile</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/proposals"><div className={quickLinkContainer}><span className={quickLink}>Submit a Proposal</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/scheduleExperiments"><div className={quickLinkContainer}><span className={quickLink}>Schedule an Experiment</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/submitSample"><div className={quickLinkContainer}><span className={quickLink}>Submit a Sample</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/scheduleExperiments"><div className={quickLinkContainer}><span className={quickLink}>Search my Data</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/publications"><div className={quickLinkContainer}><span className={quickLink}>Publications</span></div></Link> <hr className={quickLinkHr}/>
                <Link to="/Portal/provideFeedback"><div className={quickLinkContainer}><span className={quickLink}>Provide Feeback</span></div></Link> <hr className={quickLinkHr}/>
                <a href="#" onClick={this.props.logoutHandler}><div className={quickLinkContainer}><span className={quickLink}>Sign out</span></div></a>
            </div>

        );
    }


}
