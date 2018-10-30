import React, {Component} from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { colorLightOrange, colorWhite } from 'styles/base';

const adminNavMenu: string = css`
  width: 13%;
  display: inline-block;
  color: ${colorLightOrange};
  vertical-align: top;
  position: relative;
  top: 100px;
  left: 15px;
  overflow: auto;
  max-height: calc(100vh - 120px);
`;

const quickLink: string = css`
  color: ${colorWhite};
`;

const slimHr: string = css`
  margin-top: 10px;
  margin-bottom: 10px;
`;


export default class AdminNav extends Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={adminNavMenu}>
        <div><Link className={quickLink} to="/EUSAdmin">Home</Link></div>
        <hr className={slimHr}/>
        <div><Link className={quickLink} to="/EUSAdmin/generate_reports">Generate Reports</Link></div>
        <hr className={slimHr}/>
        <h4>Proposals</h4>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/search">Proposal Search</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/review">Proposal Review</Link></div>
        <div><i>Approvals</i></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/extensions">Extensions</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/animal_care">Animal Care</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/business_office">Business Office</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/environment">Environment</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/capability_steward">Capability Steward</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/grand_challenges">Grand Challenges</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/human_studies">Human Studies</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/peer_review">Peer Review</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/product_line">Product Line</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/radiological_engineering">Rad. Engineering</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/proposals/approvals/safety_and_health">Safety and Health</Link></div>
        <hr className={slimHr}/>
        <h4>Software</h4>
        <div><Link className={quickLink} to="/EUSAdmin/software/search">Software Search</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/software/manage">Manage Agreements</Link></div>
        <div><i>Approvals</i></div>
        <div><Link className={quickLink} to="/EUSAdmin/software/pending_approvals">Pending Approvals Report</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/software/export_control">Export Control</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/software/capability_steward">Capability Steward</Link></div>
        <hr className={slimHr}/>
        <h4>User Services</h4>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/calls">Manage Calls</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/CATs">Manage CATs</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/facilities">Manage Facilities</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/institutions">Manage Institutions</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/resources">Manage Resources</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/roles">Manage Roles</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/staff">Manage Staff</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/users">Manage Users</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/message_system">Manage Messages</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/letters">Send Letters</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/lists">Update Lists</Link></div>
        <div><Link className={quickLink} to="/EUSAdmin/user_services/mailing_lists">Get Mailing Lists</Link></div>
      </div>
    )
  }
}