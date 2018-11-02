import ValidatorBase from 'components/shared/components/validator/ValidatorBase';

import moment from 'moment';

export default class CallValidator extends ValidatorBase {

  constructor() {
    super();

    this.functionList = {
      callForm: [
        { func: this.validateNotEmptyOrUndefined, field: 'callStartDate', tooltip: 'You must specify a date range for the call'},
        { func: this.validateNotEmptyOrUndefined, field: 'callEndDate', tooltip: 'You must specify a date range for the call'},
        { func: this.validateStartBeforeEnd, field: undefined, tooltip: 'Call End date must be after Call Start date'},
        { func: this.validateNotEmptyOrUndefined, field: 'callType', tooltip: 'You must specify a Call type'},
        { func: this.validateOtherIfSelected, field: 'callTypeOther', parentField: 'callType', tooltip: 'You must specify the New Call Type for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'callTheme', tooltip: 'You must specify a Call Theme'},
        { func: this.validateOtherIfSelected, field: 'callThemeOther', parentField: 'callTheme', tooltip: 'You must specify the New Call Theme for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'scienceTheme', tooltip: 'You must specify a Science Theme for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'proposalDuration', tooltip: 'You must specify a maximum length (in years) for proposals on this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'proposalStart', tooltip: 'You must specify a date on which Proposals can begin'},
        { func: this.validateProposalStartAfterCallStart, field: undefined, tooltip: 'The day that proposals start must be <CONFIRM WITH COURTNEY>'},
        { func: this.validateHasCriteria, field: undefined, tooltip: 'You must have at least one criteria for a call'},
        { func: this.validateCriteriaFull, field: undefined, tooltip: 'The total weight over all criteria must be 100%'},
        
      ]
    }
  }

  validateStartBeforeEnd(data, tooltip) {
    if(data.callStartDate && data.callEndDate) {
      if(moment(data.callStartDate).isSameOrAfter(data.callEndDate)) {
        return {field: 'callStartDate', tooltip};
      }
    }
    return undefined;
  }

  validateProposalStartAfterCallStart(data, tooltip) {
    if(data.proposalStart && data.callStartDate) {
      if (moment(data.proposalStart).isBefore(data.callStartDate)) {
        return {field: 'proposalStart', tooltip};
      }
    }
    return undefined;
  }

  validateHasCriteria(data, tooltip) {
    console.log('validate has criteria', data);
    if(data.criteria && data.criteria.length !== 0 ) {
      return undefined;
    }
    return {field: 'criteria', tooltip};
  }

  validateCriteriaFull(data, tooltip) {
    console.log('validate criteria full', data);
    if(data.criteria && data.criteria.length !== 0 ) {
      let total = 0;
      data.criteria.forEach((item) => (total += Number(item.weight)));
      if(total !== 100) {
        return {field: 'criteria', tooltip}
      }
    }
    return undefined;
  }
}