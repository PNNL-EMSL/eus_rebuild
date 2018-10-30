import ValidatorBase from 'components/shared/components/validator/ValidatorBase';

export default class ProposalValidator extends ValidatorBase {

  constructor() {
    super();

    this.functionList = {
      detailsForm: [
        { func: this.validateResearchArea, field: undefined, tooltip: 'Research Area must be defined' },
        { func: this.validateOtherIfSelected, field: 'researchOther', parentField: 'researchArea', tooltip: 'You must specify the research area.'},
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
      ],
      materialsForm: [
        { func: this.validateNotEmptyOrUndefined, field: 'humanMaterials', tooltip: 'You must select if the proposal uses Human Biological Materials'},
        { func: this.validateNotEmptyOrUndefined, field: 'animalMaterials', tooltip: 'You must select if the proposal uses Animal Biological Materials'},
        { func: this.validateNotEmptyOrUndefined, field: 'chemicalsSent', tooltip: 'You must select if chemicals will be sent to EMSL as part of this proposal'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'chemicalsDescription', parentField: 'chemicalsSent', tooltip: 'You must provide a description for the chemicals to be sent.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'chemicalsShip', parentField: 'chemicalsSent', tooltip: 'You must describe how chemicals will be shipped.'},
        { func: this.validateOtherIfSelected, field: 'chemicalsShipOther', parentField: 'chemicalsShip', tooltip: 'You must specify the other method by which chemicals will be shipped.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'chemicalsEnd', parentField: 'chemicalsSent', tooltip: 'You must describe what will be done with chemicals at the end of the project.'},
        { func: this.validateOtherIfSelected, field: 'chemicalsEndOther', parentField: 'chemicalsEnd', tooltip: 'You must specify the other method by which the chemicals will be handled at the end of the project.'},
        { func: this.validateNotEmptyOrUndefined, field: 'samplesSent', tooltip: 'You must select if samples will be sent to EMSL as part of this proposal'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesDescription', parentField: 'samplesSent', tooltip: 'You must provide a description for the samples to be sent.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesRadioactive', parentField: 'samplesSent', tooltip: 'You must select if any of the samples include Radioactive isotopes.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesNanomaterials', parentField: 'samplesSent', tooltip: 'You must select if any of the samples include engineered nanomaterials.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesAphis', parentField: 'samplesSent', tooltip: 'You must select if any of the samples are regulated USDA APHIS.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesAphisPermits', parentField: 'samplesAphis', tooltip: 'You must provide a list of the APHIS permits for the regulated samples..'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesBiological', parentField: 'samplesSent', tooltip: 'You must select if any of the samples are biological.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesPests', parentField: 'samplesBiological', tooltip: 'You must select if any of the biological samples include plant pathogens or pests.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesAlive', parentField: 'samplesPests', tooltip: 'You must select if any of the plant pathogens or pests are alive.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesShip', parentField: 'samplesSent', tooltip: 'You must describe how samples will be shipped.'},
        { func: this.validateOtherIfSelected, field: 'samplesShipOther', parentField: 'samplesShip', tooltip: 'You must specify the other method by which the samples will be shipped.'},
        { func: this.validateNotEmptyOrUndefinedIfSelected, field: 'samplesEnd', parentField: 'samplesSent', tooltip: 'You must describe what will be done with the samples at the end of the project.'},
        { func: this.validateOtherIfSelected, field: 'samplesEndOther', parentField: 'samplesEnd', tooltip: 'You must specify the other method by which the samples will be handled at the end of the project.'},
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

}