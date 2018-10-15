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
        { func: this.validateNotEmptyOrUndefined, field: undefined, tooltip: 'A proposal must have at least one participant'},
        { func: this.validateUsersORCID, field: undefined, tooltip: 'must have an ORCID iD linked to their account'},
        { func: this.validateUsersProfession, field: undefined, tooltip: 'must have a profession selected'},
        { func: this.validateUsersInstitutions, field: undefined, tooltip: 'must select their parent institution.'}
      ],
      fundingForm: [
        { func: this.validateFundingSource, field: undefined, tooltip: 'You must specify at least one funding source'},
        { func: this.validateFundingGrants, field: undefined, tooltip: 'must have a grant number for funding'},
        { func: this.validateBerSelection, field: undefined, tooltip: 'You must specify whether you are the PI on the BER grant funding this proposal'}
      ]
    };
    this.validateUsersORCID = this.validateUsersORCID.bind(this);
    this.validateUsersProfession = this.validateUsersProfession.bind(this);
    this.validateUsersInstitutions = this.validateUsersInstitutions.bind(this);
    this.validateFundingGrants = this.validateFundingGrants.bind(this);
  }

  validateUserField(users, field) {
    const invalidUsers:string[] = [];
    users.forEach((user) => {
      if(user[field] === '') {
        invalidUsers.push(user.name);
      }
    });
    return invalidUsers;
  }

  _createReturnText(fieldArray, tooltip) {
    let joined = '';
    if(fieldArray.length > 1) {
      const last = fieldArray.pop();
      joined = fieldArray.join(', ') + ' and ' + last;
    } else {
      joined = fieldArray.join(', ');
    }
    return [joined, tooltip].join(' ');
  }

  validateUsersORCID(data, tooltip, instance) {
    const invalidUsers = instance.validateUserField(data, 'orcid');
    const toReturn = invalidUsers.length === 0 ? undefined : {field: "participants", tooltip: instance._createReturnText(invalidUsers, tooltip)};
    return toReturn;
  }

  validateUsersProfession(data, tooltip, instance) {
    const invalidUsers = instance.validateUserField(data, 'profession');
    const toReturn = invalidUsers.length === 0 ? undefined : {field: "participants", tooltip: instance._createReturnText(invalidUsers, tooltip)};
    return toReturn;
  }

  validateUsersInstitutions(data, tooltip, instance) {
    const invalidUsers = instance.validateUserField(data, 'institution');
    const toReturn = invalidUsers.length === 0 ? undefined : {field: "participants", tooltip: instance._createReturnText(invalidUsers, tooltip)};
    return toReturn;
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

  validateFundingGrants(data, tooltip, instance) {
    if(data.fundingSources.length !== 0) {
      const fundingSources = data.fundingSources;
      const invalidSources:string[] = [];
      fundingSources.forEach((item) => {
        if(item.grant === '' || item.grant === undefined) {
          invalidSources.push(item.label);
        }
      });
      return invalidSources.length === 0 ? undefined : {field: 'fundingSources', tooltip: instance._createReturnText(invalidSources, tooltip)}
    }
    return undefined;
  }

  validateBerSelection(data, tooltip) {
    if(data.fundingSources.findIndex((item) => (item.name === 'doe_ber')) !== -1 && data.berSelection === undefined) {
      return {field: 'fundingBer', tooltip}
    }
    return undefined;
  }

  doValidate(data, form) {
    const errors:object[] = [];
    const instance = this;
    this.functionList[form].forEach((item) => {
      let error = {};
      if(item.field !== undefined) {
        error = item.func(data[item.field], item.field, item.tooltip, instance);
      } else {
        error = item.func(data, item.tooltip, instance)
      }
      if(error) {
        errors.push(error);
      }
    });
    return errors;
  }
}