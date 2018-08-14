import React from 'react';
import PageBase from 'components/shared/pages/PageBase';
import ProposalLoad from 'components/portal/pages/proposals/Load';
import ProposalNew from 'components/portal/pages/proposals/New';

export default class ProposalHome extends PageBase {

  renderGetStarted() {
    return (
      <div>
        <h1><strong>Get Started</strong></h1>
        <p>Click the "Create New Proposal" button to the right to start filling out a new proposal.</p>

        // Make as pop-up and double check that page is up-to-date
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
        Creating new Proposal
        <ProposalNew />
      </div>
    )
  }

  renderLoadProposal(id) {
    return (
      <div>
        Loading proposal {id}
        <ProposalLoad id={id}/>
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

  renderPage() {
    const numProposals = 0;
    console.log('this.props', this.props);
    if(this.props.id) {
      return this.renderLoadProposal(this.props.id);
    }
    if(this.props.type === 'new') {
      return this.renderNewProposal();
    } else if(this.props.type !== undefined) {
      return this.renderUndefinedType(this.props.type);
    }
    if(numProposals > 0) {
      return this.renderExisting();
    } else {
      return this.renderGetStarted();
    }

  }
    
}

