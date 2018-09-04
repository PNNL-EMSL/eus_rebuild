import React, {Component} from 'react'; 
import {css} from 'emotion';
import {Link} from 'react-router-dom';


const quickLinks: string = css`
  width: 18%;
  display: inline-table;
  `;

export default  class QuickLinks extends Component<any, any> {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

            <div className={quickLinks}>
                QUICK LINKS <hr />
                <Link to="/Portal/userInfo">My Profile</Link> <hr />
                <Link to="/Portal/proposals">Submit a Proposal</Link> <hr />
                <Link to="/Portal/scheduleExperiments">Schedule an Experiment</Link> <hr />
                <Link to="/Portal/submitSample">Submit a Sample</Link> <hr />
                <Link to="/Portal/scheduleExperiments">Search my Data</Link> <hr />
                <Link to="/Portal/publications">Publications</Link> <hr />
                <Link to="/Portal/provideFeedback">Provide Feeback</Link> <hr />
                <a href="#" onClick={this.props.logoutHandler} >Sign Out</ a>    
            </div>

        );
    }
        

}