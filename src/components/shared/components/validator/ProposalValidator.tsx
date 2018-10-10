export default class ProposalValidator {
  functionList:any = [];

  constructor() {
    this.functionList = {
      detailsForm: [
        { func: this.validateResearchArea, field: undefined, tooltip: 'Research Area must be defined' },
        { func: this.validateNotEmptyOrUndefined, field: 'title', tooltip: 'All proposals must have a title' },
        { func: this.validateNotEmptyOrUndefined, field: 'abstract', tooltip: 'All proposals must have an abstract' },
        { func: this.validateNotEmptyOrUndefined, field: 'startDate', tooltip: 'All proposals must have a preferred start date' },
        { func: this.validateNotEmptyOrUndefined, field: 'proposalType', tooltip: 'Proposal Type must be defined' },
        { func: this.validateNotEmptyOrUndefined, field: 'nsfRequest', tooltip: 'All proposals must select if they are associated with a NSF funding request' },
        { func: this.validateNotEmptyOrUndefined, field: 'emslStaff', tooltip: 'All proposals must select if they desire EMSL Staff assistance' },
        { func: this.validateScienceTheme, field: undefined, tooltip: 'You must select a Science Theme for your proposal'},
        { func: this.validateProposalPay, field: undefined, tooltip: 'You must select if you are planning to pay for any necessary technical support'},
        { func: this.validateProposalRestricted, field: undefined, tooltip: 'You must select if this is business sensitive research or restricted from public dissemination'},
        { func: this.validateProposalReason, field: undefined, tooltip: 'You must select a reason why you will not be paying for necessary technical support'},
      ],
      participantsForm:[
        { func: this.validateNotEmptyOrUndefined, field: 'participants', tooltip: 'A proposal must have at least one participant'},
        { func: this.validateUsersORCID, field: undefined, tooltip: 'must have an ORCID iD linked to their account'},
        { func: this.validateUsersProfession, field: undefined, tooltip: 'All participants must have a profession selected'},
        { func: this.validateUsersInstitutions, field: undefined, tooltip: 'All participants must select their parent institution.'}
      ],
      fundingForm: [
        { func: this.validateFundingSource, field: undefined, tooltip: 'You must specify at least one funding source'},
        { func: this.validateNotEmptyOrUndefined, field: 'fundingWorkPackage', tooltip: 'You must specify a Work Package for the proposal'}
      ]
      
    };
    
  }

  validateUsersORCID(data, tooltip) {
    const invalidUsers:string[] = [];
    data.forEach((item) => {
      if(item.orcid === '') {
        invalidUsers.push(item.name);
      }
    });
    const last = invalidUsers.pop();
    const users = invalidUsers.join(', ') + ' and ' + last;
    const toReturn = invalidUsers.length === 0 ? undefined : {field: "participants", tooltip: [users, tooltip].join(' ')};
    return toReturn;
    // stuff
  }

  validateUsersProfession(data, tooltip) {
    // stuff 2
  }

  validateUsersInstitutions(data, tooltip) {
    // stuff 3
  }

  

  validateNotEmptyOrUndefined(data, field: string|undefined,  tooltip) {
    if(data === '' || data === undefined) {
      return {field, tooltip}
    }
    return undefined;
  }

  validateResearchArea(data, tooltip) {
    if(data.researchArea === undefined || data.researchArea === 'other' && data.researchAreaOther === '') {
      return {field: "researchArea", tooltip};
    }
    return undefined;
  }

  validateScienceTheme(data, tooltip) {
    if((data.proposalType === 'general' || data.proposalType === 'partner') && data.proposalTheme === undefined) {
      return {field: "proposalTheme", tooltip};
    }
    return undefined;
  }

  validateProposalPay(data, tooltip) {
    if(data.proposalType === 'general' && data.proposalPay === undefined) {
      return {field: "proposalPay", tooltip};
    }
    return undefined;
  }

  validateProposalRestricted(data, tooltip) {
    if(data.proposalType === 'general' && data.proposalPay === 1 && data.proposalRestricted === undefined) {
      return {field: 'proposalRestricted', tooltip}
    }
    return undefined;
  }

  validateProposalReason(data, tooltip) {
    if(data.proposalType === 'general' && data.proposalPay === 0 && data.proposalReason === undefined) {
      return {field: 'proposalReason', tooltip}
    }
    return undefined;
  }

  validateFundingSource(data, tooltip) {
    if(data.fundingSources.length === 0 || (data.fundingSources.includes('other') && data.fundingOther === '')) {
      return {field: 'fundingSources', tooltip}
    }
    return undefined;
  }

  doValidate(data, form) {
    const errors:object[] = [];
    this.functionList[form].forEach((item) => {
      let error = {};
      if(item.field !== undefined) {
        error = item.func(data[item.field], item.field, item.tooltip);
      } else {
        error = item.func(data, item.tooltip)
      }
      if(error) {
        errors.push(error);
      }
    });
    return errors;
  }
}