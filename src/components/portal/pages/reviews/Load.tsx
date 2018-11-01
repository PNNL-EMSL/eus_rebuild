import React, {Component} from 'react';
import ReviewValidator from 'components/shared/components/validator/ReviewValidator';
import FormError from 'components/shared/components/FormError';

import { Slider, Input, Form, Button, Radio } from 'antd';
import { sectionHeaderStyle, conflictSectionStyle, buttonMargin } from 'styles/base';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

const marks = {0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5"};
const textAreaLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 14 },
  },
};

export default class ReviewLoad extends Component<any, any> {
  static VALIDATOR = new ReviewValidator();
  
  constructor(props) {
    super(props);

    this.state = {
      review: this.props.review,
      errors: [],
      submitError: false,
    };

    this.saveReview = this.saveReview.bind(this);
    this.submitReview = this.submitReview.bind(this);

    this.handleCriterionScoreChange = this.handleCriterionScoreChange.bind(this);
    this.handleCriterionCommentChange = this.handleCriterionCommentChange.bind(this);
    this.handleReviewSummaryChange = this.handleReviewSummaryChange.bind(this);
    this.handleConflictChange = this.handleConflictChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleResourcesUpdate = this.handleResourcesUpdate.bind(this);

    this.renderCriterion = this.renderCriterion.bind(this);
    this.renderSummary = this.renderSummary.bind(this);
    this.renderConflicts = this.renderConflicts.bind(this);
  }

  saveReview() {
    const review = this.state.review;
    // validate the form
    const errors = this.validateReview(review);
    if(errors.length === 0) {
      // if it passes validation, review status should be 'complete'
      review.reviewStatus = 'Complete';
    } else {
      // else, review status is "in progress"
      review.reviewStatus = 'In Progress';
    }

    this.props.updateReview(review.propId, review.id, review);
    this.setState({review, errors: ReviewLoad.VALIDATOR.displayErrors(errors)});
  }

  submitReview() {
    const review = this.state.review;
    let submitErrors = true;
    // Validate the form
    const errors = this.validateReview(review);
    if(errors.length === 0) {
      // If the form passes validation
      // Set the reviewStatus as Submitted
      review.reviewStatus = 'Submitted';
      submitErrors = false;
      this.props.updateReview(review.propId, review.id, review, true);
    }

    this.setState({review, errors: ReviewLoad.VALIDATOR.displayErrors(errors), submitErrors});
  }

  validateReview(review) {
    return ReviewLoad.VALIDATOR.doValidate(review, 'reviewForm');
  }

  handleCriterionScoreChange(id, value) {
    const criteria = this.state.review.criterion;
    criteria.find((crit) => crit.id === id).score = value;
    this.setState({review: this.state.review});
  }

  handleCriterionCommentChange(id, value) {
    const criteria = this.state.review.criterion;
    criteria.find((crit) => crit.id === id).comment = value;
    this.setState({review: this.state.review});
  }

  handleFileUpload() {
    this.state.review.fileUploaded = true;
    this.setState({review: this.state.review});
  }

  handleResourcesUpdate(e) {
    this.state.review.reviewResources = e.target.value;
    this.setState({review: this.state.review});
  }
  
  handleReviewSummaryChange(e) {
    this.state.review.reviewSummary = e.target.value;
    this.setState({review: this.state.review});
  }

  handleConflictChange(e) {
    this.state.review.reviewConflict = e.target.value;
    this.setState({review: this.state.review});
  }

  renderCriterion() {
    // For each criterion, render:
    // a header (with the weight in the title)
    // the full text of the criterion
    // a slider bar for scoring the criterion (in 10ths of a point preferably)
    // A place to enter comments
    const content:JSX.Element[] = [];
    const instance = this;
    let keyNum = 1;
    const errors = this.state.errors;
    const fileUploaded = this.state.review.fileUploaded;
    this.props.review.criterion.forEach((criterion) => {
      function scoreChange(e) {
        instance.handleCriterionScoreChange(criterion.id, e);
      }
      function commentChange(e) {
        instance.handleCriterionCommentChange(criterion.id, e.target.value)
      }
      content.push(
        <div key={keyNum++}>
          <h4 className={sectionHeaderStyle}>{criterion.title + ' - ' + criterion.weight + '%'}</h4>
          <p style={{marginLeft: '8%', marginRight: '8%'}}>{criterion.text}</p>
          <Form>
            <FormItem
              {...textAreaLayout}
              label="Score"
              required={true}
            >
              <Slider marks={marks} step={0.1} max={5} included={false} onAfterChange={scoreChange} defaultValue={criterion.score}/>
              {errors && errors.criterionScore && criterion.score === undefined && (<FormError error={errors.criterionScore}/>)}
              </FormItem>
            <FormItem
              {...textAreaLayout}
              label="Comments"
              colon={true}
              validateStatus={errors && errors.criterionComment && !(criterion.comment !== '' || fileUploaded) ? 'error' : undefined}
              required={!this.state.review.fileUploaded}
            >
              <TextArea value={criterion.comment} onChange={commentChange}/>
              {errors && errors.criterionComment && !(criterion.comment !== '' || fileUploaded) && (<FormError error={errors.criterionComment}/>)}
            </FormItem>
          </Form>
        </div>
      )
    });
    return content;
  }

