import ValidatorBase from 'components/shared/components/validator/ValidatorBase';
import moment from 'moment';

export default class ReviewValidator extends ValidatorBase {

  constructor() {
    super();

    this.functionList = {
      reviewForm: [
        { func: this.validateCriterionScores, field: undefined, tooltip: 'Please select a rating for this criterion.'},
        { func: this.validateCriterionComment, field: undefined, tooltip: 'Please provide comments to justify your rating.'},
        { func: this.validateReviewSummary, field: undefined, tooltip: 'Please summarize your review comments of this proposal.'}
      ]
    }
  }

  validateCriterionScores(data, tooltip) {
    let toReturn:any;
    data.criterion.forEach((criterion) => {
      if(criterion.score === undefined) {
        toReturn = {field: 'criterionScore', tooltip}
      }
    });
    return toReturn;
  }

  validateCriterionComment(data, tooltip, instance) {
    let toReturn:any;
    if(!data.fileUploaded) {
      data.criterion.forEach((criterion) => {
        const hasError = instance.validateNotEmptyOrUndefined(criterion.comment, 'criterionComment', tooltip);
        if(hasError) {
          toReturn = hasError;
        }
      });
    }
    return toReturn;
  }

  validateReviewSummary(data, tooltip, instance) {
    let toReturn:any;
    if(!data.fileUploaded) {
      const hasError = instance.validateNotEmptyOrUndefined(data.reviewSummary, 'reviewSummary', tooltip);
      if(hasError) {
        toReturn = hasError;
      }
    }
    return toReturn;
  }
}