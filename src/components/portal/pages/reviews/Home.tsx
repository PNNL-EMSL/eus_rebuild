import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import ReviewLoad from 'components/portal/pages/reviews/Load';
// import ReviewsNew from 'components/portal/pages/reviews/New';
import { Button } from 'antd'

import sampleReviews from 'tests/sampleData/sampleReviews.json';
import {portalContentStyle, buttonMargin} from 'styles/base';

export default class ReviewsHome extends PortalPageBase {
  constructor(props) {
    super(props);

    this.state = {
      curUser: 'admin',
      allReviews: sampleReviews.proposals
    }

    this.navigateToNew = this.navigateToNew.bind(this);
    this.getProposalList = this.getProposalList.bind(this);
    this.handleChangeToUser = this.handleChangeToUser.bind(this);
    this.handleChangeToAdmin = this.handleChangeToAdmin.bind(this);
    this.handleChangeToGuest = this.handleChangeToGuest.bind(this);
    this.renderProposalReviewList = this.renderProposalReviewList.bind(this);
  }

  navigateToNew() {
    this.props.history.push('/Portal/reviews/new');
  }

  renderNoReviews() {
    return (
      <div key="noReviews">
        <h4>No Proposals To Review</h4>
        If you receive an email in the future informing you that you have new proposals to review, return to this page and they will be listed here.
      </div>
    )
  }
  
  renderLoadReview(proposalId) {
    return (
      <div key="load">
        Loading Review for Proposal {proposalId}
        <ReviewLoad proposalId={proposalId} {...this.props} />
      </div>
    );
  }

  getProposalList() {
    const filtered = this.state.allReviews.filter((item) => item.users.includes(this.state.curUser));
    return filtered;
  }

  handleChangeToUser() {
    this.setState({curUser: 'user'});
  }

  handleChangeToAdmin() {
    this.setState({curUser: 'admin'});
  }

  handleChangeToGuest() {
    this.setState({curUser: 'guest'});
  }

  renderProposalReviewList() {
    // Get the list of proposal reviews for current user
      // TODO: Add two-three proposals to review for two different users.
      // TODO: At least one of these proposals should have both users as reviewer
      // TODO: Should be able to show "completed reviews" for this shared proposal
    const proposals = this.getProposalList();
    const content:JSX.Element[] = [];
    proposals.forEach((proposal) => {
      content.push(
        <tr>
          <td>{proposal.id}</td>
          <td>{proposal.title}</td>
        </tr>
      );
    });
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Proposal ID</th>
            <th>Proposal Title</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    );
  }

  renderContent() {
    const filteredProposals = this.getProposalList();
    const numReviews = filteredProposals.length;
    // Query the database to get the number of reviews associated with the current user
    const content:JSX.Element[] = [];
    if(this.props.id) {
      content.push(this.renderLoadReview(this.props.id));
    } else {
      if (numReviews > 0) {
        content.push(this.renderProposalReviewList());
      } else {
        content.push(this.renderNoReviews());
      }
    }
    return (
      <div className={portalContentStyle}>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToAdmin}>View as 'admin'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToUser}>View as 'user'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToGuest}>View as 'guest'</Button>
        {content}
      </div>
    )
  }
}