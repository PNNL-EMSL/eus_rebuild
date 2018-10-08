import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import ProposalLoad from 'components/portal/pages/proposals/Load';
import ProposalNew from 'components/portal/pages/proposals/New';
import { Button } from 'antd';

import {portalContentStyle} from 'styles/base';

export default class ProposalHome extends PortalPageBase {
  constructor(props) {
    super (props);

    this.navigateToNew = this.navigateToNew.bind(this);
  }

  navigateToNew() {
    this.props.history.push('/Portal/proposals/new');
  }

  renderGetStarted() {
    return (
      <div>
        <h1><strong>Get Started</strong></h1>
        <p>Click the "Create New Proposal" button to the right to start filling out a new proposal.</p>
        <Button type="primary" onClick={this.navigateToNew}>Create New Proposal</Button>

        <p>Note: Submission of a proposal implies your agreement to the <a href="https://www.emsl.pnl.gov/using-emsl/terms.shtml">Terms and Conditions for Using EMSL</a></p>
      </div>
    );
  }

  renderExisting() {
    // Get the list of all the proposals
    // filter/group them based on the following
    // All
    // Status = Denied/Closed/Withdrawn
    // Primary Author = current user
    // Saved (status = saved, submitted = Not Submitted)
    // Pending & Open (End date is after today)
    return (
      <div />
    )
  }

  renderNewProposal() {
    return (
      <div>
        <ProposalNew {...this.props} />
      </div>
    )
  }

  renderLoadProposal(id) {
    return (
      <div>
        Loading proposal {id}
        <ProposalLoad id={id} {...this.props} />
      </div>
    )
  }

  renderUndefinedType(type) {
    return (
      <div>
        Undefined proposal type: {type}
      </div>
    )
  }

  renderContent() {
    const numProposals = 0;
    const content:JSX.Element[] = [];
    if(this.props.id) {
      content.push(this.renderLoadProposal(this.props.id));
    } else if(this.props.type === 'new') {
      content.push(this.renderNewProposal());
    } else if(this.props.type !== undefined) {
      content.push(this.renderUndefinedType(this.props.type));
    } else {
      if (numProposals > 0) {
        content.push(this.renderExisting());
      } else {
        content.push(this.renderGetStarted());
      }
    }
    return (
      <div className={portalContentStyle}>
        {content}
      </div>
    )

  }
    
}

