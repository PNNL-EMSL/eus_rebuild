import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import ReviewLoad from 'components/portal/pages/reviews/Load';
// import ReviewsNew from 'components/portal/pages/reviews/New';
import { Button, Checkbox } from 'antd'
import {Link} from 'react-router-dom';
import moment from 'moment';

import sampleReviews from 'tests/sampleData/sampleReviews.json';
import {portalContentStyle, buttonMargin, declineButton, acceptButton} from 'styles/base';

export default class ReviewsHome extends PortalPageBase {
  static allProposals = sampleReviews.proposals;
  static allReviews = ReviewsHome.createReviewsForProposals(ReviewsHome.allProposals);

  static createReviewsForProposals(proposals) {
    proposals.forEach((proposal) => {
      const reviews:any[] = [];
      let reviewNum = 1;
      proposal.users.forEach((user) => {
        reviews.push(ReviewsHome.createReview(proposal, user, reviewNum++));
      });
      proposal.reviews = reviews;
    });
    return proposals;
  }

  static createReview(proposal, user, reviewNum, panel=false) {
    const criteria:any[] = [];
    JSON.parse(JSON.stringify(proposal.criterion.filter((criterion) => (criterion.panel === panel)))).forEach((criterion) => {
      const reviewCriterion = {
        id: criterion.id,
        title: criterion.title,
        text: criterion.text,
        weight: criterion.weight,
        score: undefined,
        comment: '',
      };
      criteria.push(reviewCriterion);
    });
    const reviewObj = {
      propId: proposal.id,
      id: reviewNum,
      proposalTitle: proposal.title,
      user,
      fileUploaded: false,
      authors: proposal.authors,
      criterion: criteria,
      reviewSummary: '',
      reviewConflicts: '',
      dueDate: moment().add(((Math.floor(Math.random() * 7) + 3)), 'days').format('MM-DD-YYYY'),
      reviewerType: panel ? 'Panel Reviewer' : 'Primary',
      reviewStatus: 'Not Started',
    };
    return reviewObj;
  }

  constructor(props) {
    super(props);

    this.state = {
      curUser: 'admin',
      selectedReviewList: [],
    };

    this.navigateToNew = this.navigateToNew.bind(this);
    this.getReviewList = this.getReviewList.bind(this);
    this.handleChangeToUser = this.handleChangeToUser.bind(this);
    this.handleChangeToAdmin = this.handleChangeToAdmin.bind(this);
    this.handleChangeToGuest = this.handleChangeToGuest.bind(this);
    this.renderProposalReviewList = this.renderProposalReviewList.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  navigateToNew() {
    this.props.history.push('/Portal/reviews/new');
  }
  
  updateReview(propId, reviewId, review) {
    ReviewsHome.allReviews[propId-1].reviews[reviewId-1] = review;
    this.props.history.push('/Portal/reviews/');
  }

  renderNoReviews() {
    return (
      <div key="noReviews">
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToAdmin}>View as 'admin'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToUser}>View as 'user'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToGuest}>View as 'Science Panel Lead'</Button>
        <h4>No Proposals To Review</h4>
        If you receive an email in the future informing you that you have new proposals to review, return to this page and they will be listed here.
      </div>
    )
  }
  
  renderLoadReview(proposalId, reviewId) {
    const review = ReviewsHome.allReviews[proposalId-1].reviews[reviewId-1];
    console.log('loadReview', review);
    return (
      <div key="load">
        <ReviewLoad review={review} {...this.props} updateReview={this.updateReview} />
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
    const instance = this;
    reviews.forEach((review) => {
      console.log('107, reviews/home', review);
      function addToSelected(e) {
        console.log('checkbox Change, review, checked', review, e.target.checked);
        const selectedReviewList = instance.state.selectedReviewList;
        if(e.target.checked) {
          selectedReviewList.push(review.propId+'_'+review.id);
        } else {
          selectedReviewList.splice(selectedReviewList.findIndex((item) => item === review.propId+'_'+review.id), 1);
        }
        instance.setState({selectedReviewList})
      }

      content.push(
        <tr>
          <td><Checkbox checked={this.state.selectedReviewList.includes(review.propId + '_' + review.id)} onChange={addToSelected} /></td>
          <td>{review.proposalTitle}</td>
          <td>{review.authors[0]}</td>
          <td>{review.dueDate}</td>
          <td>{review.reviewerType}</td>
          <td>
            <div>
              <i>{review.reviewStatus}</i>
            </div>
            {review.reviewStatus !== 'Not Started' ? (
              <div>
                <div>{review.score}</div>
                <Link to={'/Portal/reviews/' + review.propId+'_'+review.id} >Continue Review</Link>
              </div>
            ) : (
              <Link to={'/Portal/reviews/' + review.propId+'_'+review.id} >Start Review</Link>
            )}
          </td>
        </tr>
      );
    });

    function handleSelectAll() {
      const selectedReviewList:string[] = [];
      reviews.forEach((review) => {
        selectedReviewList.push(review.propId + '_' + review.id);
      });
      instance.setState({selectedReviewList});
    }

    function handleSelectCompleted() {
      const selectedReviewList:string[] = [];
      reviews.forEach((review) => {
        if(review.reviewStatus === 'Completed') {
          selectedReviewList.push(review.propId + '_' + review.id);
        }
      });
      instance.setState({selectedReviewList});
    }

    function handleSelectNone() {
      instance.setState({selectedReviewList: []});
    }

    return (
      <div>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToAdmin}>View as 'admin'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToUser}>View as 'user'</Button>
        <Button className={buttonMargin} type="primary" onClick={this.handleChangeToGuest}>View as 'Science Panel Lead'</Button>
        <h3>Reviews</h3>
        <ol>
          <li>To read the complete proposal details, click the  Review Package link in the Proposal Column</li>
          <li>To review the proposal, click the review link in the Status Column</li>
        </ol>
        <div>
          Select:
          <Button className={buttonMargin} onClick={handleSelectAll} >All</Button>
          <Button className={buttonMargin} onClick={handleSelectCompleted} >Completed</Button>
          <Button className={buttonMargin} onClick={handleSelectNone} >None</Button>
          <span style={{float: 'right'}}>
            <Button className={acceptButton}>Submit selected reviews</Button>
            <Button className={declineButton}>Decline selected reviews</Button>
          </span>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th />
              <th>Proposal Title</th>
              <th>Primary Author</th>
              <td>Due Date</td>
              <th>Reviewer Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </div>
    );
  }

  renderContent() {
    const filteredReviews = this.getReviewList();
    const numReviews = filteredReviews.length;
    // Query the database to get the number of reviews associated with the current user
    const content:JSX.Element[] = [];
    if(this.props.id) {
      const propId = this.props.id.split('_')[0];
      const reviewId = this.props.id.split('_')[1];
      console.log('load', this.props.id, propId, reviewId);
      content.push(this.renderLoadReview(propId, reviewId));
    } else {
      if (numReviews > 0) {
        content.push(this.renderProposalReviewList());
      } else {
        content.push(this.renderNoReviews());
      }
    }
    return (
      <div className={portalContentStyle}>
        {content}
      </div>
    )
  }
}