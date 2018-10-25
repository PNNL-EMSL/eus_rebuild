import ValidatorBase from 'components/shared/components/validator/ValidatorBase';

export default class CallValidator extends ValidatorBase {

  constructor() {
    super();

    this.functionList = {
      callForm: [
        { func: this.validateNotEmptyOrUndefined, field: 'callStartDate', tooltip: 'You must specify a date when the call starts'},
        { func: this.validateNotEmptyOrUndefined, field: 'callEndDate', tooltip: 'You must specify a date when the call ends'},
        { func: this.validateNotEmptyOrUndefined, field: 'callType', tooltip: 'You must specify a Call type'},
        { func: this.validateOtherIfSelected, field: 'callTypeOther', parentField: 'callType', tooltip: 'You must specify the New Call Type for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'callTheme', tooltip: 'You must specify a Call Theme'},
        { func: this.validateOtherIfSelected, field: 'callThemeOther', parentField: 'callTheme', tooltip: 'You must specify the New Call Theme for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'scienceTheme', tooltip: 'You must specify a Science Theme for this call'},
        { func: this.validateNotEmptyOrUndefined, field: 'proposalDuration', tooltip: 'You must specify a maximum length (in years) for proposals on this call'},
        { func: this.validateHasCriteria, field: undefined, tooltip: 'You must have at least one criteria for a call'},
        { func: this.validateCriteriaFull, field: undefined, tooltip: 'The total weight over all criteria must be 100%'},
        
      ]
    }
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