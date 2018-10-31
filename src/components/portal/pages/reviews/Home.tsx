import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import ReviewLoad from 'components/portal/pages/reviews/Load';
// import ReviewsNew from 'components/portal/pages/reviews/New';
import { Button } from 'antd'
import moment from 'moment';

import sampleReviews from 'tests/sampleData/sampleReviews.json';
import {portalContentStyle, buttonMargin} from 'styles/base';

export default class ReviewsHome extends PortalPageBase {
  static allProposals = sampleReviews.proposals;
  static allReviews = ReviewsHome.createReviewsForProposals(ReviewsHome.allProposals);

  static createReviewsForProposals(proposals) {
    proposals.forEach((proposal) => {
      const reviews:any[] = [];
      proposal.users.forEach((user) => {
        reviews.push(ReviewsHome.createReview(proposal, user));
      });
      proposal.reviews = reviews;
    });
    return proposals;
  }

  static createReview(proposal, user, panel=false) {
    const reviewObj = {
      propId: proposal.id,
      proposalTitle: proposal.title,
      user,
      author: proposal.primaryAuthor,
      criterion: JSON.parse(JSON.stringify(proposal.criterion.filter((criterion) => (criterion.panel === panel)))),
      dueDate: moment().add(7, 'days').format('MM-DD-YYYY'),
      reviewerType: panel ? 'Panel Reviewer' : 'Primary',
      reviewStatus: 'notStarted',
    };
    return reviewObj;
  }

  constructor(props) {
    super(props);

    this.state = {
      curUser: 'admin',
    };

    this.navigateToNew = this.navigateToNew.bind(this);
    this.getReviewList = this.getReviewList.bind(this);
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
  
  renderLoadReview(proposalId, reviewId) {
    const review = ReviewsHome.allReviews[proposalId].reviews[reviewId];
    console.log('loadReview', review);
    return (
      <div key="load">
        Loading Review for Proposal {proposalId}
        <ReviewLoad review={review} {...this.props} />
      </div>
    );
  }

  getReviewList() {
    const filtered:any[] = [];
    ReviewsHome.allReviews.forEach((proposal) => {
      console.log('80, reviews/home', proposal);
      if(proposal.reviewers !== 'complete') {
        proposal.reviews.forEach((review) => {
          if (review.user === this.state.curUser) {
            filtered.push(review);
          }
        });
      }
    });
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
    const reviews = this.getReviewList();
    const content:JSX.Element[] = [];
    reviews.forEach((review) => {
      console.log('107, reviews/home', review);
      content.push(
        <tr>
          <td>{review.proposalTitle}</td>
          <td>{moment().add(((Math.floor(Math.random() * 7) + 3)), 'days').format('MM-DD-YYYY')}</td>
          <td>{review.reviewerType}</td>
          <td>
            <i>{review.reviewStatus}</i>
            {review.reviewStatus !== 'Not Started' ? (
              <div>
              <div>{review.score}</div>
              <Link to={review.propId+'_'+review.id} >Continue Review</Link>
              </div>
            ) : (
              <Link to={review.propId+'_'+review.id} >Begin Review</Link>
            )}
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Proposal Title</th>
            <td>Due Date</td>
            <th>Reviewer Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    );
  }

  renderContent() {
    const filteredReviews = this.getReviewList();
    const numReviews = filteredReviews.length;
    // Query the database to get the number of reviews associated with the current user
    const content:JSX.Element[] = [];
    if(this.props.id) {
      content.push(this.renderLoadReview(this.props.id, 1));
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