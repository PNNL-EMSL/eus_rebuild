import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import ReviewLoad from 'components/portal/pages/reviews/Load';
import FormError from 'components/shared/components/FormError';
import { Button, Checkbox, Modal } from 'antd'
import {Link} from 'react-router-dom';
import moment from 'moment';

import sampleReviews from 'tests/sampleData/sampleReviews.json';
import {portalContentStyle, buttonMargin, declineButton, acceptButton} from 'styles/base';

const confirm = Modal.confirm;

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
      reviewStatus: 'Submitted',
      reviewPanel: panel
    };
    return reviewObj;
  }

  constructor(props) {
    super(props);

    this.state = {
      curUser: 'admin',
      selectedReviewList: [],
      submissionError: false,
      submissionErrorText: '',
    };

    this.updateReview = this.updateReview.bind(this);
    this.getReviewList = this.getReviewList.bind(this);
    this.handleChangeToUser = this.handleChangeToUser.bind(this);
    this.handleChangeToAdmin = this.handleChangeToAdmin.bind(this);
    this.handleChangeToGuest = this.handleChangeToGuest.bind(this);
    this.handleCreateForPanel = this.handleCreateForPanel.bind(this);
    this.handleSubmitChecked = this.handleSubmitChecked.bind(this);
    this.handleDeclineChecked = this.handleDeclineChecked.bind(this);
    this.renderProposalReviewList = this.renderProposalReviewList.bind(this);
  }

  checkProposalReviews() {
    ReviewsHome.allReviews.forEach((proposal) => {
      let allReviewsComplete = true;
      let panelReviewCreated = false;
      proposal.reviews.forEach((review) => {
        if(review.reviewStatus !== 'Submitted' && review.reviewStatus !== 'Submitted - hide') {
          allReviewsComplete = false;
        } else {
          review.reviewStatus = 'Submitted - hide';
        }
        if(review.reviewsType === 'Panel Reviewer') {
          panelReviewCreated = true;
        }
      });
      if(allReviewsComplete && !panelReviewCreated) {
        proposal.reviews.push(ReviewsHome.createReview(proposal, proposal.panelReview, proposal.reviews.length+1, true))
      }
    });
    this.setState(this.state);
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
    return (
      <div key="load">
        <ReviewLoad review={review} {...this.props} updateReview={this.updateReview} />
      </div>
    );
  }

  /**
   * Set the given reviews to Declined and instruct the user to tell the User Office about this change
   * @param ids - IDs to set to Decline
   */
  declineSubmitted(ids) {
    const content: JSX.Element[] = [];
    const instance = this;
    ids.forEach((id) => {
      const propId = id.split('_')[0];
      const reviewId = id.split('_')[1];
      const review = ReviewsHome.allReviews[propId-1].reviews[reviewId-1];
      review.reviewStatus = 'Decline - hide';
      content.push(<li>{review.proposalTitle}</li>)
    });
    confirm({
      title: 'Inform User Office of Decline',
      content: (
        <div>
          Please contact the User Office regarding your declining of reviews for the following proposals:
          <ul>
            {content}
          </ul>
        </div>
      ),
      onOk() {
        instance.setState({submissionError: instance.state.submissionError});
      }
    })
  }

  /**
   * Calculate the weighted average of scores for the review
   * @param review
   * @returns {string}
   */
  calculateReviewScore(review) {
    let reviewScore = 0;
    let sumWeights = 0;
    review.criterion.forEach((criterion) => {
      sumWeights += criterion.weight;
    });
    review.criterion.forEach((criterion) => {
      reviewScore += criterion.score !== undefined ? (criterion.score * criterion.weight) / sumWeights : 0;
    });
    // If there are no scores yet, we don't want to display this in the summary.
    return reviewScore === 0 ? undefined : reviewScore.toPrecision(3);
  }

  /**
   * Bound functions section start
   */

  /**
   *
   * @param propId - ID of the proposal the review belongs to
   * @param reviewId - ID of the review
   * @param review - Content of the review
   * @param redirect - Flag for if to return to the Reviews Home page, true if submission was successful
   */
  updateReview(propId, reviewId, review, redirect=false) {
    ReviewsHome.allReviews[propId-1].reviews[reviewId-1] = review;
    ReviewsHome.allReviews[propId-1].reviews[reviewId-1].criterion = review.criterion;
    if(redirect) {
      this.props.history.push('/Portal/reviews');
    }
  }

  /**
   * Returns a list of reviews for the current user
   */
  getReviewList() {
    const filtered:any[] = [];
    ReviewsHome.allReviews.forEach((proposal) => {
      proposal.reviews.forEach((review) => {
        if (review.user === this.state.curUser && !review.reviewStatus.includes('hide')) {
          filtered.push(review);
        }
      });
    });
    return filtered;
  }

  /**
   * Input handlers for testing purposes only
   */
  handleChangeToUser() {
    this.setState({curUser: 'user'});
  }

  handleChangeToAdmin() {
    this.setState({curUser: 'admin'});
  }

  handleChangeToGuest() {
    this.setState({curUser: 'guest'});
  }

  handleCreateForPanel() {
    this.checkProposalReviews();
  }

  /**
   * Submits all the reviews which the user had selected if and only if the review status is "Complete".
   * If a review is not complete, it will not be submitted, and the user will be informed as such
   */
  handleSubmitChecked() {
    let submitError = false;
    let errorText = '';
    if(this.state.selectedReviewList.length === 0) {
      submitError = true;
      errorText = 'Please select at least one review to submit';
    }
    this.state.selectedReviewList.forEach((id) => {
      const propId = id.split('_')[0];
      const reviewId = id.split('_')[1];
      const review = ReviewsHome.allReviews[propId-1].reviews[reviewId-1];
      if(review.reviewStatus === 'Complete') {
        review.reviewStatus = 'Submitted';
      } else if(review.reviewStatus === 'Not Started' || review.reviewStatus === 'In Progress') {
        submitError = true;
        errorText = 'Unable to submit reviews which are not complete. Complete reviews have been submitted';
      }
    });
    this.setState({submissionError: submitError, submissionErrorText: errorText});
  }

  /**
   * Declines all the reviews which the user had selected.
   * If at least one of the reviews selected is "Submitted", a modal will be displayed to inform the user to contact
   * the User Services office.
   */
  handleDeclineChecked() {
    let submitError = false;
    let errorText = '';
    let declineSubmitted = false;
    const instance = this;
    const submittedIds:string[] = []
    if(this.state.selectedReviewList.length === 0) {
      submitError = true;
      errorText = 'Please select at least one review to decline';
    }
    this.state.selectedReviewList.forEach((id) => {
      const propId = id.split('_')[0];
      const reviewId = id.split('_')[1];
      const review = ReviewsHome.allReviews[propId-1].reviews[reviewId-1];
      if(review.reviewStatus === 'Submitted' ) {
        if(declineSubmitted === false) {
          confirm({
            title: 'Confirm Decline of Submitted Reviews',
            content: 'One or more of the reviews you selected to decline have already been submitted. ' +
            'Do you want to decline to review these as well?',
            onOk() {
              instance.declineSubmitted(submittedIds)
            }
          });
          declineSubmitted = true;
        }
        submittedIds.push(id);
        // Create confirmation box for if they want to decline already submitted reviews
        // If yes, keep track of this and show the User Services info message to the user afterward.
      } else {
        review.reviewStatus = 'Decline - hide';
      }
    });
    if(declineSubmitted) {
      // confirm("Please contact the User Office regarding your declining of reviews for the following proposals:")
    }
    this.setState({submissionError: submitError, submissionErrorText: errorText});
  }

  renderProposalReviewList() {
    // Get the list of proposal reviews for current user
    const reviews = this.getReviewList();
    const content:JSX.Element[] = [];
    const instance = this;

    reviews.forEach((review) => {
      function addToSelected(e) {
        const selectedReviewList = instance.state.selectedReviewList;
        if(e.target.checked) {
          selectedReviewList.push(review.propId+'_'+review.id);
        } else {
          selectedReviewList.splice(selectedReviewList.findIndex((item) => item === review.propId+'_'+review.id), 1);
        }
        instance.setState({selectedReviewList})
      }
      if(!review.reviewStatus.includes('hide')) {
        const score = instance.calculateReviewScore(review);

        let statusLinkText = '';
        if(review.reviewStatus === 'Not Started') {
          statusLinkText = 'Start Review';
        } else if(review.reviewStatus === 'Submitted') {
          statusLinkText = 'View Review';
        } else {
          statusLinkText = 'Continue Review';
        }
        content.push(
          <tr>
            <td style={{textAlign: 'center'}}>
              <Checkbox
                checked={this.state.selectedReviewList.includes(review.propId + '_' + review.id)}
                onChange={addToSelected}
              />
            </td>
            <td>{review.proposalTitle}</td>
            <td>{review.authors[0]}</td>
            <td>{review.dueDate}</td>
            <td>{review.reviewerType}</td>
            <td>
              <div>
                <i>{review.reviewStatus}</i>
              </div>
              <div>
                {score !== undefined && (<div>{score} / 5.00</div>)}
                <Link to={'/Portal/reviews/' + review.propId+'_'+review.id}>{statusLinkText}</Link>
              </div>
            </td>
          </tr>
        );
      }
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

        <Button style={{float: 'right'}} className={buttonMargin} type="primary" onClick={this.handleCreateForPanel}>Create Science Panel from submitted</Button>
        <h3>Reviews</h3>
        <ol>
          <li>To read the complete proposal details, click the  Review Package link in the Proposal Column</li>
          <li>To review the proposal, click the review link in the Status Column</li>
        </ol>
        <div style={{textAlign: 'center'}}>
          {this.state.submissionError && (<FormError error={this.state.submissionErrorText} />)}
        </div>
        <div>
          Select:
          <Button className={buttonMargin} onClick={handleSelectAll} >All</Button>
          <Button className={buttonMargin} onClick={handleSelectCompleted} >Completed</Button>
          <Button className={buttonMargin} onClick={handleSelectNone} >None</Button>
          <span style={{float: 'right'}}>
            <Button className={acceptButton} onClick={this.handleSubmitChecked}>Submit selected reviews</Button>
            <Button className={declineButton} onClick={this.handleDeclineChecked}>Decline selected reviews</Button>
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