  renderResourceAllocation() {
    return (
      <div>
        <h4 className={sectionHeaderStyle}>Resource Allocation Level</h4>
        <p style={{marginLeft: '8%', marginRight: '8%'}}>Please specify the level of resource allocation.</p>
        <Form>
          <FormItem
            {...textAreaLayout}
          >
            <RadioGroup defaultValue={this.state.review.reviewResources} onChange={this.handleResourcesUpdate}>
              <Radio value="full">Staff and Resources</Radio>
              <Radio value="partial">Resources Only</Radio>
              <Radio value="deny">Deny</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
    );
  }

  renderSummary() {
    const errors = this.state.errors;
    const review = this.state.review;
    return (
      <div>
        <h4 className={sectionHeaderStyle}>Review Summary</h4>
        <p style={{marginLeft: '8%', marginRight: '8%'}}>Please provide an overall summary of your assessment, including any recommendations regarding this proposal.</p>
        <Form>
          <FormItem
            {...textAreaLayout}
            label="Summary Comments"
            colon={true}
            required={!review.fileUploaded}
            validateStatus={errors && errors.reviewSummary && !(review.reviewSummary !== '' || review.fileUploaded) ? 'error' : undefined}
          >
            <TextArea value={review.reviewSummary} onChange={this.handleReviewSummaryChange}/>
            {errors && errors.reviewSummary && !(review.reviewSummary !== '' || review.fileUploaded) && (<FormError error={errors.reviewSummary} />)}
          </FormItem>
        </Form>
      </div>
    )
  }

  renderConflicts() {
    return (
      <div className={conflictSectionStyle}>
        <p>
          If you have an active collaboration or financial connection with the institution(s) or key investigators
          submitting this proposal that might be construed as creating a conflict of interests, please describe those
          affiliations or interests. If you believe that you can be objective, we would be happy to accept your review
          and evaluate it along with your listed affiliations or interests.
        </p>
        <p>
          If you do not submit a statement, you are affirming that you have no conflict of interest in reviewing this
          proposal.
        </p>
        <Form>
          <FormItem {...textAreaLayout} label="Potential Conflicts" colon={true} >
            <TextArea value={this.state.review.reviewConflicts} onChange={this.handleConflictChange}/>
          </FormItem>
        </Form>
      </div>
    )
  }

  render() {
    const review = this.state.review;
    return(
      <div>
        <div style={{padding: '15px', marginLeft: '8%', marginTop: '30px', marginRight: '8%'}}>
          <div>
            <b>Authors:</b>&nbsp;{review.authors.join(', ')}
          </div>
          <br />
          <div>
            <p >
              Evaluate this proposal by completing the form below. Your identity as a reviewer of this proposal will be
              kept confidential to the maximum extent possible. Peer Review comments will be available anonymously to the
              PIs and Participants. Self identifiers, inappropriate language, and/or any attachments that aren't
              associated with the review will be removed.
            </p>
            <p >
              For each criterion please use the slide bar tool to rate the proposal and then provide detailed comments on
              the quality of this proposal to support your rating, noting specifically the proposal's strengths and
              weaknesses. As guidance, a list of potential considerations that you might employ in your evaluation follows
              each criterion. Please comment on only those that are relevant to this proposal and for which you feel
              qualified to make a judgment.
            </p>
            <p >
              We prefer you to enter your review comments directly into the web-based form below. However, if needed, you
              may attach your comments in Adobe PDF format instead of filling out the individual comment fields. A PDF
              containing all criterion that you must comment on has been provided for you. Please select the appropriate
              form for the proposal type you are reviewing. If you aren't sure which one you should use, please contact
              the User Support Office (509-371-6003 or <a href="mailto:emsl@pnnl.gov">emsl@pnnl.gov</a>).
            </p>
            <br/>
            <Form>
              <FormItem {...textAreaLayout} label="Attach Document">
                <Button onClick={this.handleFileUpload}>Upload File</Button>
              </FormItem>
            </Form>
          </div>
          <ul>
            <li>
              <a
                href="https://d-eusi.emsl.pnl.gov/Portal/docs/Review_Criteria_External.pdf"
                target="_blank"
              >
                Emsl Proposals
              </a>
            </li>
            <li>
              <a
                href="https://d-eusi.emsl.pnl.gov/Portal/docs/ReviewCriteria_FICUS_JGI-EMSL.r2.pdf"
                target="_blank"
              >
                FICUS Research between JGI and EMSL
              </a>
            </li>
            <li>
              <a
                href="https://d-eusi.emsl.pnl.gov/Portal/docs/ReviewCriteria_PNCC.r0.pdf"
                target="_blank"
              >
                Pacific Northwest Cryo-EM Center (PNCC) proposals
              </a>
            </li>
          </ul>
          <div><b>Note:</b>&nbsp;You are still required to select an appropriate rating for each criterion</div>
        </div>
        <hr />
        {this.renderCriterion()}
        {review.reviewPanel && (
          <div>
            <hr />
            {this.renderResourceAllocation()}
          </div>
        )}
        <hr />
        {this.renderSummary()}
        <hr />
        {this.renderConflicts()}
        <hr />
        {this.state.submitErrors && (<FormError error="Review is incomplete and could not be submitted. Please correct these errors before attempting again"/>)}
        <div style={{textAlign: 'center'}}>
          <Button className={buttonMargin} type="primary" onClick={this.saveReview}>Save Review</Button>
          <Button className={buttonMargin} type="primary" onClick={this.submitReview}>Submit Review</Button>
        </div>
      </div>
    )
  }

}