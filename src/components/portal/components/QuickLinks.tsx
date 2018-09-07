import React, {Component} from 'react'; 
import {css} from 'emotion';
import {Link} from 'react-router-dom';


const quickLinks: string = css`
  width: 12%;
  display: inline-table;
  color: #F4AA00;
  `;

export default  class QuickLinks extends Component<any, any> {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

            <div className={quickLinks}>
                QUICK LINKS <hr />
                <Link to="/Portal/userInfo" style={{ color: '#FFF' }}>My Profile</Link> <hr />
                <Link to="/Portal/proposals" style={{ color: '#FFF' }}>Submit a Proposal</Link> <hr />
                <Link to="/Portal/scheduleExperiments" style={{ color: '#FFF' }}>Schedule an Experiment</Link> <hr />
                <Link to="/Portal/submitSample" style={{ color: '#FFF' }}>Submit a Sample</Link> <hr />
                <Link to="/Portal/scheduleExperiments" style={{ color: '#FFF' }}>Search my Data</Link> <hr />
                <Link to="/Portal/publications" style={{ color: '#FFF' }}>Publications</Link> <hr />
                <Link to="/Portal/provideFeedback" style={{ color: '#FFF' }}>Provide Feeback</Link> <hr />
                <a href="#" style={{ color: '#FFF' }} onClick={this.props.logoutHandler} >Sign Out</ a>    
            </div>

        );
    }
        

}